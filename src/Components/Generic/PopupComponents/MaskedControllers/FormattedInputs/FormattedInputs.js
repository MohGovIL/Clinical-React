import React from 'react';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { StyledMaskedInput } from './Style';
import { StyledVariantTextField } from '../../../../Forms/TestsAndTreatments/Style';

function convertDigitsInPattern(stringPattern) {
  let arr = stringPattern.split(',');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] === 'd' ? /d/ : arr[i];
    arr[i] = arr[i] === '[1-9]' ? /[1-9]/ : arr[i];
  }
  return arr;
}
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  /*{convertDigitsInPattern(other['aria-describedby'])}*/
  return (
    <StyledMaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={other['aria-describedby']}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default function FormattedInputs({
  componenttype,
  value,
  id,
  onChange,
  label,
  mask,
}) {
  function renderSwitch({ componenttype, value, onChange, id, label, mask }) {
    switch (componenttype) {
      case 'regularMasked':
        return (
          <FormControl>
            <InputLabel htmlFor={`formatted-text-mask-input-${label}-${id}`}>
              {label}
            </InputLabel>
            <Input
              dir={'ltr'}
              value={value}
              onChange={onChange}
              name={`textmask-${label}-${id}`}
              id={`formatted-text-mask-input-${label}-${id}`}
              aria-describedby={mask}
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        );

      case 'textFieldWithMask':
        return (
          <StyledVariantTextField
            dir={'ltr'}
            label={label}
            value={value}
            onChange={onChange}
            name={`numberformat-${label}-${id}`}
            id={`formatted-numberformat-input-${label}-${id}`}
            InputProps={{
              'aria-describedby': mask,
              inputComponent: TextMaskCustom,
            }}
          />
        );

      default:
        return '';
    }
  }

  return renderSwitch({
    componenttype,
    mask,
    value,
    id,
    onChange,
    label,
  });
}
