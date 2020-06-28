//this array is created after normalization of data retrieved from FHIR
import { StyledConstantTextField, StyledVariantTextField } from '../Style';
import * as ComponentsViewHelpers from './ViewHelpers';
import LabelWithHourComponent from '../LabelWithHourComponent';

export const thickenTheConstantIndicators = ({
  height,
  weight,
  setWeight,
  setHeight,
  constantIndicatorsNormalizedData,
}) => {
  let constantIndicators = [];
  if (constantIndicatorsNormalizedData) {
    let heightTemplateData = constantIndicatorsNormalizedData['height'];
    let weightemplateData = constantIndicatorsNormalizedData['weight'];

    for (const [key, dataset] of Object.entries(
      constantIndicatorsNormalizedData,
    )) {
      switch (key) {
        case 'height':
          {
            dataset['type'] = 'cm'; //get from system value set constants
            dataset['value'] = height; //get from system value set constants
            dataset['componentType'] = StyledConstantTextField;
            dataset['handleOnChange'] = (e) =>
              ComponentsViewHelpers.handleWeightChange({
                value: e.target.value,
                valid: e.target.validity.valid,
                weight: weight,
                setterFunction: setHeight,
              });
          }
          break;
        case 'weight': {
          dataset['type'] = 'kg'; //get from system value set constants
          dataset['value'] = weight; //get from system value set constants
          dataset['componentType'] = StyledConstantTextField;
          dataset['handleOnChange'] = (e) =>
            ComponentsViewHelpers.handleHeightChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              height: height,
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
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,3}|[1-9]{1,3}[/]|^[0-9]\\d{2}\\/\\d{1}$',
        value: pressure && pressure[i] ? pressure[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePressureChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            height: pressure,
            setterFunction: setPressure,
            id: i,
          }),
      },
      {
        label: 'Pulse',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,2}',
        value: pulse && pulse[i] ? pulse[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePulseChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            height: pulse,
            pulse: setPulse,
            id: i,
          }),
      },
      {
        label: 'Fever',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,2}[%]',
        value: fever && fever[i] ? fever[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleFeverChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            fever: fever,
            setterFunction: setFever,
            id: i,
          }),
      },
      {
        label: 'Saturation',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,3}[%]',
        value: saturation && saturation[i] ? saturation[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleSaturationChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            saturation: saturation,
            setterFunction: setSaturation,
            id: i,
          }),
      },
      {
        label: 'Breaths per minute',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,2}',
        value: breathsPerMin && breathsPerMin[i] ? breathsPerMin[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleBreathsPerSecChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            breathsPerSec: breathsPerMin,
            setterFunction: setBreathsPerMin,
            id: i,
          }),
      },
      {
        label: 'Pain level',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,2}',
        value: painLevel && painLevel[i] ? painLevel[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handlePainLevelChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            breathsPerSec: painLevel,
            setterFunction: setPainLevel,
            id: i,
          }),
      },
      {
        label: 'Blood sugar',
        componentType: StyledVariantTextField,
        pattern: '[1-9]{1,2}',
        value: bloodSugar && bloodSugar[i] ? bloodSugar[i] : '',
        handleOnChange: (e) =>
          ComponentsViewHelpers.handleBloodSugerChange({
            value: e.target.value,
            valid: e.target.validity.valid,
            bloodSugar: bloodSugar,
            setterFunction: setBloodSugar,
            id: i,
          }),
      },
    ]);
  }

  return variantIndicators;
};
