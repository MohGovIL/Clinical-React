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

  const handleCloseClick = () => {
    history.push(`${verticalName}/PatientTracking`);
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
        />
        <EncounterForms
          encounter={encounter}
          patient={patient}
          formatDate={formatDate}
          languageDirection={languageDirection}
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
