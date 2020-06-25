//MedicalAdmission

import { connect } from 'react-redux';
import React, { useState } from 'react';
import VisitDetails from '../../Generic/PatientAdmission/PatientDetailsBlock/VisitDetails';
import { FormContext, useForm, useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import StyledSwitch from '../../../Assets/Elements/StyledSwitch';
import { StyledFormGroup } from '../../Generic/PatientAdmission/PatientDetailsBlock/Style';
import { useTranslation } from 'react-i18next';

const MedicalAdmission = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
}) => {
  const { t } = useTranslation();
  // const {
  //   register,
  //   control,
  //   // requiredErrors,
  //   setValue,
  //   unregister,
  //   reset,
  //   getValues,
  // } = useFormContext();

  const [requiredErrors, setRequiredErrors] = useState({
    selectTest: '',
    commitmentAndPaymentReferenceForPaymentCommitment: '',
    commitmentAndPaymentCommitmentDate: '',
    commitmentAndPaymentCommitmentValidity: '',
    commitmentAndPaymentDoctorsName: '',
    commitmentAndPaymentDoctorsLicense: '',
    ReferralFile: '',
    CommitmentFile: '',
  });

  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });


  return (
    <React.Fragment>
      MedicalAdmission - {permission}
        <FormContext {...methods} requiredErrors={requiredErrors}>
          <VisitDetails
            reasonCodeDetails={encounter.extensionReasonCodeDetails}
            examination={encounter.examination}
            examinationCode={encounter.examinationCode}
            serviceType={encounter.serviceType}
            serviceTypeCode={encounter.serviceTypeCode}
            priority={encounter.priority}
          />
        </FormContext>
      <Grid
        container
        direction={'row'}
        justify={'flex-start'}
        alignItems={'center'}>
        <span>{t('Is urgent?')}</span>
        {/* Requested service - switch */}
        <StyledSwitch
          name='isUrgent'
          // register={register}
          label_1={'No'}
          label_2={'Yes'}
          marginLeft={'40px'}
          marginRight={'40px'}
        />
      </Grid>
      <Grid
        container
        direction={'row'}
        justify={'flex-start'}
        alignItems={'center'}>
        <span>{t('Insulation required?')}</span>
        {/* Requested service - switch */}
        <StyledSwitch
          name='insulationRequired'
          // register={register}
          label_1={'No'}
          label_2={'Yes'}
          marginLeft={'40px'}
          marginRight={'40px'}
        />
      </Grid>
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
export default connect(mapStateToProps, null)(MedicalAdmission);
