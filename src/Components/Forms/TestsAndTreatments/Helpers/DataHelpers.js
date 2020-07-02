//this array is created after normalization of data retrieved from FHIR
import { StyledConstantTextField, StyledVariantTextField } from '../Style';
import * as ComponentsViewHelpers from './ViewHelpers';
import LabelWithHourComponent from '../LabelWithHourComponent';
import React from 'react';
import FormattedInputs from '../../../Generic/MaskedControllers/FormattedInputs/FormattedInputs';
function mergeMultipleConstants(
  variantIndicatorsNormalizedData,
  keyOne,
  keyTwo,
  seperator,
) {
  let keysPlaces = [];
  for (let i = 0; i < variantIndicatorsNormalizedData.length; i++) {
    if (
      variantIndicatorsNormalizedData[i]['description'] === keyOne ||
      variantIndicatorsNormalizedData[i]['description'] === keyTwo
    ) {
      keysPlaces.push(i);
    }
  }
  if (keysPlaces.length > 0) {
    let variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description']
    }/${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['description']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit']
    }/${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['unit']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask']
    }/${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['mask']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code']
    }/${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['code']}`;

    delete variantIndicatorsNormalizedDataTemp[keysPlaces[1]];

    return variantIndicatorsNormalizedDataTemp;
  }
  return variantIndicatorsNormalizedData;
}

export const thickenTheConstantIndicators = ({
  height,
  weight,
  setWeight,
  setHeight,
  constantIndicatorsNormalizedData,
}) => {
  let constantIndicators = [];
  if (constantIndicatorsNormalizedData) {
    for (const [key, dataset] of Object.entries(
      constantIndicatorsNormalizedData,
    )) {
      switch (dataset.label) {
        case 'Height':
          {
            dataset.value = height; //get from system value set constants
            dataset.componentType = StyledConstantTextField;
            dataset.handleOnChange = (e) =>
              ComponentsViewHelpers.handleConstantVariablesChange({
                value: e.target.value,
                valid: e.target.validity.valid,
                current: weight,
                setterFunction: setHeight,
              });
          }
          break;
        case 'Weight': {
          dataset.value = weight; //get from system value set constants
          dataset.componentType = StyledConstantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleConstantVariablesChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              current: height,
              setterFunction: setWeight,
            });
        }
      }
      constantIndicators.push(dataset);
    }
  }
  return constantIndicators;
};

export const thickenTheVariantIndicators = ({
  variantIndicatorsNormalizedData: variantIndicatorsNormalizedData,
  userName,
  fever,
  pressure,
  saturation,
  painLevel,
  breathsPerMin,
  bloodSugar,
  pulse,
  setFever,
  setPressure,
  setSaturation,
  setPainLevel,
  setBreathsPerMin,
  setBloodSugar,
  setPulse,
  disabled,
  newRow,
  size,
}) => {
  let variantIndicators = [];

  if (!variantIndicatorsNormalizedData) return [];
  for (let i = 0; i < userName.length; i++) {
    let variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
    variantIndicatorsNormalizedDataTemp.unshift({ label: 'userName' });
    size++;
    /*let variantIndicatorsNormalaizedDataTemp = [
      ...variantIndicatorsNormalizedData,
    ];*/

    variantIndicatorsNormalizedDataTemp = mergeMultipleConstants(
      variantIndicatorsNormalizedDataTemp,
      'Diastolic blood pressure',
      'Systolic blood pressure',
      '/',
    );

    for (const [key, dataset] of Object.entries(
      variantIndicatorsNormalizedDataTemp,
    )) {
      dataset.disabled = disabled;
      dataset.newRow = newRow;
      switch (dataset.label) {
        case 'userName':
          dataset.componentType = LabelWithHourComponent;
          dataset.label =
            userName && userName[i] && userName[i]['name']
              ? userName[i]['name']
              : '';

          dataset.value =
            userName && userName[i] && userName[i]['loggedHour']
              ? newRow
                ? ''
                : userName[i]['loggedHour']
              : '';
          dataset.id = `user_name_${size > 0 ? size : i}`;
          break;
        case 'Blood pressure':
          dataset.value = pressure && pressure[i] ? pressure[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: pressure,
              setterFunction: setPressure,
              id: i,
            });
          dataset.id = `blood_pressure_${size > 0 ? size : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/

          break;
        case 'Pulse':
          dataset.value = pulse && pulse[i] ? pulse[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: pulse,
              setterFunction: setPulse,
              id: i,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `pulse_${size > 0 ? size : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/

          break;
        case 'Fever':
          dataset.value = fever && fever[i] ? fever[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: fever,
              setterFunction: setFever,
              id: i,
              paddWithZero: true,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `fever_${size > 0 ? size : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Saturation':
          dataset.value = saturation && saturation[i] ? saturation[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: saturation,
              setterFunction: setSaturation,
              id: i,
            });
          dataset.id = `saturation_${size > 0 ? size : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Breaths per minute':
          dataset.value =
            breathsPerMin && breathsPerMin[i] ? breathsPerMin[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: breathsPerMin,
              setterFunction: setBreathsPerMin,
              id: i,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `breaths_per_min_${size > 0 ? size : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Pain level':
          dataset.value = painLevel && painLevel[i] ? painLevel[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: painLevel,
              setterFunction: setPainLevel,
              id: i,
            });
          dataset.id = `pain_level_${size > 0 ? size : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Blood sugar':
          dataset.value = bloodSugar && bloodSugar[i] ? bloodSugar[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: bloodSugar,
              setterFunction: setBloodSugar,
              id: i,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `blood_sugar_${size > 0 ? size : i}`;

          break;
      }
    }
    variantIndicators.push(variantIndicatorsNormalizedDataTemp);
  }
  return variantIndicators;
};
