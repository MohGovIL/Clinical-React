import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';

import TestTreatment from '../TestTreatment';
import TestTreatmentInstructions from '../TestTreatmentInstructions';
import { StyledCardRoot } from '../../Style';

const Fields = () => {
  const { control } = useFormContext();
  const { fields, insert, prepend, append, remove } = useFieldArray({
    control,
    name: 'Instruction',
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <TestTreatment index={index} item={item} />
              </Grid>
              <Grid item xs={3}>
                <TestTreatmentInstructions index={index} item={item} />
              </Grid>
              <Grid item xs={3}>
                <button type='button' onClick={() => remove(index)}>
                  Delete
                </button>
              </Grid>
            </Grid>
          </div>
        );
      })}

      <section>
        <button
          type='button'
          onClick={() => {
            if (fields.length > 0) {
              insert(parseInt(0, 10), {
                test_treatment: '',
                test_treatment_type: '',
              });
            } else {
              append({ test_treatment: '', test_treatment_type: '' });
            }
            /* prepend({ test_treatment: '', test_treatment_type: '' });*/
          }}>
          prepend
        </button>
      </section>
    </>
  );
};

export default Fields;
