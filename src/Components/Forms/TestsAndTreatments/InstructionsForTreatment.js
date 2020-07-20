import { connect } from 'react-redux';
import {
  StyledCardContent,
  StyledCardCover,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledConstantHeaders,
  StyledIconedButton,
  StyledInstructions,
  StyledTreatmentInstructionsButton,
  StyledTypographyHour,
  StyledTypographyName,
} from './Style';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PLUS from '../../../Assets/Images/plus.png';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import normalizeFhirUser from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import { FHIR } from '../../../Utils/Services/FHIR';
import {
  StyledAutoComplete,
  StyledFormGroup,
} from '../../Generic/PatientAdmission/PatientDetailsBlock/Style';
import normalizeFhirValueSet from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import AutoCompleteWithCheckboxes from '../../../Assets/Elements/AutoComplete/AutoCompleteWithCheckboxes';
import { getValueSet } from '../../../Utils/Services/FhirAPI';
import moment from 'moment';
import AutoCompleteWithText from '../../../Assets/Elements/AutoComplete/AutoCompleteWithText';
import CustomizedTextField from '../../../Assets/Elements/CustomizedTextField';
import { MenuItem } from '@material-ui/core';
import AddCardInstruction from './AddCardInstruction';
import { FormContext, useForm } from 'react-hook-form';
import StyledDiagnosisAndRecommendations from '../DiagnosisAndRecommendations/Style';
import PopUpFormTemplates from '../../Generic/PopupComponents/PopUpFormTemplates';

const InstructionsForTreatment = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
  currentUser,
}) => {
  let user = normalizeFhirUser(currentUser);

  const [
    collectedTestAndTreatmentsFromFhir,
    setCollectedTestAndTreatmentsFromFhir,
  ] = useState([]);

  const [
    currentTestTreatmentsInstructions,
    setCurrentTestTreatmentsInstructions,
  ] = useState([]);

  useEffect(() => {
    (async () => {
      const testAndTreatmentsValuesetFromFhir = await FHIR(
        'ValueSet',
        'doWork',
        {
          functionName: 'getValueSet',
          functionParams: { id: 'tests_and_treatments' },
        },
      );

      const testAndTreatmentObj = [];

      testAndTreatmentsValuesetFromFhir.data.expansion.contains.map(
        (testAndTreatment) => {
          const normalizedTestAndTreatmentsFromFhirValueSet = normalizeFhirValueSet(
            testAndTreatment,
          );
          testAndTreatmentObj.push({
            title: normalizedTestAndTreatmentsFromFhirValueSet.name,
            code: normalizedTestAndTreatmentsFromFhirValueSet.code,
          });
        },
      );

      setCollectedTestAndTreatmentsFromFhir(testAndTreatmentObj);
      setCurrentTestTreatmentsInstructions(collectedTestAndTreatmentsFromFhir);
    })();
  }, []);

  let edit = encounter.status === 'finished' ? false : true; // is this form in edit mode or in view mode
  const addNewInstruction = (evt) => {
    let addThisInstruction = {
      user,
      edit,
      encounter,
      collectedTestAndTreatmentsFromFhir,
      value: '',
      currentTestTreatmentsInstructions,
    };

    let currentTestTreatmentsInstructionsTemp = [
      addThisInstruction,
      ...currentTestTreatmentsInstructions,
    ];

    setCurrentTestTreatmentsInstructions([
      ...currentTestTreatmentsInstructionsTemp,
    ]);
  };

  const [defaultContext, setDefaultContext] = useState('');
  const handlePopUpClose = () => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: false,
      };
    });
  };
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
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      instructionsForTreatment: [
        {
          test_treatment: '',
          test_treatment_type: '',
          test_treatment_recommendations: '',
          test_treatment_status: '',
          test_treatment_remark: '',
          test_treatment_referral: '',
        },
      ],
    },
  });
  const { handleSubmit, setValue, register, unregister } = methods;
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(isRequiredValidation(data));
    console.log(JSON.stringify(data));
  };

  React.useEffect(() => {
    /*  (async () => {
      try {
        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'diagnosis_and_recommendations_questionnaire',
          },
        });
        const Questionnaire = q.data.entry[1].resource;
        register({ name: 'questionnaireId' });
        setValue('questionnaireId', Questionnaire.id);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => unregister('questionnaireId');*/
  }, [register, setValue, unregister]);

  const [requiredErrors, setRequiredErrors] = React.useState([
    {
      test_treatment: '',
      test_treatment_type: '',
      test_treatment_recommendations: '',
      test_treatment_status: '',
      test_treatment_remark: '',
      test_treatment_referral: '',
    },
  ]);
  const requiredFields = {
    test_treatment: {
      name: 'test_treatment',
      /* required: function (data) {
        return data && data.length > 0;
      },*/
    },
    test_treatment_status: {
      name: 'test_treatment_status',
      required: function (data) {
        return data && data.length > 0;
      },
    },
    test_treatment_type: {
      name: 'test_treatment_type',
      required: function (data) {
        return data && data.length > 0;
      },
    },
    test_treatment_recommendations: {
      name: 'test_treatment_recommendations',
      /*  required: function (data) {
        return data && data.length > 0;
      },*/
    },
    test_treatment_remark: {
      name: 'test_treatment_remark',
      /*required: function (data) {
        return data && data.length > 0;
      },*/
    },
  };

  const isRequiredValidation = (data) => {
    let clean = true;
    if (!data['drugRecommendation']) {
      return clean;
    }
    for (
      let medicineIndex = 0;
      medicineIndex < requiredErrors.length;
      medicineIndex++
    ) {
      for (const fieldKey in requiredFields) {
        if (requiredFields.hasOwnProperty(fieldKey)) {
          let answer;
          const field = requiredFields[fieldKey];
          answer = field.required(
            data['drugRecommendation'][medicineIndex][field.name],
          );
          if (answer) {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[medicineIndex][field.name] = '';
              return cloneState;
            });
          } else {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[medicineIndex][field.name] = t('Value is required');
              return cloneState;
            });
            clean = false;
          }
        }
      }
    }
    return clean;
  };

  return (
    <React.Fragment>
      <PopUpFormTemplates {...popUpProps} />
      <FormContext
        {...methods}
        setPopUpProps={setPopUpProps}
        permission={encounter.status === 'finished' ? 'view' : permission}
        serviceType={encounter.serviceTypeCode}
        reasonCode={encounter.examinationCode}
        requiredErrors={requiredErrors}
        setRequiredErrors={setRequiredErrors}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledConstantHeaders>
            {t('Instructions for treatment')}
          </StyledConstantHeaders>
          <StyledTreatmentInstructionsButton onClick={addNewInstruction}>
            <img alt='plus icon' src={PLUS} />
            {t('Instructions for treatment')}
          </StyledTreatmentInstructionsButton>
          <hr />
          <StyledInstructions id='newRefInstructions'>
            {currentTestTreatmentsInstructions.map((value, index) => {
              return (
                <AddCardInstruction
                  key={index}
                  value={value.value}
                  index={index}
                  user={value.user}
                  edit={value.edit}
                  encounter={value.encounter}
                  collectedTestAndTreatmentsFromFhir={
                    value.collectedTestAndTreatmentsFromFhir
                  }
                  currentTestTreatmentsInstructions={
                    currentTestTreatmentsInstructions
                  }
                  setCurrentTestTreatmentsInstructions={
                    setCurrentTestTreatmentsInstructions
                  }
                />
              );
            })}
          </StyledInstructions>
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
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(InstructionsForTreatment);
