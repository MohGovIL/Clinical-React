//this is after normalization

//these are helper functions to check data change
export const handleConstantVariablesChange = ({
  value,
  valid,
  current,
  setterFunction,
}) => {
  const heightTemp =
    /* add this when bugs arise from design something like
     && value < 300*/
    valid && value.length < 4 ? value : current;
  setterFunction(heightTemp);
};

export const handleVariantColumnChange = ({
  value,
  valid,
  parentArr,
  id,
  setterFunction,
}) => {
  if (!parentArr || !setterFunction) return;

  const currentValue = parentArr[id];
  const arrTemp = valid ? value : currentValue;
  const tempFeverArray = [...parentArr];
  tempFeverArray[id] = arrTemp;
  setterFunction(tempFeverArray);
};
