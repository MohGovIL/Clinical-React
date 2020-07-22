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
} from '../Style';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PLUS from '../../../../Assets/Images/plus.png';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import normalizeFhirUser from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import { FHIR } from '../../../../Utils/Services/FHIR';
import {
  StyledAutoComplete,
  StyledFormGroup,
} from '../../../Generic/PatientAdmission/PatientDetailsBlock/Style';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import AutoCompleteWithCheckboxes from '../../../../Assets/Elements/AutoComplete/AutoCompleteWithCheckboxes';
import { getValueSet } from '../../../../Utils/Services/FhirAPI';
import moment from 'moment';
import AutoCompleteWithText from '../../../../Assets/Elements/AutoComplete/AutoCompleteWithText';
import CustomizedTextField from '../../../../Assets/Elements/CustomizedTextField';
import { MenuItem } from '@material-ui/core';
import AddCardInstruction from './AddCardInstruction';
import { FormContext, useFieldArray, useForm } from 'react-hook-form';
import StyledDiagnosisAndRecommendations from '../../DiagnosisAndRecommendations/Style';
import PopUpFormTemplates from '../../../Generic/PopupComponents/PopUpFormTemplates';

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
      ...currentTestTreatmentsInstructions,
      addThisInstruction,
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

  const { control, handleSubmit } = useForm();
  /*const { handleSubmit, setValue, register, unregister } = methods;*/
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <React.Fragment>
      <PopUpFormTemplates {...popUpProps} />

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
                handlePopUpProps={handlePopUpProps}
                control={control}
                key={index}
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
        <button type='submit'>Submit</button>
      </form>
      {/* </FormContext>*/}
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
