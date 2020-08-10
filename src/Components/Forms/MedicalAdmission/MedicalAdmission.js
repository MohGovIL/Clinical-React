//MedicalAdmission
import { connect } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
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
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';
import moment from 'moment';
import SaveForm from '../GeneralComponents/SaveForm';
import { store } from 'index';
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

  // KEEP this comment code here need that for later
  // const requiredErrorsRef = useRef({
  //   examinationCode: '',
  //   sensitivitiesCodes: '',
  //   sensitivities: '',
  //   backgroundDiseasesCodes: '',
  //   background_diseases: '',
  //   chronicMedicationCodes: '',
  //   medication: '',
  // });

  const [
    normalizedQuestionnaireResponse,
    setNormalizedQuestionnaireResponse,
  ] = React.useState({});

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

  useEffect(() => {
    (async () => {
      try {
        let normalizedFhirQuestionnaireResponse = {};
        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'medical_admission_questionnaire',
          },
        });
        const questionnaireResponse = await FHIR(
          'QuestionnaireResponse',
          'doWork',
          {
            functionName: 'getQuestionnaireResponse',
            functionParams: {
              encounterId: encounter.id,
              patientId: patient.id,
              questionnaireId: q.data.entry[1].resource.id,
            },
          },
        );
        if (questionnaireResponse.data.total) {
          normalizedFhirQuestionnaireResponse = normalizeFhirQuestionnaireResponse(
            questionnaireResponse.data.entry[1].resource,
          );
          // setNormalizedQuestionnaireResponse(
          //   normalizedFhirQuestionnaireResponse,
          // );
        }
        const Questionnaire = q.data.entry[1].resource;
        register({ name: 'questionnaire' });
        register({ name: 'questionnaireResponseId' });
        setValue([
          { questionnaire: Questionnaire },
          { questionnaireResponseId: normalizedFhirQuestionnaireResponse.id },
        ]);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => unregister(['questionnaire', 'questionnaireResponseId']);
  }, [register, setValue, unregister, encounter.id, patient.id]);

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

  const answerType = (type, data) => {
    if (type === 'string') {
      return [
        {
          valueString: data,
        },
      ];
    } else if (type === 'boolean') {
      return [
        {
          valueBoolean: data,
        },
      ];
    } else {
      return `No such type: ${type}`;
    }
  };

  const onSubmit = async (data) => {
    if (!data) getValues({ nest: true });
    console.log(data);
    console.log(isRequiredValidation(data));
    // return;
    try {
      const APIsArray = [];
      // const items = data.questionnaire.item.map((i) => {
      //   const item = {
      //     linkId: i.linkId,
      //     text: i.text,
      //   };
      //   switch (i.linkId) {
      //     case '1':
      //       item['answer'] = answerType(i.type, data.isInsulationInstruction);

      //       break;
      //     case '2':
      //       item['answer'] = answerType(
      //         i.type,
      //         data.insulationInstruction || '',
      //       );
      //       break;
      //     case '3':
      //       item['answer'] = answerType(i.type, data.nursingDetails);
      //       break;
      //     case '4':
      //       item['answer'] = answerType(i.type, data.isPregnancy || '');
      //       break;
      //     default:
      //       break;
      //   }
      //   return item;
      // });
      // if (data.questionnaireResponseId) {
      //   APIsArray.push(
      //     FHIR('QuestionnaireResponse', 'doWork', {
      //       functionName: 'patchQuestionnaireResponse',
      //       questionnaireResponseId: data.questionnaireResponseId,
      //       questionnaireResponseParams: {
      //         item: items,
      //       },
      //     }),
      //   );
      // } else {
      //   APIsArray.push(
      //     FHIR('QuestionnaireResponse', 'doWork', {
      //       functionName: 'createQuestionnaireResponse',
      //       functionParams: {
      //         questionnaireResponse: {
      //           questionnaire: data.questionnaire.id,
      //           status: 'completed',
      //           patient: patient.id,
      //           encounter: encounter.id,
      //           authored: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      //           source: patient.id,
      //           item: items,
      //         },
      //       },
      //     }),
      //   );
      // }
      // const cloneEncounter = { ...encounter };
      // cloneEncounter['examinationCode'] = data.examinationCode;
      // cloneEncounter['serviceTypeCode'] = data.serviceTypeCode;
      // cloneEncounter['priority'] = data.isUrgent;
      // await FHIR('Encounter', 'doWork', {
      //   functionName: 'updateEncounter',
      //   functionParams: {
      //     encounterId: encounter.id,
      //     encounter: cloneEncounter,
      //   },
      // });

      //Creating new conditions for backgroundDiseases
      if (data.background_diseases === 'There are diseases') {
        data.backgroundDiseasesCodes.forEach((backgroundDisease) => {
          APIsArray.push(
            FHIR('Condition', 'doWork', {
              functionParams: {
                condition: {
                  categorySystem:
                    'http://clinikal/condition/category/medical_problem',
                  codeSystem: 'http://clinikal/diagnosis/type/MOH_ICD10',
                  codeCode: backgroundDisease,
                  patient: patient.id,
                  recorder: store.getState().login.userID,
                  clinicalStatus: 'active',
                },
              },
              functionName: 'createCondition',
            }),
          );
        });
      }

      //Creating new conditions for sensitivities
      if (data.sensitivities === 'Known') {
        data.sensitivitiesCodes.forEach((sensitivities) => {
          APIsArray.push(
            FHIR('Condition', 'doWork', {
              functionName: 'createCondition',
              functionParams: {
                condition: {
                  categorySystem:
                    'http://clinikal/condition/category/sensitive',
                  codeSystem: 'http://clinikal/diagnosis/type/MOH_ICD10',
                  codeCode: sensitivities,
                  patient: patient.id,
                  recorder: store.getState().login.userID,
                  clinicalStatus: 'active',
                },
              },
            }),
          );
        });
      }
      // Creating a new medicationStatement
      if (data.medication === 'Exist') {
        data.chronicMedicationCodes.forEach((medication) => {
          APIsArray.push(
            FHIR('MedicationStatement', 'doWork', {
              functionName: 'createMedicationStatement',
              functionParams: {
                medicationStatement: {
                  status: 'active',
                  patient: patient.id,
                  informationSource: store.getState().login.userID,
                  medicationCodeableConceptCode: medication,
                  medicationCodeableConceptSystem:
                    'http://clinikal/valueset/drugs_list',
                },
              },
            }),
          );
        });
      }
      return APIsArray;
    } catch (error) {
      console.log(error);
    }
  };

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
                gridLabel={t('Pregnancy')}
                radioName={'isPregnancy'}
                listValues={pregnancyRadioList}
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
          <SaveForm
            encounter={encounter}
            mainStatus={'triaged'}
            onSubmit={onSubmit}
            validationFunction={isRequiredValidation}
          />
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
