/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { StyledAutoComplete } from './style';

/**
 *
 * @param theSelectListOfText - should be with key title in this sort of array  : [
                                                               { title: 'The Shawshank Redemption', year: 1994 },
                                                               { title: 'The Godfather', year: 1972 },
                                                               { title: 'The Godfather: Part II', year: 1974 },
                                                               { title: 'The Dark Knight', year: 2008 },
                                                                  .
                                                                  .
                                                                  .
                                                              ]
 * @returns {*}
 * @constructor
 */
export default function AutoCompleteWithText({
  theSelectListOfText,
  label,
  id,
  setValue,
  value,
}) {
  const defaultProps = {
    options: theSelectListOfText,
    getOptionLabel: (option) => option.title,
  };
  return (
    <StyledAutoComplete
      {...defaultProps}
      blurOnSelect
      id={id}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} margin='normal' />
      )}
    />
  );
}
