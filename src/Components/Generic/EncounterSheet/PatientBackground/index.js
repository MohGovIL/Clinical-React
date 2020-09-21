import React, { useState, useEffect } from 'react';
import StyledPatientBackground, {
  StyledEitanButton,
  StyledHeader,
} from 'Components/Generic/EncounterSheet/PatientBackground/Style';
import { FHIR } from 'Utils/Services/FHIR';
import moment from 'moment';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { useTranslation } from 'react-i18next';
import Encounters from 'Components/Generic/EncounterSheet/PatientBackground/Encounters';
import normalizeFhirDocumentReference from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import MedicalIssues from './MedicalIssues';

const PatientBackground = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
  prevEncounterId,
}) => {
  const { t } = useTranslation();
  const handleEitanClick = () => {
    return;
  };

  const [prevEncounters, setPrevEncounters] = React.useState([]);
  const currentDate = moment().utc().format('YYYY-MM-DD');
  const [loading, setLoading] = useState(true);
  const handleCreateData = async (reload) => {
    if (reload) {
      setPrevEncounters([]);
      return;
    }
    //setPrevEncounter(await getNextPrevEncounterPerPatient(currentDate, identifier, true));
    const FHIRPrevEncounters = await FHIR('Encounter', 'doWork', {
      functionName: 'getNextPrevEncountersPerPatient',
      functionParams: {
        date: currentDate,
        patient: patient.id,
        prev: true,
        equal: true,
      },
    });
    if (
      FHIRPrevEncounters &&
      FHIRPrevEncounters.data &&
      FHIRPrevEncounters.data.total > 0
    ) {
      let oldEncountersArr = [];
      // eslint-disable-next-line
      FHIRPrevEncounters.data.entry.map((res, id) => {
        if (res.resource && res.resource.resourceType === 'Encounter') {
          let normalizedEncounter = normalizeFhirEncounter(res.resource);
          if (normalizedEncounter) {
            //if (oldEncountersArr.length < 3)
            oldEncountersArr.push(normalizedEncounter);
          }
        }
      });

      for (let id = 0; id < oldEncountersArr.length; id++) {
        const FHIREncounterDocuments = await FHIR(
          'DocumentReference',
          'doWork',
          {
            functionName: 'getDocumentReference',
            searchParams: {
              encounter: oldEncountersArr[id].id,
              patient: patient.id,
            },
          },
        );
        if (FHIREncounterDocuments.data.total > 0) {
          oldEncountersArr[id]['documents'] = [];
          for (let i = 0; i < FHIREncounterDocuments.data.total + 1; i++) {
            if (
              FHIREncounterDocuments.data.entry[i].resource &&
              FHIREncounterDocuments.data.entry[i].resource.resourceType &&
              FHIREncounterDocuments.data.entry[i].resource.resourceType ===
                'DocumentReference'
            ) {
              let data = normalizeFhirDocumentReference(
                FHIREncounterDocuments.data.entry[i].resource,
              );
              //meanwhile to block the size of this document letter needed her
              // and that there is no summary letter category type

              //ToDo:  after this changes please uncomment the following and change
              //       the search params to search exactly which document category type needed
              if (
                data.categoryType ===
                'PLEASE DELETE THIS IF STATEMENT ROWS AND SEARCH BY CONTENT TYPE'
              ) {
                //currently there is only 4 categories but none of them needed here
                oldEncountersArr[id]['documents'].push(data);
              }
            }
          }
        }
      }

      /* In the future if we like to move the current to top this is the sort that does it :

      oldEncountersArr.sort((e1, e2) => {
        return e1.id === encounter.id ? -1 : e2.id === encounter.id ? 1 : 0;
      });

      */
      if (prevEncounters.length === 0) {
        setPrevEncounters(oldEncountersArr);
      }
    }
  };
  useEffect(() => {
    if (prevEncounters.length === 0) handleCreateData();
  }, []);

  return (
    <StyledPatientBackground dir={languageDirection}>
      <StyledHeader>
        <div>{t('Medical Information')}</div>
        {/* <StyledEitanButton
          onClick={() => handleEitanClick}
          variant='outlined'
          color='primary'>
          {t('to Eitan system')}
        </StyledEitanButton> */}
      </StyledHeader>
      <StyledHeader>
        <label
          style={{
            textAlign: `${languageDirection === 'ltr' && 'left'}`,
          }}>
          <span>{t('Visits')}</span>
        </label>
      </StyledHeader>
      <Encounters
        prevEncounters={prevEncounters}
        handleCreateData={handleCreateData}
      />
      <MedicalIssues
        patientId={patient.id}
        encounterId={encounter.id}
        prevEncounterId={prevEncounterId}
      />
    </StyledPatientBackground>
  );
};

export default PatientBackground;
