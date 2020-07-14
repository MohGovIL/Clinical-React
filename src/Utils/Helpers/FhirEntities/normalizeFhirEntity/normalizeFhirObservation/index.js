/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} observation
 * @returns {object}
 */

const normalizeFhirObservation = (observation, indicators, performers) => {
  /*
  *
    id: id,
    category: category,
    categoryText: categoryText,
    categorySystem: categorySystem,
    performer: performer,
    performerName: performerName,
    status: observation.status,
    encounter: encounter,
    patient: patient,
    issued: issued,
    note: note,
    observation: returnedObservation,
    *
  * */
  if (!indicators)
    //In order to normalize observation we need indicators list
    return null;
  let indicatorsList = null;
  const id = observation.id;
  const performerID =
    observation.performer && observation.performer[0].reference.split('/')[1]
      ? observation.performer[0].reference.split('/')[1]
      : null;
  const performerName =
    performerID && performers[performerID]
      ? `${
          performers[performerID][0].name ? performers[performerID][0].name : ''
        } ${
          performers[performerID][0].family
            ? performers[performerID][0].family
            : ''
        }`
      : null;
  const patient = observation.subject
    ? observation.subject.reference.split('/')[1]
    : null;
  const encounter = observation.encounter
    ? observation.encounter.reference.split('/')[1]
    : null;
  const issued = observation.issued ? observation.issued : null;
  const category =
    observation.category &&
    observation.category[0] &&
    observation.category[0].coding &&
    observation.category[0].coding[0] &&
    observation.category[0].coding[0].code
      ? observation.category[0].coding[0].code
      : null;

  const categorySystem =
    observation.category &&
    observation.category[0] &&
    observation.category[0].coding &&
    observation.category[0].coding[0] &&
    observation.category[0].coding[0].system
      ? observation.category[0].coding[0].system
      : null;

  const categoryText =
    observation.category &&
    observation.category[0] &&
    observation.category[0].text
      ? observation.category[0].text
      : null;

  const note =
    observation.note && observation.note.text ? observation.note.text : null;

  let returnedObservation = [];

  if (!category) return null;
  if (observation.component && observation.component.length > 0) {
    observation.component.map((observed, indexQuantity) => {
      if (observed.valueQuantity && indicators[observed.valueQuantity.code]) {
        let mergeObjects = {
          ...observed.valueQuantity,
          ...indicators[observed.valueQuantity.code],
        };
        returnedObservation[
          indicators[observed.valueQuantity.code].description
        ] = mergeObjects;
        returnedObservation.length++;
      }
    });
  }

  return {
    id: id,
    category: category,
    categoryText: categoryText,
    categorySystem: categorySystem,
    performer: performerID,
    performerName: performerName,
    status: observation.status,
    encounter: encounter,
    patient: patient,
    issued: issued,
    note: note,
    observation: returnedObservation,
  };
};

export default normalizeFhirObservation;
