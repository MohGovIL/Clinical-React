/* eslint-disable no-use-before-define */

import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;
/**
 *
 * @param theSelectOptions -  should be with key title this sort of array : [
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
export default function AutoCompleteWithCheckboxes({ theSelectOptions }) {
  return (
    <Autocomplete
      multiple
      id='checkboxes-tags-demo'
      options={theSelectOptions}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label='Checkboxes'
          placeholder='Favorites'
        />
      )}
    />
  );
}
