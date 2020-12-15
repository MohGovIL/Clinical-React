import React, { useState, useEffect } from 'react';
import StyledPatientBackground, {
  StyledEitanButton,
  StyledHeader,
} from 'Components/Generic/EncounterSheet/PatientBackground/Style';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { useTranslation } from 'react-i18next';
import Encounters from 'Components/Generic/EncounterSheet/PatientBackground/Encounters';
import normalizeFhirDocumentReference from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import MedicalIssues from './MedicalIssues';
import Loader from 'Assets/Elements/Loader';
import {
  fhirFormatDate
} from 'Utils/Helpers/Datetime/formatDate';

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
  const currentDate = fhirFormatDate();

  /*
  * setLoading - hide/show loader
  * loadingStatus - stores the status of the loading of the component in the screen
  * handleLoading update the status of the loading
  * */
  const [loading, setLoading] = React.useState(true);
  const [loadingStatus, setLoadingStatus] = React.useState({
    'encounters': false,
    'sensitivities':false,
    'backgroundDiseases':false,
    'chronicMedications':false
  });

  useEffect(() => {

    for (const val in loadingStatus) {
      if (!loadingStatus[val]) return;
    }
    setLoading(false);
  }, [loadingStatus]);

  const handleLoading = (componentName) => {

    setLoadingStatus((prev) => {
      const cloneLoadingStatus = { ...prev }
      cloneLoadingStatus[componentName] = true;
      return cloneLoadingStatus
    });
  }

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

      /* In the future if we like to move the current to top this is the sort that does it :

      oldEncountersArr.sort((e1, e2) => {
        return e1.id === encounter.id ? -1 : e2.id === encounter.id ? 1 : 0;
      });

      */
      if (prevEncounters.length === 0) {
        setPrevEncounters(oldEncountersArr);
        handleLoading('encounters');
      }
    } else {
      handleLoading('encounters');
    }
  };
  useEffect(() => {
    if (prevEncounters.length === 0) handleCreateData();
    //loadingHandler.init(['encounters','sensitivities','backgroundDiseases','chronicMedications']);
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
        handleLoading={handleLoading}
      />
      {loading && <Loader />}
    </StyledPatientBackground>

  );
};

export default PatientBackground;
