import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import HeaderPatient from 'Assets/Elements/HeaderPatient';
import * as Moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { devicesValue } from 'Assets/Themes/BreakPoints';
import { useTranslation } from 'react-i18next';
import firstRouteMapper from 'Utils/Helpers/firstRouteMapper';
import StyledEncounterSheet from './Style';
import PatientDataBlock from './PatientDataBlock';
import PatientBackground from './PatientBackground';
import EncounterForms from './EncounterForms';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';

const EncounterSheet = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
}) => {
  const { t } = useTranslation();

  const [listAllergy, setAllergyList] = useState([]);
  const [listMedicalProblem, setMedicalProblem] = useState([]);
  const [medicalProblemIsUpdated, setMedicalProblemIsUpdated] = useState(0); //for online update

  const isTabletMode = useMediaQuery(
    `(max-width: ${devicesValue.tabletPortrait}px)`,
  );
  const allBreadcrumbs = [
    {
      text: t('Patient Admission'),
      separator: 'NavigateNextIcon',
      url: '#',
    },
    {
      text: `${patient.firstName} ${patient.lastName} ${
        !isTabletMode ? `${t('Encounter date')}: ` : ''
      } ${Moment(encounter.startTime).format(formatDate)}`,
      separator: false,
      url: '#',
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const listAllergyResult = await FHIR('Condition', 'doWork', {
          functionName: 'getConditionListByParams',
          functionParams: {
            category: 'allergy',
            subject: patient.id,
            status: '1',
          },
        });
        if (listAllergyResult.data && listAllergyResult.data.total > 0) {
          let normalizedlistAllergy = [];
          // eslint-disable-next-line
          listAllergyResult.data.entry.map((res, id) => {
            if (res.resource && res.resource.resourceType === 'Condition') {
              let allergy = normalizeFhirCondition(res.resource);
              normalizedlistAllergy.push(allergy);
            }
          });
          setAllergyList(normalizedlistAllergy);
        }
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();

    (async () => {
      try {
        const listMedicalProblemResult = await FHIR('Condition', 'doWork', {
          functionName: 'getConditionListByParams',
          functionParams: {
            category: 'medical_problem',
            subject: patient.id,
            status: '1',
          },
        });
        if (
          listMedicalProblemResult.data &&
          listMedicalProblemResult.data.total > 0
        ) {
          let normalizedListMedicalProblem = [];
          // eslint-disable-next-line
          listMedicalProblemResult.data.entry.map((res, id) => {
            if (res.resource && res.resource.resourceType === 'Condition') {
              let medicalProblem = normalizeFhirCondition(res.resource);
              normalizedListMedicalProblem.push(medicalProblem);
            }
          });
          setMedicalProblem(normalizedListMedicalProblem);
        }
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalProblemIsUpdated]);

  const callBackMedicalProblemChange = (listAllergy, listMedicalProblem) => {
    // setMedicalProblemIsUpdated(Moment()); for online from db
    setAllergyList(listAllergy);
    setMedicalProblem(listMedicalProblem);
  };


  const handleCloseClick = () => {
    history.push(`${firstRouteMapper(verticalName)}`);
  };

  return (
    <React.Fragment>
      <HeaderPatient
        breadcrumbs={allBreadcrumbs}
        languageDirection={languageDirection}
        onCloseClick={handleCloseClick}
      />
      <StyledEncounterSheet>
        <PatientDataBlock
          encounter={encounter}
          patient={patient}
          formatDate={formatDate}
          languageDirection={languageDirection}
        />
        <PatientBackground
          encounter={encounter}
          patient={patient}
          formatDate={formatDate}
          languageDirection={languageDirection}
          listAllergy={listAllergy}
          listMedicalProblem={listMedicalProblem}
        />
        <EncounterForms
          encounter={encounter}
          patient={patient}
          formatDate={formatDate}
          languageDirection={languageDirection}
          changeMedicalProblem={callBackMedicalProblemChange}
        />
      </StyledEncounterSheet>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(EncounterSheet);
