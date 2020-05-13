import React from 'react';
import { connect } from 'react-redux';
import HeaderPatient from 'Assets/Elements/HeaderPatient';
import moment from 'moment';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { devicesValue } from 'Assets/Themes/BreakPoints';
import { useTranslation } from 'react-i18next';
import firstRouteMapper from 'Utils/Helpers/firstRouteMapper';

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
      } ${moment(encounter.startTime).format(formatDate)}`,
      separator: false,
      url: '#',
    },
  ];

  const handleCloseClick = () => {
    history.push(`${firstRouteMapper(verticalName)}`);
  };
  
  return (
    <HeaderPatient
      breadcrumbs={allBreadcrumbs}
      languageDirection={languageDirection}
      onCloseClick={handleCloseClick}
    />
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
