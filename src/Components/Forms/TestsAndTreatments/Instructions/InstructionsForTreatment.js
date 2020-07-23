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
import { Grid, MenuItem } from '@material-ui/core';
import AddCardInstruction from './AddCardInstruction';
import {
  Controller,
  FormContext,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import StyledDiagnosisAndRecommendations from '../../DiagnosisAndRecommendations/Style';
import PopUpFormTemplates from '../../../Generic/PopupComponents/PopUpFormTemplates';
import PDF from '../../../../Assets/Images/pdf.png';
import { StyledSelectTemplateButton } from '../../../../Assets/Elements/StyledSelectTempleteButton';
import StyledSwitch from '../../../../Assets/Elements/StyledSwitch';

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
  const { t } = useTranslation();
  /*  test_treatment: '',
    test_treatment_type: '',
    test_treatment_referral: '',
    instructions: '',
    details: '',
    test_treatment_remark: '',
    test_treatment_status: true,*/

  const addNewInstruction = (evt) => {
    prepend({});
  };
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
    })();
  }, []);
  let user = normalizeFhirUser(currentUser);
  let edit = encounter.status === 'finished' ? false : true; // is this form in edit mode or in view mode
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

  const handlePopUpProps = (
    title,
    fields,
    id,
    callBack,
    name,
    defaultContext,
  ) => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: true,
        formFieldsTitle: title,
        formFields: fields,
        formID: id,
        setTemplatesTextReturned: callBack,
        name,
        defaultContext: defaultContext,
      };
    });
  };

  const { register, control, handleSubmit, reset, watch, setValue } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'Instructions',
    },
  );
  let watchInstructions = [];

  const callBack = (data, name) => {
    setDefaultContext(data);
    setValue(name, data);
  };
  return (
    <React.Fragment>
      <PopUpFormTemplates {...popUpProps} />
      <StyledConstantHeaders>
        {t('Instructions for treatment')}
      </StyledConstantHeaders>
      <StyledTreatmentInstructionsButton onClick={addNewInstruction}>
        <img alt='plus icon' src={PLUS} />
        {t('Instructions for treatment')}
      </StyledTreatmentInstructionsButton>
      <hr />
      <StyledInstructions id='newRefInstructions'>
        <FormContext>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            {fields.map((item, index) => {
              /*    watchInstructions =
                watch(`Instruction[${index}]`) &&
                watch(`Instruction[${index}]`).instructions
                  ? watch(`Instruction[${index}]`).instructions
                  : '';*/
              return (
                <AddCardInstruction
                  watchInstructions={watchInstructions}
                  callBack={callBack}
                  setValue={setValue}
                  item={item}
                  name={'Instructions'}
                  handlePopUpProps={handlePopUpProps}
                  control={control}
                  key={item.id}
                  index={index}
                  user={user}
                  edit={edit}
                  encounter={encounter}
                  watch={watch}
                  register={register}
                  collectedTestAndTreatmentsFromFhir={
                    collectedTestAndTreatmentsFromFhir
                  }
                />
              );
            })}

            <input type='submit' />
          </form>
        </FormContext>
      </StyledInstructions>
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
