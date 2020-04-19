export const normalizeFhirHMO = (HMO) => {
    // TODO 
    // Finish normalizing all the data that is given from HMO end point
  let name = '';
  let id = '';
  let city = '';
  let state = '';

  name = HMO.name || name;
  id = HMO.id || id;

  return {
    name,
    id,
  };
};
