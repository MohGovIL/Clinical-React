import React, { useEffect, useState } from 'react';
import { StyledPatientDataBlock, StyledTextInput } from './Style';
import AvatarIdBlock from 'Assets/Elements/AvatarIdBlock';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import ChipWithImage from '../../../../Assets/Elements/StyledChip';
import { FHIR } from '../../../../Utils/Services/FHIR';
import normalizeFhirDocumentReference from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import { combineBase_64 } from '../../../../Utils/Helpers/combineBase_64';
import { calculateFileSize } from '../../../../Utils/Helpers/calculateFileSize';
import { decodeBase_64IntoBlob } from '../../../../Utils/Helpers/decodeBase_64IntoBlob';
import Grid from '@material-ui/core/Grid';
import { StyledFormGroup } from '../../../Imaging/PatientAdmission/PatientDetailsBlock/Style';

const PatientDataBlock = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  const { t } = useTranslation();
  const [selectedServicesType, setSelectedServicesType] = useState([]);

  // Files scan - vars - globals
  const FILES_OBJ = { type: 'MB', valueInBytes: 1000000, maxSize: 2, fix: 1 };
  const referralRef = React.useRef();
  const commitmentRef = React.useRef();
  const additionalDocumentRef = React.useRef();
  const [additionalDocumentFile, setAdditionalDocumentFile] = useState({});
  const [documents, setDocuments] = useState([]);
  const [referralFile, setReferralFile] = useState({});
  const [referralBlob, setReferralBlob] = useState('');
  const [commitmentBlob, setCommitmentBlob] = useState('');
  const [referralFile_64, setReferralFile_64] = useState('');
  const [commitmentFile_64, setCommitmentFile_64] = useState('');
  const [commitmentFile, setCommitmentFile] = useState({});
  const [additionalDocumentBlob, setAdditionalDocumentBlob] = useState('');
  const [additionalDocumentFile_64, setAdditionalDocumentFile_64] = useState(
    '',
  );
  useEffect(() => {
    if (encounter) {
      if (encounter.examination && encounter.examination.length) {
        const selectedArr = encounter.examination.map(
          (reasonCodeEl, reasonCodeElIndex) => {
            return {
              serviceType: {
                name: encounter.serviceType,
                code: encounter.serviceTypeCode,
              },
              reasonCode: {
                name: reasonCodeEl,
                code: encounter.examinationCode[reasonCodeElIndex],
              },
            };
          },
        );
        setSelectedServicesType(selectedArr);
      }
    }

    //Loading documents
    if (encounter.id && patient.id) {
      (async () => {
        const documentReferenceData = await FHIR(
          'DocumentReference',
          'doWork',
          {
            functionName: 'getDocumentReference',
            searchParams: {
              encounter: encounter.id,
              patient: patient.id,
            },
          },
        );
        if (documentReferenceData.data.total) {
          const documentsArray = [];
          for (
            let documentIndex = 0;
            documentReferenceData.data.entry.length > documentIndex;
            documentIndex++
          ) {
            if (documentReferenceData.data.entry[documentIndex].resource) {
              const normalizedFhirDocumentReference = normalizeFhirDocumentReference(
                documentReferenceData.data.entry[documentIndex].resource,
              );

              console.log('======normalizedFhirDocumentReference========');
              console.log(normalizedFhirDocumentReference);
              console.log('======normalizedFhirDocumentReference========');
              documentsArray.push(normalizedFhirDocumentReference);
              const base_64 = combineBase_64(
                normalizedFhirDocumentReference.data,
                normalizedFhirDocumentReference.contentType,
              );
              const [, SizeInMB] = calculateFileSize(
                atob(normalizedFhirDocumentReference.data).length,
                FILES_OBJ.valueInBytes,
                FILES_OBJ.fix,
                FILES_OBJ.maxSize,
              );
              let obj = {
                name: normalizedFhirDocumentReference.url,
                size: SizeInMB,
              };
              const blob = decodeBase_64IntoBlob(
                normalizedFhirDocumentReference.data,
                normalizedFhirDocumentReference.contentType,
              );
              if (normalizedFhirDocumentReference.url.startsWith('Referral')) {
                setReferralBlob(blob);
                setReferralFile_64(base_64);
                setReferralFile(obj);
                referralRef.current = base_64;
              } else if (
                normalizedFhirDocumentReference.url.startsWith('Commitment')
              ) {
                setCommitmentBlob(blob);
                commitmentRef.current = base_64;
                setCommitmentFile_64(base_64);
                setCommitmentFile(obj);
              } else {
                setAdditionalDocumentBlob(blob);
                additionalDocumentRef.current = base_64;
                setAdditionalDocumentFile_64(base_64);
                setAdditionalDocumentFile(obj);
              }
            }
          }
          console.log('==============');
          console.log(documentsArray);
          console.log('==============');
          setDocuments(documentsArray);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounter, patient]);

  const onClickFileHandler = (event, ref) => {
    event.stopPropagation();
    event.preventDefault();
    let refId = ref.current.id;
    if (documents.length) {
      if (documents.find((doc) => doc.url.startsWith(refId))) {
        if (refId.startsWith('Referral')) {
          window.open(URL.createObjectURL(referralBlob), referralFile.name);
        } else if (refId.startsWith('Commitment')) {
          window.open(URL.createObjectURL(commitmentBlob), commitmentFile.name);
        } else {
          window.open(
            URL.createObjectURL(additionalDocumentBlob),
            additionalDocumentFile.name,
          );
        }
      } else {
        window.open(
          URL.createObjectURL(ref.current.files[0]),
          ref.current.files[0].name,
        );
      }
    } else {
      window.open(
        URL.createObjectURL(ref.current.files[0]),
        ref.current.files[0].name,
      );
    }
  };

  return (
    <StyledPatientDataBlock>
      <AvatarIdBlock
        edit_mode={0}
        showEditButton={false}
        priority={encounter.priority}
        patientData={patient}
        showDivider
      />
      <StyledTextInput>
        <FormLabel>{t('Reason for referral')}</FormLabel>
        <Typography variant='subtitle1' gutterBottom>
          {selectedServicesType.map((selected, selectedIndex) => (
            <span key={selectedIndex}>
              {`${t(selected.serviceType.name)} - ${t(
                selected.reasonCode.name,
              )}`}
              {selectedIndex + 1 < selectedServicesType.length ? ' , ' : ' '}
            </span>
          ))}
        </Typography>
      </StyledTextInput>

      <StyledTextInput>
        <FormLabel>{t('Encounter documents')}</FormLabel>
        <Grid container={true} style={{ marginBottom: '34px' }}>
          <Grid item xs={3}>
            <label
              style={{
                color: `${'#000b40'}`,
              }}
              htmlFor='Referral'>
              {`${t('Referral')}`}
            </label>
          </Grid>
          <Grid item xs={4}>
            {Object.values(referralFile).length > 0 && (
              <ChipWithImage
                htmlFor='AdditionalDocument'
                label={referralFile.name}
                size={referralFile.size}
                onClick={(event) => onClickFileHandler(event, referralRef)}
              />
            )}
          </Grid>
        </Grid>
        <Grid container={true} style={{ marginBottom: '34px' }}>
          <Grid item xs={3}>
            <label
              style={{
                color: `${'#000b40'}`,
              }}
              htmlFor='Commitment'>
              {`${t('Commitment')}`}
            </label>
          </Grid>
          <Grid item xs={4}>
            {Object.values(commitmentFile).length > 0 && (
              <ChipWithImage
                htmlFor='Commitment'
                label={commitmentFile.name}
                size={commitmentFile.size}
                onClick={(event) => onClickFileHandler(event, commitmentRef)}
              />
            )}
          </Grid>
        </Grid>

        <Grid container={true} style={{ marginBottom: '34px' }}>
          <Grid item xs={3}>
            <label
              style={{
                color: `${'#000b40'}`,
              }}
              htmlFor='AdditionalDocument'>
              {`${t('Additional document')}`}
            </label>
          </Grid>
          <Grid item xs={4}>
            {Object.values(additionalDocumentFile).length > 0 && (
              <ChipWithImage
                htmlFor='AdditionalDocument'
                label={additionalDocumentFile.name}
                size={additionalDocumentFile.size}
                onClick={(event) => onClickFileHandler(event, commitmentRef)}
              />
            )}
          </Grid>
        </Grid>
      </StyledTextInput>
    </StyledPatientDataBlock>
  );
};

export default PatientDataBlock;
