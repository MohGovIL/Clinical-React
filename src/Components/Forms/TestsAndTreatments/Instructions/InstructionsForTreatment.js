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
import { FHIR } from '../../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

let renderCount = 0;

const InstructionsForTreatment = () => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      Instruction: [],
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => console.log('data', JSON.stringify(data));

  renderCount++;

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Field Array </h1>
        <p>The following demo allow you to delete, append, prepend items</p>
        <span className='counter'>Render Count: {renderCount}</span>
        <Fields />
        <input type='submit' />
      </form>
    </FormContext>
  );
};

export default InstructionsForTreatment;
