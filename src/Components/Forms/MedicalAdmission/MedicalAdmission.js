//MedicalAdmission
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import VisitDetails from 'Components/Generic/PatientAdmission/PatientDetailsBlock/VisitDetails';
import { FormContext, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledForm } from './Style';

import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import PopUpFormTemplates from 'Components/Generic/PopupComponents/PopUpFormTemplates';
import NursingAnamnesis from './NursingAnamnesis';
import { FHIR } from 'Utils/Services/FHIR';
import { StyledButton } from 'Assets/Elements/StyledButton';
import UrgentAndInsulation from './UrgentAndInsulation';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import CustomizedSelectCheckList from '../../../Assets/Elements/CustomizedSelectCheckList';

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
  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });

  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    unregister,
  } = methods;

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

  const watchMedication = watch('medication');
  const [medicationChanged, setMedicationChanged] = useState(false);
  const [sensitivitiesChanged, setSensitivitiesChanged] = useState(false);
  const [backgroundDisChanged, setBackgroundDisChanged] = useState(false);

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

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data));
  };

  React.useEffect(() => {
    (async () => {
      try {
        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'medical_admission_questionnaire',
          },
        });
        const Questionnaire = q.data.entry[1].resource;
        register({ name: 'questionnaireId' });
        setValue('questionnaireId', Questionnaire.id);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => unregister('questionnaireId');
  }, [register, setValue, unregister]);

  useEffect(() => {
    register({ name: 'isPregnancy' });
    return () => unregister(['isPregnancy']);
  }, [register, unregister]);

  const pregnancyHandlerRadio = (value) => {
    //console.log('pregnancy: ' + value);
    setValue('isPregnancy', value);
  };

  const medicationHandlerRadio = (value) => {
    console.log('medication: ' + value);
    setMedicationChanged(value);
  };

  const sensitivitiesHandlerRadio = (value) => {
    console.log('sensitivities: ' + value);
    setSensitivitiesChanged(value);
  };

  const backgroundDisHandlerRadio = (value) => {
    console.log('backgroundDis: ' + value);
    setBackgroundDisChanged(value);
  };

  //Radio buttons for pregnancy
  const pregnancyRadioList = [t('No'), t('Yes')];

  //Radio buttons for medication details
  const medicationRadioList = [t("Doesn't exist"), t('Exist')];
  const sensitivitiesRadioList = [t('UNknown'), t('Known')];
  const backgroundDisRadioList = [
    t('Usually healthy'),
    t('There are diseases'),
  ];

  return (
    <React.Fragment>
      <PopUpFormTemplates {...popUpProps} />
      <FormContext
        {...methods}
        requiredErrors={requiredErrors}
        setPopUpProps={setPopUpProps}>
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
          <UrgentAndInsulation requiredUrgent requiredInsulation />
          <NursingAnamnesis />
          <>
            {/*need to make a new component for radio select*/}
            {(patient.gender === 'female' || patient.gender === 'other') && (
              <RadioGroupChoice
                register={register}
                gridLabel={t('Pregnancy')}
                radioName={'isPregnancy'}
                listValues={pregnancyRadioList}
                trueValue={t('Yes')}
                callBackFunction={pregnancyHandlerRadio}
              />
            )}
            <RadioGroupChoice
              gridLabel={t('Sensitivities')}
              radioName={'sensitivities'}
              listValues={sensitivitiesRadioList}
              trueValue={t('Known')}
              callBackFunction={sensitivitiesHandlerRadio}
            />
            {sensitivitiesChanged && (
              <CustomizedSelectCheckList
                labelInputText={'Sensitivities details'}
                helperErrorText={'The visit reason performed during the visit must be selected'}
              />
              // <CustomizedTextField
              //   control={control}
              //   name='medicationInstruction'
              //   width={'70%'}
              //   label={t('Sensitivities details')}
              // />
            )}
            <RadioGroupChoice
              gridLabel={t('Background diseases')}
              radioName={'background_diseases'}
              listValues={backgroundDisRadioList}
              trueValue={t('There are diseases')}
              callBackFunction={backgroundDisHandlerRadio}
            />
            {backgroundDisChanged && (
              <CustomizedTextField
                control={control}
                name='medicationInstruction'
                width={'70%'}
                label={t('Diseases details')}
              />
            )}
            <RadioGroupChoice
              gridLabel={t('Chronic medications')}
              radioName={'medication'}
              listValues={medicationRadioList}
              trueValue={t('Exist')}
              callBackFunction={medicationHandlerRadio}
            />
            {medicationChanged && (
              <CustomizedTextField
                control={control}
                name='medicationInstruction'
                width={'70%'}
                label={t('Medications details')}
              />
            )}
          </>
          <StyledButton
            color='primary'
            type='submit'
            disabled={permission === 'view' ? true : false}>
            SUBMIT
          </StyledButton>
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
