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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

/* todo- for now not on used */
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <StyledMaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      format={other['aria-describedby']}
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
  onKeyUp,
  label,
  mask,
  placeholder,
  name,
  symbol
}) {
  function renderSwitch({
    componenttype,
    value,
    onChange,
    onKeyUp,
    id,
    label,
    placeholder,
    mask,
    name,
    symbol
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
              value={value && value.replace('.00', '')}
              onChange={onChange}
              onKeyUp={onKeyUp}
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
              shrink:true
            }}
            dir={'ltr'}
            label={label}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            autoComplete="no"
            name={name}
            type={'text'}
            onInput = {(e) =>{
              if (placeholder && !mask) {
                if(/[a-zA-Z&^*#@]+$/.test(e.target.value)){
                  e.target.value = e.target.value.slice(0, -1);
                }
                e.target.value = e.target.value.substring(0,placeholder.length)
              }
            }}
            id={`formatted-numberformat-input-${label}-${id}`}
            placeholder={placeholder}
            InputProps={{
              'aria-describedby': mask,
              autoComplete:"off",
              inputComponent: mask ? TextMaskCustom : 'input',
              endAdornment: symbol && (
                <InputAdornment>
                  <IconButton size={'small'}>
                    {symbol}
                  </IconButton>
                </InputAdornment>
              )
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
    placeholder,
    value,
    id,
    onChange,
    onKeyUp,
    label,
    name,
    symbol
  });

}


