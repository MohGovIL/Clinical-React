import React, { useEffect, useState } from 'react';
import { StyledPatientDataBlock, StyledTextInput } from './Style';
import AvatarIdBlock from 'Assets/Elements/AvatarIdBlock';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';

const PatientDataBlock = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  const { t } = useTranslation();
  const [selectedServicesType, setSelectedServicesType] = useState([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounter, patient]);



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
      </StyledTextInput>
    </StyledPatientDataBlock>
  );
};

export default PatientDataBlock;
