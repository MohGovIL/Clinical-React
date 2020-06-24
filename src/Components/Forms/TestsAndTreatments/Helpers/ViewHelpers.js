//this is after normalization

//these are helper functions to check data change
export const handleWeightChange = ({
  value,
  valid,
  weight,
  setterFunction,
}) => {
  /* add this when bugs arise from design something like
      &&
    value < 600*/
  const weightTemp = valid && value.length < 6 ? value : weight;
  setterFunction(weightTemp);
};

export const handleHeightChange = ({
  value,
  valid,
  height,
  setterFunction,
}) => {
  const heightTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 4 ? value : height;
  setterFunction(heightTemp);
};
export const handlePressureChange = ({
  value,
  valid,
  pressure,
  id,
  setterFunction,
}) => {
  const currentPressure = pressure[id];
  const pressureTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 7 ? value : currentPressure;
  const tempPressureArray = ([...pressure][id] = pressureTemp);
  setterFunction(tempPressureArray);
};

export const handlePulseChange = ({
  value,
  valid,
  pulse,
  id,
  setterFunction,
}) => {
  const currentPulse = pulse[id];
  const pulseTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentPulse;
  const tempPulseArray = ([...pulse][id] = pulseTemp);
  setterFunction(tempPulseArray);
};
export const handleFeverChange = ({
  value,
  valid,
  fever,
  id,
  setterFunction,
}) => {
  const currentFever = fever[id];
  const feverTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentFever;
  const tempFeverArray = ([...fever][id] = feverTemp);
  setterFunction(tempFeverArray);
};

export const handleSaturationChange = ({
  value,
  valid,
  saturation,
  id,
  setterFunction,
}) => {
  const currentSaturation = saturation[id];
  const saturationTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentSaturation;
  const tempFeverArray = ([...saturation][id] = saturationTemp);
  setterFunction(tempFeverArray);
};
export const handleBreathsPerSecChange = ({
  value,
  valid,
  breathsPerSec,
  id,
  setterFunction,
}) => {
  const currentFever = breathsPerSec[id];
  const breathsPerSecTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentFever;
  const tempFeverArray = ([...breathsPerSec][id] = breathsPerSecTemp);
  setterFunction(tempFeverArray);
};
export const handlePainLevelChange = ({
  value,
  valid,
  painLevel,
  id,
  setterFunction,
}) => {
  const currentPainLevel = painLevel[id];
  const breathsPerSecTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentPainLevel;
  const tempFeverArray = ([...painLevel][id] = breathsPerSecTemp);
  setterFunction(tempFeverArray);
};
export const handleBloodSugerChange = ({
  value,
  valid,
  bloodSugar,
  id,
  setterFunction,
}) => {
  const currentBloodSugar = bloodSugar[id];
  const breathsPerSecTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 3 ? value : currentBloodSugar;
  const tempFeverArray = ([...bloodSugar][id] = breathsPerSecTemp);
  setterFunction(tempFeverArray);
};
