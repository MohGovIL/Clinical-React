//MedicalAdmission

import { connect } from 'react-redux';
import React, { useState } from 'react';
import VisitDetails from '../../Generic/PatientAdmission/PatientDetailsBlock/VisitDetails';
import {
  Controller,
  FormContext,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Grid } from '@material-ui/core';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import { useTranslation } from 'react-i18next';
import {
  StyledInsulation,
  StyledIsUrgent,
  StyledTemplateSelection,
  StyledForm,
  StyledGroupCheckbox, StyledRadio,
} from './Style';
import CustomizedTableButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';
import CustomizedTextField from '../../../Assets/Elements/CustomizedTextField';
import { StyledFormGroup } from '../../Generic/PatientAdmission/PatientDetailsBlock/Style';
import { Label } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });
  const { handleSubmit, formState, control } = methods;

  const [pregnancyValue, setPregnancyValue] = useState();

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

  const onSubmit = async (data) => {};
  const handleChangeRadio = (event) => {
    setPregnancyValue(event.target.value);
  };


  const buttonTemplateSelect = {
    label: t('Template selection'),
    variant: 'text',
    color: 'primary',
    // mode: formButtonSave,
    // other: { type: 'submit', form: 'createNewPatient', tabIndex: 10 },
    // onClickHandler: savePatientAction,
  };
  return (
    <React.Fragment>
      <FormContext {...methods} requiredErrors={requiredErrors}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <VisitDetails
            reasonCodeDetails={encounter.extensionReasonCodeDetails}
            examination={encounter.examination}
            examinationCode={encounter.examinationCode}
            serviceType={encounter.serviceType}
            serviceTypeCode={encounter.serviceTypeCode}
            priority={encounter.priority}
            disableHeaders={false}
            disableButtonIsUrgent={false}
          />
          <StyledIsUrgent>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <span>
                <b>{t('Is urgent?')}</b>
              </span>
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
          </StyledIsUrgent>
          <StyledInsulation>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <span>
                <b>{t('Insulation required')}?</b>
              </span>
              {/* Requested service - switch */}
              <StyledSwitch
                name='insulationRequired'
                // register={register}
                label_1={'No'}
                label_2={'Yes'}
                marginLeft={'40px'}
                marginRight={'33px'}
              />
            </Grid>
          </StyledInsulation>
          <StyledTemplateSelection>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <Grid item xs={10}>
                <Controller
                  control={control}
                  name='nursingAnmenza'
                  //defaultValue={}
                  as={
                    <CustomizedTextField
                      width={'85%'}
                      label={t('Nursing anmenza')}
                    />
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <CustomizedTableButton {...buttonTemplateSelect} />
              </Grid>
            </Grid>
          </StyledTemplateSelection>
          <StyledGroupCheckbox>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <Grid item xs={2}>
                  <Typography variant='h6' component='h6'><b>{t('Pregnancy')}:</b></Typography>
              </Grid>
              <Grid item xs={2}>
                <FormLabel component='legend'>{t('No')}<StyledRadio
                  icon={<FiberManualRecordIcon htmlColor={'#dadbda'} />}
                  checkedIcon={<FiberManualRecordIcon htmlColor={'#076ce9'}/>}
                  checked={pregnancyValue === t('No')} onChange={handleChangeRadio} color='primary' value={t("No")} name="pregnancy"/></FormLabel>
              </Grid>
              <Grid item xs={2}>
                <FormLabel component='legend'>{t('Yes')}<StyledRadio
                  icon={<FiberManualRecordIcon htmlColor={'#dadbda'} />}
                  checkedIcon={<FiberManualRecordIcon htmlColor={'#076ce9'}/>}
                  checked={pregnancyValue === t('Yes')} onChange={handleChangeRadio} color='primary' value={t("Yes")} name="pregnancy"/></FormLabel>
              </Grid>
            </Grid>
          </StyledGroupCheckbox>
        </StyledForm>
      </FormContext>
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
