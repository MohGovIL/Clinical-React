export const normalizeFhirOrganization = (Organization) => {
  // TODO
  // Finish normalizing all the data that is given from HMO end point
  let name = '';
  let id = '';
  let city = '';
  let state = '';

  name = Organization.name || name;
  id = Organization.id || id;

  return {
    name,
    id,
  };
};
