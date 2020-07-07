//MedicalAdmission

import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
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
} from './Style';
import CustomizedTableButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';

import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import { StyledSelectTemplateButton } from '../../../Assets/Elements/StyledSelectTempleteButton';
import PopUpFormTemplates from '../../Generic/PopupComponents/PopUpFormTemplates';

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

  const { handleSubmit, formState, control, watch, register } = methods;

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
  const watchisInsulationInstruction = watch('isInsulationInstruction');
  const watchisUrgent = watch('isUrgent');

  const watchMedication = watch('medication');
  const [medicationChanged, setMedicationChanged] = useState(false);

  const handlePopUpClose = () => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: false,
      };
    });
  };
  const [defaultContext, setDefaultContext] = React.useState('');
  const [popUpProps, setPopUpProps] = React.useState({
    popupOpen: false,
    formID: '',
    encounter,
    formFieldsTitle: '',
    defaultContext,
    setDefaultContext,
    handlePopupClose: handlePopUpClose,
    setTemplatesTextReturned: null,
    name: '',
  });

  const onSubmit = async (data) => {};

  useEffect(() => {
    console.log('is urgent: ' + watchisUrgent);
  }, [watchisUrgent]);

  const pregnancyHandlerRadio = (value) => {
    console.log('pregnancy: ' + value);
  };

  const medicationHandlerRadio = (value) => {
    console.log('medication: ' + value);
    setMedicationChanged(value);
  };

  //
  const callBack = (data, name) => {
    //setValue(name, data);
  };

  //
  const handlePopUpProps = (title, fields, id, callBack, name) => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: true,
        formFieldsTitle: title,
        formFields: fields,
        formID: id,
        setTemplatesTextReturned: callBack,
        name,
      };
    });
  };

  //
  const findingsDetails = t('Findings details');

  //Radio buttons for pregnancy
  const pregnancyRadioList = [t('No'), t('Yes')];

  //Radio buttons for medication details
  const medicationRadioList = [t("Doesn't exist"), t('Exist')];

  return (
    <React.Fragment>
      <PopUpFormTemplates {...popUpProps} />
      <FormContext {...methods} requiredErrors={requiredErrors}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  register={register}
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
                  name='isInsulationInstruction'
                  register={register}
                  label_1={'No'}
                  label_2={'Yes'}
                  marginLeft={'40px'}
                  marginRight={'33px'}
                />
              </Grid>
              {watchisInsulationInstruction && (
                <Controller
                  control={control}
                  name='insulationInstruction'
                  //defaultValue={}
                  as={
                    <CustomizedTextField
                      width={'70%'}
                      label={t('Insulation instruction')}
                    />
                  }
                />
              )}
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
                  <StyledSelectTemplateButton
                    disabled={permission === 'view' ? true : false}
                    onClick={() =>
                      handlePopUpProps(
                        findingsDetails,
                        'medical_admission_questionnaire', //to change
                        'medical_admission', //to change
                        callBack,
                        'findingsDetails',
                      )
                    }>
                    {t('Select template')}
                  </StyledSelectTemplateButton>
                </Grid>
              </Grid>
            </StyledTemplateSelection>
            <>
              {/*need to make a new component for radio select*/}
              {(patient.gender === 'female' || patient.gender === 'other') && (
                <RadioGroupChoice
                  gridLabel={t('Pregnancy')}
                  radioName={'pregnancy'}
                  listValues={pregnancyRadioList}
                  trueValue={t('Yes')}
                  callBackFunction={pregnancyHandlerRadio}
                />
              )}
              {/*<RadioGroupChoice*/}
              {/*  gridLabel={t('Medication')}*/}
              {/*  radioName={'medication'}*/}
              {/*  listValues={medicationRadioList}*/}
              {/*  trueValue={t('Exist')}*/}
              {/*  callBackFunction={medicationHandlerRadio}*/}
              {/*/>*/}
              {/*{medicationChanged && (*/}
              {/*  <Controller*/}
              {/*    control={control}*/}
              {/*    name='medicationInstruction'*/}
              {/*    //defaultValue={}*/}
              {/*    as={*/}
              {/*      <CustomizedTextField*/}
              {/*        width={'70%'}*/}
              {/*        label={t('Medications details')}*/}
              {/*      />*/}
              {/*    }*/}
              {/*  />*/}
              {/*)}*/}
            </>
          </StyledForm>
        </form>
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
