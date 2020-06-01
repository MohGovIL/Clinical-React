export const combineBase_64 = (base_64_data, base_64_type) => {
  return `data:${base_64_type};base64,${base_64_data}`;
};
