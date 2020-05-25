import * as React from 'react';
import MedicalFile from 'Assets/Images/medical-file@2x.png';
import Camera from 'Assets/Images/camera@2x.png';
import {
  StyledCameraIcon,
  StyledIconContainer,
  StyledMedicalFileIcon,
} from './Style';
import { useTranslation } from 'react-i18next';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import { useHistory } from 'react-router-dom';
import { store } from '../../../../index';
import firstRouteMapper from '../../../../Utils/Helpers/firstRouteMapper';
import { connect } from 'react-redux';

const StyledExaminationStatusesWithIcons = ({
  encounterData,
  summaryLetter,
  encounterSheet,
  patient,
  verticalName,
  handleCreateData,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const MedicalFileClick = () => {};
  const CameraClick = () => {
    handleCreateData(true);
    store.dispatch(setEncounterAndPatient(encounterData, patient));
    /* history.push(`${baseRoutePath()}/generic/encounterSheet`);
    history.goBack();*/
  };

  return (
    <React.Fragment>
      <StyledIconContainer>
        <StyledCameraIcon
          canClickEncounter={encounterSheet ? false : true}
          onClick={!encounterSheet ? CameraClick : null}>
          <img alt={'Camera'} src={Camera} />
          <span>{t('Encounter sheet')}</span>
        </StyledCameraIcon>
        <StyledMedicalFileIcon
          canClickMedical={summaryLetter ? true : false}
          onClick={summaryLetter ? MedicalFileClick : null}>
          <img alt={'MedicalFile'} src={MedicalFile} />
          <span>{t('Summary letter')}</span>
        </StyledMedicalFileIcon>
      </StyledIconContainer>
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
export default connect(
  mapStateToProps,
  null,
)(StyledExaminationStatusesWithIcons);
