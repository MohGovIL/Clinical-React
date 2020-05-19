/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param patient {object}
 * @returns {object}
 */
const normalizeFhirUser = (user) => {
  let family = '';
  let given = '';
  let name = [];
  let identifier = '';
  let id = '';
  let active = '';

  if (user && user.id && user.resourceType === 'Practitioner') {
    for (let i = 0; i < user.name.length; i++) {
      family = user.name[i].family ? user.name[i].family : '';
      given = user.name[i].given ? user.name[i].given.join(' ') : '';
      name.push(`${family} ${given}`);
    }
    active = user.active;
    identifier =
      user.identifier && user.identifier.value ? user.identifier.value : '';
    id = user.id;
  }

  return {
    name: name,
    identifier: identifier,
    id: id,
    active: active,
  };
};

export default normalizeFhirUser;
