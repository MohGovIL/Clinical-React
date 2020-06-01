import * as React from 'react';
import MedicalFile from 'Assets/Images/medical-file@2x.png';
import Camera from 'Assets/Images/camera@2x.png';
import {
  StyledCameraIcon,
  StyledIconContainer,
  StyledListItem,
  StyledMedicalFileIcon,
} from 'Components/Generic/EncounterSheet/PatientBackground/Style';
import { useTranslation } from 'react-i18next';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import { store } from 'index';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import openDocumentInANewWindow from 'Utils/Helpers/openDocumentInANewWindow';

const StyledExaminationStatusesWithIcons = ({
  encounterData,
  encounterSheet,
  patient,
  handleCreateData,
}) => {
  const { t } = useTranslation();
  const MedicalFileClick = (doc) => {
    openDocumentInANewWindow(doc);
  };
  const CameraClick = () => {
    //If we wish to reload all the info again - multiple users ? then run
    // handleCreateData(true);
    store.dispatch(setEncounterAndPatient(encounterData, patient));
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
        {encounterData.documents && encounterData.documents.length > 0 ? (
          <List>
            {encounterData.documents.map((doc, docIndex) => {
              return (
                <StyledListItem key={docIndex}>
                  <StyledMedicalFileIcon
                    canClickMedical={true}
                    onClick={() => MedicalFileClick(doc)}>
                    <img alt={'MedicalFile'} src={MedicalFile} />
                    <span>{t('Summary letter')}</span>
                  </StyledMedicalFileIcon>

                  <br />
                </StyledListItem>
              );
            })}
          </List>
        ) : (
          <List>
            <StyledListItem>
              <StyledMedicalFileIcon canClickMedical={false}>
                <img alt={'MedicalFile'} src={MedicalFile} />
                <span>{t('Summary letter')}</span>
              </StyledMedicalFileIcon>
            </StyledListItem>
          </List>
        )}
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
