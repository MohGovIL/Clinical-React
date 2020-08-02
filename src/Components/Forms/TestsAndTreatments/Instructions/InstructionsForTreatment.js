/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose InstructionsForTreatment -  will be the main component which will hold and render EM Test and Treatment instruction form .
 * @returns the main form Component.
 */

import React, { useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import Fields from 'Components/Forms/TestsAndTreatments/Instructions/Fields';
import PopUpFormTemplates from 'Components/Generic/PopupComponents/PopUpFormTemplates';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SaveTestAndTreatments from './SaveTestAndTreatments';
import Grid from '@material-ui/core/Grid';

/**
 *
 * @param encounter
 * @returns   UI main form.
 */
const InstructionsForTreatment = ({
  encounter,
  permission,
  setSaveFunction,
  saveIndicatorsOnSubmit,
}) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      Instruction: [],
    },
  });
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data) => {
    console.log('data', JSON.stringify(data));
    console.log(isRequiredValidation(data));
    saveIndicatorsOnSubmit();
  };
  const [defaultContext, setDefaultContext] = useState('');
  const { t } = useTranslation();
  const callBack = (data, name) => {
    setDefaultContext(data);
    setValue(name, data);
  };

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
  let edit = encounter.status === 'finished' ? false : true; // is this form in edit mode or in view mode
  const [requiredErrors, setRequiredErrors] = useState([
    {
      test_treatment_type: '',
      test_treatment_status: '',
    },
  ]);

  const requiredFields = {
    test_treatment_type: {
      name: 'test_treatment_type',
      type: 'checkbox',
      required: function (data) {
        return data !== '';
      },
    },
    test_treatment_status: {
      name: 'test_treatment_status',
      required: function (data) {
        return data !== false || data === '';
      },
    },
  };
  const isRequiredValidation = (data) => {
    let clean = true;
    if (!data['Instruction']) {
      return clean;
    }
    for (
      let instructionIndex = 0;
      instructionIndex < requiredErrors.length;
      instructionIndex++
    ) {
      for (const fieldKey in requiredFields) {
        if (requiredFields.hasOwnProperty(fieldKey)) {
          const field = requiredFields[fieldKey];
          if (
            !data ||
            !data['Instruction'] ||
            !data['Instruction'][instructionIndex] ||
            data['Instruction'][instructionIndex][field.name] === undefined
          )
            continue;

          let answer = field.required(
            data['Instruction'][instructionIndex][field.name],
          );
          if (answer) {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[instructionIndex][field.name] = '';
              return cloneState;
            });
          } else {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[instructionIndex][field.name] = t('Value is required');
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
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PopUpFormTemplates {...popUpProps} />

        <Fields
          setRequiredErrors={setRequiredErrors}
          requiredErrors={requiredErrors}
          handlePopUpProps={handlePopUpProps}
        />
        <Grid container spacing={4}>
          <SaveTestAndTreatments
            setSaveFunction={setSaveFunction}
            permission={permission}
          />
        </Grid>
      </form>
    </FormContext>
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
