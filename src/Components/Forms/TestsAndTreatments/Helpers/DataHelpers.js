import {
  StyledConstantTextField,
  StyledVariantTextField,
} from 'Components/Forms/TestsAndTreatments/Style';

import LabelWithHourComponent from 'Components/Forms/TestsAndTreatments/LabelWithHourComponent';
import React from 'react';
import FormattedInputs from 'Components/Generic/MaskedControllers/FormattedInputs/FormattedInputs';
import {
  handleVarientCustomClickFunction,
  handleVarientPaddTheZeroPlaceClickFunction,
  mergeMultipleIndicators,
  thickenWithDataFunction,
} from 'Components/Forms/TestsAndTreatments/Helpers/FunctionHelpers';

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
        /*
        case '8308-9'://"Body height --standing":
        case '8335-2'://"Body weight Estimated":
        */
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
  /*
  case '20564-1'://"Oxygen saturation in Blood":
  case '69000-8'://"Heart rate --sitting":
  case '72514-3'://"Pain severity - 0-10 verbal numeric rating [Score] - Reported":
  case '8310-5'://"Body temperature":
  case '8462-4'://"Diastolic blood pressure":
  case '8480-6'://"Systolic blood pressure":
  case '74774-1'://"Glucose [Mass/volume] in Serum, Plasma or Blood":
  case '9303-9'://"Respiratory rate --resting":
 */

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

  variantIndicatorsNormalizedDataTemp = mergeMultipleIndicators(
    variantIndicatorsNormalizedDataTemp,
    'Diastolic blood pressure',
    'Systolic blood pressure',
    '/',
  );
  let i = 0;

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
      case 'Pulse':
      case 'Saturation':
      case 'Breaths per minute':
      case 'Pain level':
      case 'Blood sugar':
        thickenWithDataFunction({
          newRow,
          dataset,
          label: dataset.label,
          i,
          disabled,
          variantIndicatorsNew,
          sizeTemp,
          key,
        });
        dataset.handleOnChange = (evt) =>
          handleVarientCustomClickFunction(
            evt,
            variantIndicators,
            setVariantIndicators,
          );
        break;
      case 'Fever':
        thickenWithDataFunction({
          newRow,
          dataset,
          label: dataset.label,
          i,
          disabled,
          variantIndicatorsNew,
          sizeTemp,
          key,
        });
        dataset.handleOnChange = (evt) =>
          handleVarientPaddTheZeroPlaceClickFunction(
            evt,
            variantIndicators,
            setVariantIndicators,
          );
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
