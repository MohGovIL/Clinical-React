import { StyledVariantTextField } from '../Style';
import FormattedInputs from '../../../Generic/MaskedControllers/FormattedInputs/FormattedInputs';

export const handleVarientCustomClickFunction = (
  evt,
  variantIndicators,
  setVariantIndicators,
) => {
  const name = evt.target.name;
  const newValue = evt.target.value;
  const valid = evt.target.validity.valid;
  const tempVariantIndicators = { ...variantIndicators };
  tempVariantIndicators[name].value = newValue;
  setVariantIndicators(tempVariantIndicators);
};

export const handleVarientPaddTheZeroPlaceClickFunction = (
  evt,
  variantIndicators,
  setVariantIndicators,
) => {
  const name = evt.target.name;
  let newValue = evt.target.value;
  const valid = evt.target.validity.valid;
  const tempVariantIndicators = { ...variantIndicators };
  //pad Fever With Zeros
  tempVariantIndicators[name].value = padTheZeroPlace(newValue);
  setVariantIndicators(tempVariantIndicators);
};

function padTheZeroPlace(newValue) {
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
  return newValue;
}

export function thickenWithDataFunction({
  newRow,
  dataset,
  label,
  i,
  disabled,
  variantIndicatorsNew,
  sizeTemp,
  key,
}) {
  dataset.disabled = disabled;
  dataset.idTemp = i;
  dataset.newRow = newRow;
  dataset.name = dataset.label ? dataset.label : key;
  dataset.value = dataset.value
    ? dataset.value
    : variantIndicatorsNew[label]
    ? variantIndicatorsNew[label]
    : '';
  dataset.componentType = disabled ? StyledVariantTextField : FormattedInputs;
  dataset.id = `blood_pressure_${sizeTemp > 0 ? sizeTemp : i}`;
  dataset.componenttype = 'textFieldWithMask';
}
