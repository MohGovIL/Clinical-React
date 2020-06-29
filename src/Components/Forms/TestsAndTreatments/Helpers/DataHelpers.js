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
        case 'weight': {
          dataset['type'] = 'kg'; //get from system value set constants
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
  variantIndicatorsNormalaizedData,
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
}) => {
  let variantIndicators = [];
  if (!variantIndicatorsNormalaizedData) return [];
  for (let i = 0; i < userName.length; i++) {
    let variantIndicatorsNormalaizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalaizedData),
    );

    /*let variantIndicatorsNormalaizedDataTemp = [
      ...variantIndicatorsNormalaizedData,
    ];*/

    for (const [key, dataset] of Object.entries(
      variantIndicatorsNormalaizedDataTemp,
    )) {
      dataset.disabled = disabled;
      switch (dataset.label) {
        case 'userName':
          dataset.componentType = LabelWithHourComponent;
          dataset.label =
            userName && userName[i] && userName[i]['name']
              ? userName[i]['name']
              : '';

          dataset.value =
            userName && userName[i] && userName[i]['loggedHour']
              ? userName[i]['loggedHour']
              : '';
          break;
        case 'Pressure':
          dataset.value = pressure && pressure[i] ? pressure[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: pressure,
              setterFunction: setPressure,
              id: i,
            });
          break;
        case 'Pulse':
          dataset.value = pulse && pulse[i] ? pulse[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: pulse,
              setterFunction: setPulse,
              id: i,
            });
          break;
        case 'Fever':
          dataset.value = fever && fever[i] ? fever[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: fever,
              setterFunction: setFever,
              id: i,
            });
          break;
        case 'Saturation':
          dataset.value = saturation && saturation[i] ? saturation[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: saturation,
              setterFunction: setSaturation,
              id: i,
            });
          break;
        case 'Breaths per minute':
          dataset.value =
            breathsPerMin && breathsPerMin[i] ? breathsPerMin[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: breathsPerMin,
              setterFunction: setBreathsPerMin,
              id: i,
            });
          break;
        case 'Pain level':
          dataset.value = painLevel && painLevel[i] ? painLevel[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: painLevel,
              setterFunction: setPainLevel,
              id: i,
            });
          break;
        case 'Blood sugar':
          dataset.value = bloodSugar && bloodSugar[i] ? bloodSugar[i] : '';
          dataset.componentType = StyledVariantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: bloodSugar,
              setterFunction: setBloodSugar,
              id: i,
            });
          break;
      }
    }
    variantIndicators.push(variantIndicatorsNormalaizedDataTemp);
  }
  return variantIndicators;
};
