import React, { useEffect, useState } from 'react';

import {
  Select,
  MenuItem,
  createMuiTheme,
  ThemeProvider,
  Grid,
} from '@material-ui/core';
import { FormContext, useForm } from 'react-hook-form';
import Fields from './Fields';

import PopUpFormTemplates from '../../../Generic/PopupComponents/PopUpFormTemplates';

import { connect } from 'react-redux';

const InstructionsForTreatment = ({ encounter }) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      Instruction: [],
    },
  });
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data) => console.log('data', JSON.stringify(data));
  const [defaultContext, setDefaultContext] = useState('');

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

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PopUpFormTemplates {...popUpProps} />

        <Fields handlePopUpProps={handlePopUpProps} />

        <input type='submit' />
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
