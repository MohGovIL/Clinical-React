/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} props
 * @returns masked text ui
 */

import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { StyledMaskedInput } from './Style';
import { StyledVariantTextField } from 'Components/Forms/TestsAndTreatments/Style';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <StyledMaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={other['aria-describedby']}
      dir='ltr'
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
  name,
}) {
  function renderSwitch({
    componenttype,
    value,
    onChange,
    id,
    label,
    mask,
    name,
  }) {
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
            InputLabelProps={{
              shrink: value !== '' ? true : false,
            }}
            dir={'ltr'}
            label={label}
            value={value && value.replace(mask, '')}
            onChange={onChange}
            name={name}
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
    name,
  });
}
