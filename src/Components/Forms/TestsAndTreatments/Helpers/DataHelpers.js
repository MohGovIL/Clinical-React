//this array is created after normalization of data retrieved from FHIR
import { StyledConstantTextField } from '../Style';
import * as ComponentsViewHelpers from './ViewHelpers';
import LabelWithHourComponent from '../LabelWithHourComponent';

export const thickenTheConstantIndicators = ({
  height,
  weight,
  setWeight,
  setHeight,
  constantIndicatorsNormalaizedData,
}) => {
  let heightTemplateData = constantIndicatorsNormalaizedData['height'];
  let weightemplateData = constantIndicatorsNormalaizedData['weight'];

  const constantIndicators = [
    {
      label: 'Height',
      id: 'height',
      type: 'cm',
      componentType: StyledConstantTextField,
      pattern: '[1-9]{1,3}',
      value: height,
      handleOnChange: (e) =>
        ComponentsViewHelpers.handleHeightChange({
          value: e.target.value,
          valid: e.target.validity.valid,
          height: height,
          setterFunction: setWeight,
        }),
    },
    {
      label: 'Weight',
      id: 'weight',
      componentType: StyledConstantTextField,
      type: 'kg',
      pattern: '[1-9]{1,3}|[1-9]{1,3}[.]|^[0-9]\\d{2}\\.\\d{1}$',
      value: weight,
      handleOnChange: (e) =>
        ComponentsViewHelpers.handleWeightChange({
          value: e.target.value,
          valid: e.target.validity.valid,
          weight: weight,
          setterFunction: setHeight,
        }),
    },
  ];
  return constantIndicators;
};

export const thickenTheVariantIndicators = ({
  constantIndicatorsNormalaizedData,
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
}) => {
  let variantIndicators = [];
  for (let i = 0; i < userName.length; i++) {
    variantIndicators.push([
      {
        label:
          userName && userName[i] && userName[i]['name']
            ? userName[i]['name']
            : '',
        componentType: LabelWithHourComponent,
        value:
          userName && userName[i] && userName[i]['loggedHour']
            ? userName[i]['loggedHour']
            : '',
      },
      {
        label: 'Pressure',
        type: 'mmHg',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,3}|[1-9]{1,3}[/]|^[0-9]\\d{2}\\/\\d{1}$',
        value: pressure && pressure[i] ? pressure[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePressureChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            height: pressure,
            setterFunction: setPressure,
            id: 1,
          }),
      },
      {
        label: 'Pulse',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,2}',
        value: pulse && pulse[i] ? pulse[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePulseChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            height: pulse,
            pulse: setPulse,
            id: 1,
          }),
      },
      {
        label: 'Fever',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,2}[%]',
        value: fever && fever[i] ? fever[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleFeverChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            fever: fever,
            setterFunction: setFever,
            id: 1,
          }),
      },
      {
        label: 'Saturation',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,3}[%]',
        value: saturation && saturation[i] ? saturation[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleSaturationChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            saturation: saturation,
            setterFunction: setSaturation,
            id: 1,
          }),
      },
      {
        label: 'Breaths per minute',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,2}',
        value: breathsPerMin && breathsPerMin[i] ? breathsPerMin[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleBreathsPerSecChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            breathsPerSec: breathsPerMin,
            setterFunction: setBreathsPerMin,
            id: 1,
          }),
      },
      {
        label: 'Pain level',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,2}',
        value: painLevel && painLevel[i] ? painLevel[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePainLevelChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            breathsPerSec: painLevel,
            setterFunction: setPainLevel,
            id: 1,
          }),
      },
      {
        label: 'Blood sugar',
        componentType: StyledConstantTextField,
        pattern: '[1-9]{1,2}',
        value: bloodSugar && bloodSugar[i] ? bloodSugar[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleBloodSugerChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            bloodSugar: bloodSugar,
            setterFunction: setBloodSugar,
            id: 1,
          }),
      },
    ]);
  }

  return variantIndicators;
};
