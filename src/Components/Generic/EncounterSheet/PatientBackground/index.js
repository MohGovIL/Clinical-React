import React, { useEffect } from 'react';
import StyledPatientBackground, {
  StyledCurrentExaminationHeader,
  StyledEitanButton,
  StyledHeader,
  StyledEncountersTickets,
} from './Style';
import { FHIR } from 'Utils/Services/FHIR';
import moment from 'moment';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { useTranslation } from 'react-i18next';

import Encounters from './Encounters';

const PatientBackground = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  const { t } = useTranslation();
  const handleEitanClick = () => {};

  const [prevEncounters, setPrevEncounters] = React.useState([]);
  const currentDate = moment().utc().format('YYYY-MM-DD');
  const handleCreateData = async (reload) => {
    if (reload) {
      setPrevEncounters([]);
    }
    //setPrevEncounter(await getNextPrevEncounterPerPatient(currentDate, identifier, true));
    const FHIRPrevEncounters = await FHIR('Encounter', 'doWork', {
      functionName: 'getNextPrevEncountersPerPatient',
      functionParams: {
        date: currentDate,
        patient: patient.id,
        prev: true,
      },
    });
    if (
      FHIRPrevEncounters &&
      FHIRPrevEncounters.data &&
      FHIRPrevEncounters.data.total > 0
    ) {
      let oldEncountersArr = [];
      FHIRPrevEncounters.data.entry.map((res, id) => {
        if (res.resource && res.resource.resourceType == 'Encounter') {
          let normalizedEncounter = normalizeFhirEncounter(res.resource);
          if (normalizedEncounter) {
            //if (oldEncountersArr.length < 3)
            oldEncountersArr.push(normalizedEncounter);
          }
        }
      });
      oldEncountersArr.sort((e1, e2) => {
        return e1.id === encounter.id ? -1 : e2.id === encounter.id ? 1 : 0;
      });
      if (prevEncounters.length === 0) {
        setPrevEncounters(oldEncountersArr);
      }
    }
  };
  useEffect(() => {
    if (prevEncounters.length === 0) handleCreateData();
  });
  return (
    <StyledPatientBackground>
      <StyledHeader>
        <div>{t('Medical Information')}</div>
        <StyledEitanButton variant='outlined' color='primary'>
          {t('to Eitan system')}
        </StyledEitanButton>
      </StyledHeader>
      <Encounters
        prevEncounters={prevEncounters}
        handleCreateData={handleCreateData}
      />
    </StyledPatientBackground>
  );
};

export default PatientBackground;
