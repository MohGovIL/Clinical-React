import React, { useEffect } from 'react';
import StyledPatientBackground, {
  StyledCurrentExaminationHeader,
  StyledPrevEncountersPapers,
} from './Style';
import { FHIR } from '../../../../Utils/Services/FHIR';
import moment from 'moment';
import normalizeFhirEncounter from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import { useTranslation } from 'react-i18next';

const PatientBackground = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  const { t } = useTranslation();
  const showPrevEncounters = () => {
    return (
      <React.Fragment dir={languageDirection === 'he' ? 'rtl' : 'ltr'}>
        {encounter ? (
          <StyledPrevEncountersPapers>
            <StyledCurrentExaminationHeader>
              <div>
                {t('Current test')} -
                <span>
                  {encounter.serviceType ? t(encounter.serviceType) : ''} -
                  {t(encounter.examination)}
                </span>
              </div>
            </StyledCurrentExaminationHeader>
          </StyledPrevEncountersPapers>
        ) : null}
        {prevEncounters.map((prevEncounter, prevEncounterIndex) => {
          debugger;
          return encounter && encounter.id !== prevEncounter.id ? (
            <StyledPrevEncountersPapers key={prevEncounterIndex}>
              {/*<div>{encounter.id ? encounter.id : ''}</div>
          <div>{encounter.priority ? encounter.priority : ''}</div>
          <div>{encounter.status ? encounter.status : ''}</div>

          <div>
            {' '}
            {encounter.period && encounter.period.start
              ? encounter.period.start
              : null}
          </div>
          <div>{encounter.patient ? encounter.patient : ''}</div>
          <div>{encounter.appointment ? encounter.appointment : ''}</div>
          <div>
            {encounter.serviceProvider ? encounter.serviceProvider : ''}
          </div>*/}

              <StyledCurrentExaminationHeader>
                <div>
                  {prevEncounter.period && prevEncounter.period.start
                    ? prevEncounter.period.start
                    : null}
                  <span>
                    {prevEncounter.serviceType
                      ? t(prevEncounter.serviceType)
                      : ''}{' '}
                    -
                    {prevEncounter.examination
                      ? t(prevEncounter.examination)
                      : ''}
                  </span>
                </div>
              </StyledCurrentExaminationHeader>
              <div>{prevEncounter.status ? t(prevEncounter.status) : ''}</div>

              {/*  <div>
            {encounter.examinationCode ? encounter.examinationCode : ''}
          </div>
          <div>{encounter.examination ? encounter.examination : ''}</div>
          <div>
            {encounter.serviceTypeCode ? encounter.serviceTypeCode : ''}
          </div>
          <div>{encounter.relatedPerson ? encounter.relatedPerson : ''}</div>*/}
            </StyledPrevEncountersPapers>
          ) : null;
        })}
      </React.Fragment>
    );
  };
  const [prevEncounters, setPrevEncounters] = React.useState([]);
  const currentDate = moment().utc().format('YYYY-MM-DD');

  const handleCreateData = async () => {
    debugger;
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
            oldEncountersArr.push(normalizedEncounter);
          }
        }
      });

      if (prevEncounters.length === 0) {
        setPrevEncounters(oldEncountersArr);
      }
    }
  };
  useEffect(() => {
    handleCreateData();
  });
  return (
    <StyledPatientBackground>
      {prevEncounters && prevEncounters.length > 0
        ? showPrevEncounters()
        : null}
    </StyledPatientBackground>
  );
};

export default PatientBackground;
