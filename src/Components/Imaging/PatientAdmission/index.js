import React, { useState } from 'react';
import { connect } from 'react-redux';
import HeaderPatient from 'Assets/Elements/HeaderPatient';
import { useTranslation } from 'react-i18next';
import * as Moment from 'moment';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import PatientDataBlock from './PatientDataBlock';
import PatientDetailsBlock from './PatientDetailsBlock';
import { StyledPatientRow, StyledDummyBlock, StyledBackdrop } from './Style';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { devicesValue } from 'Assets/Themes/BreakPoints';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import { FHIR } from 'Utils/Services/FHIR';

const PatientAdmission = ({
  patient,
  encounter,
  languageDirection,
  formatDate,
  history,
}) => {
  const { t } = useTranslation();

  const [edit, setEdit] = useState(0);

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
      text:
        patient.firstName +
        ' ' +
        patient.lastName +
        ' ' +
        (!isTabletMode ? t('Encounter date') + ': ' : '') +
        Moment(Moment.now()).format(formatDate),
      separator: false,
      url: '#',
    },
  ];

  const handleCloseClick = async () => {
    if (isDirty) {
      setIsPopUpOpen(true);
    } else {
      if (encounter.status === 'planned') {
        await FHIR('Encounter', 'doWork', {
          functionName: 'deleteEncounter',
          functionParams: {
            encounterId: encounter.id,
          },
        });
      }
      history.push(`${baseRoutePath()}/imaging/patientTracking`);
    }
  };

  const handleEditButtonClick = (isEdit) => {
    setEdit(isEdit);
  };

  const onPopUpCloseHandler = () => {
    setIsPopUpOpen(false);
  };

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const [isDirty, setIsDirty] = useState(false);

  const returnHandler = () => {
    setIsPopUpOpen(false);
  };

  const exitWithoutSavingHandler = async () => {
    if (encounter.status === 'planned') {
      await FHIR('Encounter', 'doWork', {
        functionName: 'deleteEncounter',
        functionParams: {
          encounterId: encounter.id,
        },
      });
    }
    history.push(`${baseRoutePath()}/imaging/patientTracking`);
  };

  return (
    <React.Fragment>
      <CustomizedPopup
        title={t('Exit without saving')}
        isOpen={isPopUpOpen}
        onClose={onPopUpCloseHandler}
        bottomButtons={[
          {
            color: 'primary',
            label: 'Return',
            variant: 'outlined',
            onClickHandler: returnHandler,
          },
          {
            color: 'primary',
            label: 'Exit without saving',
            variant: 'contained',
            onClickHandler: exitWithoutSavingHandler,
          },
        ]}>
        {t(
          `You choose to exit without saving your changes. Would you like to continue?`,
        )}
      </CustomizedPopup>
      <HeaderPatient
        breadcrumbs={allBreadcrumbs}
        languageDirection={languageDirection}
        onCloseClick={handleCloseClick}
        edit_mode={edit}
      />
      <StyledPatientRow>
        <StyledBackdrop open={true} edit_mode={edit}>
          {Object.values(patient).length &&
            Object.values(encounter).length > 0 && (
              <PatientDataBlock
                patientData={patient}
                onEditButtonClick={handleEditButtonClick}
                edit_mode={edit}
                languageDirection={languageDirection}
                formatDate={formatDate}
                priority={encounter.priority}
              />
            )}
        </StyledBackdrop>
        <StyledDummyBlock edit_mode={edit} />
        {Object.values(patient).length > 0 &&
          Object.values(encounter).length > 0 && (
            <PatientDetailsBlock
              encounterData={encounter}
              patientData={patient}
              edit_mode={edit}
              formatDate={formatDate}
              setIsDirty={setIsDirty}
            />
          )}
      </StyledPatientRow>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
  };
};

export default connect(mapStateToProps, null)(PatientAdmission);
