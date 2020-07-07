//this array is created after normalization of data retrieved from FHIR
import {
  StyledConstantTextField,
  StyledVariantTextField,
} from 'Components/Forms/TestsAndTreatments/Style';

import LabelWithHourComponent from 'Components/Forms/TestsAndTreatments/LabelWithHourComponent';
import React from 'react';
import FormattedInputs from 'Components/Generic/MaskedControllers/FormattedInputs/FormattedInputs';

function mergeMultipleConstants(
  variantIndicatorsNormalizedData,
  keyOne,
  keyTwo,
  seperator,
) {
  let keysPlaces = [];
  Object.entries(variantIndicatorsNormalizedData).map(([key, dataset]) => {
    if (
      dataset &&
      (dataset['description'] === keyOne || dataset['description'] === keyTwo)
    ) {
      keysPlaces.push(key);
    }
  });
  if (keysPlaces.length > 0) {
    let variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description']
    }${seperator}${
      variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['description']
    }`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['unit']}`;
    if (
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['value'] &&
      variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['value']
    ) {
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['value'] = `${
        variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['value']
          ? variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['value']
          : ''
      }${seperator}${
        variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['value']
          ? variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['value']
          : ''
      }`;
    }
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['mask']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['code']}`;

    delete variantIndicatorsNormalizedDataTemp[keysPlaces[1]];

    return variantIndicatorsNormalizedDataTemp;
  }
  return variantIndicatorsNormalizedData;
}

export const thickenTheConstantIndicators = ({
  normalizedConstantObservation,
  constantIndicators,
  setConstantIndicators,
  disabled,
}) => {
  if (!constantIndicators) constantIndicators = [];
  if (normalizedConstantObservation) {
    for (const [key, dataset] of Object.entries(
      normalizedConstantObservation,
    )) {
      switch (dataset && dataset.label ? dataset.label : key) {
        case 'Weight':
        case 'Height':
          {
            if (!dataset) return;
            dataset.value = dataset.value ? dataset.value : '';
            dataset.componentType = disabled
              ? StyledVariantTextField
              : FormattedInputs;
            dataset.name = dataset.label;
            dataset.disabled = disabled;
            dataset.componenttype = 'textFieldWithMask';
            dataset.handleOnChange = (evt) => {
              const name = evt.target.name;
              const newValue = evt.target.value;
              const valid = evt.target.validity.valid;
              const tempConstantIndicators = { ...constantIndicators[name] };
              tempConstantIndicators.value = newValue;
              setConstantIndicators({ [name]: tempConstantIndicators });
            };
          }
          break;
      }
      constantIndicators[
        dataset && dataset.label ? dataset.label : key
      ] = dataset;
    }
  }

  return { ...constantIndicators };
};

export const thickenTheVariantIndicators = ({
  variantIndicatorsNormalizedData,
  disabled,
  newRow,
  size,
  variantIndicatorsNew,
  setVariantIndicators,
}) => {
  let variantIndicators = {};
  let sizeTemp = size ? size : 0;
  if (!variantIndicatorsNormalizedData) return [];

  let variantIndicatorsNormalizedDataTemp = variantIndicatorsNew;
  if (newRow) {
    variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
  }
  variantIndicatorsNormalizedDataTemp = { ...variantIndicatorsNew };
  variantIndicatorsNormalizedDataTemp =
    newRow && variantIndicatorsNew && !variantIndicatorsNew.userName
      ? {
          ...{ userName: variantIndicatorsNew[0].userName },
          ...variantIndicatorsNormalizedData,
        }
      : variantIndicatorsNormalizedDataTemp;
  sizeTemp++;

  variantIndicatorsNormalizedDataTemp = mergeMultipleConstants(
    variantIndicatorsNormalizedDataTemp,
    'Diastolic blood pressure',
    'Systolic blood pressure',
    '/',
  );
  let i = 0;
  /*
   *
   *  Blood pressure:
   *  Pulse:
   *  Fever:
   *  Saturation:
   *  Breaths per minute:
   *  Pain level:
   *  Blood sugar:
   *
   * */
  Object.entries(variantIndicatorsNormalizedDataTemp).map(([key, dataset]) => {
    if (!dataset) return;

    switch (dataset.label ? dataset.label : key) {
      case 'userName':
        dataset.componentType = LabelWithHourComponent;
        dataset.label = dataset.name ? dataset.name : '';

        dataset.value = dataset.loggedHour
          ? newRow
            ? ''
            : dataset.loggedHour
          : '';
        dataset.id = `user_name_${sizeTemp > 0 ? sizeTemp : i}`;
        break;
      case 'Blood pressure':
        dataset.disabled = disabled;
        dataset.idTemp = i;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Blood pressure']
          ? variantIndicatorsNew['Blood pressure']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;

        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.id = `blood_pressure_${sizeTemp > 0 ? sizeTemp : i}`;
        dataset.componenttype = 'textFieldWithMask';

        break;
      case 'Pulse':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Pulse']
          ? variantIndicatorsNew['Pulse']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;
        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };

        dataset.componenttype = 'textFieldWithMask';
        dataset.id = `pulse_${sizeTemp > 0 ? sizeTemp : i}`;
        /*dataset['aria-describedby'] = dataset.mask;*/

        break;
      case 'Fever':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Fever']
          ? variantIndicatorsNew['Fever']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;
        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          let newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          //pad Fever With Zeros
          if (
            parseFloat(newValue.replace(/_/g, '')) >= 0 &&
            newValue.slice(-1) === '_' &&
            parseFloat(newValue.slice(-3).replace(/_/g, '')) >= 0
          ) {
            newValue = newValue.replace('._', '.0');
          } else {
            newValue = newValue.replace('.0', '._');
          }
          //end pad
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.componenttype = 'textFieldWithMask';
        dataset.id = `fever_${sizeTemp > 0 ? sizeTemp : i}`;
        /*dataset['aria-describedby'] = dataset.mask;*/
        break;
      case 'Saturation':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Saturation']
          ? variantIndicatorsNew['Saturation']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;

        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.id = `saturation_${sizeTemp > 0 ? sizeTemp : i}`;
        dataset.componenttype = 'textFieldWithMask';

        break;

      case 'Breaths per minute':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Breaths per minute']
          ? variantIndicatorsNew['Breaths per minute']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;
        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.componenttype = 'textFieldWithMask';
        dataset.id = `breaths_per_min_${sizeTemp > 0 ? sizeTemp : i}`;
        /*dataset['aria-describedby'] = dataset.mask;*/
        break;
      case 'Pain level':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Pain level']
          ? variantIndicatorsNew['Pain level']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;
        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.id = `pain_level_${sizeTemp > 0 ? sizeTemp : i}`;
        dataset.componenttype = 'textFieldWithMask';
        /*dataset['aria-describedby'] = dataset.mask;*/ break;
      case 'Blood sugar':
        dataset.disabled = disabled;
        dataset.newRow = newRow;
        dataset.name = dataset.label ? dataset.label : key;
        dataset.value = dataset.value
          ? dataset.value
          : variantIndicatorsNew['Blood sugar']
          ? variantIndicatorsNew['Blood sugar']
          : '';
        dataset.componentType = disabled
          ? StyledVariantTextField
          : FormattedInputs;

        dataset.handleOnChange = (evt) => {
          const name = evt.target.name;
          const newValue = evt.target.value;
          const valid = evt.target.validity.valid;
          const tempVariantIndicators = { ...variantIndicators };
          tempVariantIndicators[name].value = newValue;
          setVariantIndicators(tempVariantIndicators);
        };
        dataset.componenttype = 'textFieldWithMask';
        dataset.id = `blood_sugar_${sizeTemp > 0 ? sizeTemp : i}`;

        break;
    }
    variantIndicators[
      key === 'userName' ? key : dataset.label ? dataset.label : key
    ] = dataset;
  });

  return { ...variantIndicators };
};

export const thickenTheData = ({
  normalizedConstantObservation,
  normalizedVariantObservation,
  indicators,
  variantIndicators,
  setVariantIndicators,
  constantIndicators,
  setConstantIndicators,
  variantIndicatorsNew,
  setVariantIndicatorsNew,
  handleConstantVariablesChange,
  disabled,
}) => {
  let constantIndicatorsUIData = [];
  if (normalizedConstantObservation) {
    constantIndicatorsUIData = thickenTheConstantIndicators({
      normalizedConstantObservation,
      constantIndicators,
      setConstantIndicators,
      handleConstantVariablesChange,
      disabled,
    });
    return constantIndicatorsUIData;
  }
  let variantIndicatorsNormalizedData =
    indicators && indicators['data'] && indicators['data']['variant']
      ? indicators['data']['variant']
      : null;

  let newVariantIndicatorsUIData = [];
  if (variantIndicatorsNew) {
    newVariantIndicatorsUIData = thickenTheVariantIndicators({
      disabled: false,
      newRow: true,
      size: normalizedVariantObservation.length,
      setVariantIndicators: setVariantIndicatorsNew,
      variantIndicatorsNew,
      variantIndicatorsNormalizedData,
    });
    return { ...newVariantIndicatorsUIData };
  }
  let variantIndicatorUIData = [];
  if (normalizedVariantObservation) {
    variantIndicatorUIData = thickenTheVariantIndicators({
      normalizedVariantObservation,
      disabled: true,
      newRow: false,
      size: 0,
      setVariantIndicators: setVariantIndicators,
      variantIndicatorsNew: normalizedVariantObservation,
      variantIndicatorsNormalizedData,
    });
    return { ...variantIndicatorUIData };
  }
  return { ...variantIndicatorUIData };
};
