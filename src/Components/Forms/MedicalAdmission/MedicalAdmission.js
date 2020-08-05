//MedicalAdmission
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import VisitDetails from 'Components/Generic/PatientAdmission/PatientDetailsBlock/VisitDetails';
import { FormContext, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledForm, StyledRadioGroupChoice } from './Style';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import PopUpFormTemplates from 'Components/Generic/PopupComponents/PopUpFormTemplates';
import NursingAnamnesis from './NursingAnamnesis';
import { FHIR } from 'Utils/Services/FHIR';
import { StyledButton } from 'Assets/Elements/StyledButton';
import UrgentAndInsulation from './UrgentAndInsulation';
import Sensitivities from './Sensitivities';
import BackgroundDiseases from './BackgroundDiseases';
import ChronicMedication from './ChronicMedication';
import { Checkbox, Grid, ListItemText } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlankOutlined } from '@material-ui/icons';

const MedicalAdmission = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
  validationFunction,
  functionToRunOnTabChange,
}) => {
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });

  const { handleSubmit, register, setValue, unregister, getValues } = methods;

  const [requiredErrors, setRequiredErrors] = useState({
    examinationCode: '',
    sensitivitiesCodes: '',
    sensitivities: '',
    backgroundDiseasesCodes: '',
    background_diseases: '',
    chronicMedicationCodes: '',
    medication: '',
  });

  const requiredFields = React.useMemo(() => {
    return {
      examinationCode: {
        name: 'examinationCode',
        required: function (data) {
          return data[this.name] && data[this.name].length > 0;
        },
      },
      sensitivitiesCodes: {
        name: 'sensitivitiesCodes',
        required: function (data) {
          if (data.sensitivities === '' || data.sensitivities === 'UNknown') {
            return true;
          }
          return data[this.name] && data[this.name].length > 0;
        },
      },
      sensitivities: {
        name: 'sensitivities',
        required: function (data) {
          return data[this.name] && data[this.name].length > 0;
        },
      },
      backgroundDiseasesCodes: {
        name: 'backgroundDiseasesCodes',
        required: function (data) {
          if (
            data.background_diseases === '' ||
            data.background_diseases === 'Usually healthy'
          ) {
            return true;
          }
          return data[this.name] && data[this.name].length > 0;
        },
      },
      background_diseases: {
        name: 'background_diseases',
        required: function (data) {
          return data[this.name] && data[this.name].length > 0;
        },
      },
      chronicMedicationCodes: {
        name: 'chronicMedicationCodes',
        required: function (data) {
          if (data.medication === '' || data.medication === "Doesn't exist") {
            return true;
          }
          return data[this.name] && data[this.name].length > 0;
        },
      },
      medication: {
        name: 'medication',
        required: function (data) {
          return data[this.name] && data[this.name].length > 0;
        },
      },
    };
  }, []);

  const isRequiredValidation = (data) => {
    let clean = true;
    if (!data) data = getValues({ nest: true });
    const cloneRequiredErrors = { ...requiredErrors };
    for (const fieldKey in requiredFields) {
      if (requiredFields.hasOwnProperty(fieldKey)) {
        const field = requiredFields[fieldKey];
        const answer = field.required(data);
        if (answer) {
          cloneRequiredErrors[field.name] = '';
        } else {
          cloneRequiredErrors[field.name] = t(
            'A value must be entered in the field',
          );
          clean = false;
        }
      }
    }
    setRequiredErrors(cloneRequiredErrors);
    return clean;
  };

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
    console.log(data);
    console.log(isRequiredValidation(data));
  };
  useEffect(() => {
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

  useEffect(() => {
    validationFunction.current = isRequiredValidation;
    functionToRunOnTabChange.current = onSubmit;
    return () => {
      functionToRunOnTabChange.current = () => [];
      validationFunction.current = () => true;
    };
  }, []);

  const pregnancyHandlerRadio = (value) => {
    //console.log('pregnancy: ' + value);
    setValue('isPregnancy', value);
  };

  //Radio buttons for pregnancy
  const pregnancyRadioList = [t('No'), t('Yes')];

  const medicalAdmissionRenderOption = (option, state) => {
    return (
      <React.Fragment>
        <Grid container justify='flex-start' alignItems='center'>
          <Grid item xs={3}>
            <Checkbox
              color='primary'
              icon={<CheckBoxOutlineBlankOutlined />}
              checkedIcon={<CheckBox />}
              checked={state.selected}
            />
          </Grid>
          {option.serviceType && option.serviceType.name && (
            <Grid item xs={3}>
              <ListItemText primary={t(option.serviceType.name)} />
            </Grid>
          )}
          {option.reasonCode && option.reasonCode.name && (
            <Grid item xs={3}>
              <ListItemText primary={t(option.reasonCode.name)} />
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  };

  const medicalAdmissionChipLabel = (selected) => {
    return `${t(selected.reasonCode.name)}`;
  };

  console.log(requiredErrors);

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
          {/*need to make a new component for radio select*/}
          {(patient.gender === 'female' || patient.gender === 'other') && (
            <StyledRadioGroupChoice>
              <RadioGroupChoice
                register={register}
                gridLabel={t('Pregnancy')}
                radioName={'isPregnancy'}
                listValues={pregnancyRadioList}
                trueValue={t('Yes')}
                callBackFunction={pregnancyHandlerRadio}
              />
            </StyledRadioGroupChoice>
          )}
          <Sensitivities
            defaultRenderOptionFunction={medicalAdmissionRenderOption}
            defaultChipLabelFunction={medicalAdmissionChipLabel}
          />
          <BackgroundDiseases
            defaultRenderOptionFunction={medicalAdmissionRenderOption}
            defaultChipLabelFunction={medicalAdmissionChipLabel}
          />
          <ChronicMedication
            defaultRenderOptionFunction={medicalAdmissionRenderOption}
            defaultChipLabelFunction={medicalAdmissionChipLabel}
          />
          <Grid
            container
            justify={languageDirection === 'rtl' ? 'flex-end' : 'flex-start'}>
            <StyledButton
              color='primary'
              variant='contained'
              type='submit'
              letterSpacing={'0.1'}>
              {t('Save & Close')}
            </StyledButton>
          </Grid>
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
