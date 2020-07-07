const normalizeFhirObservation = (observation, indicators) => {
  if (!indicators)
    //In order to normalize observation we need indicators list
    return null;
  let indicatorsList = null;
  const id = observation.id;
  const performer = observation.performer
    ? observation.performer[0].reference.split('/')[1]
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
    performer: performer,
    status: observation.status,
    encounter: encounter,
    patient: patient,
    issued: issued,
    note: note,
    observation: returnedObservation,
  };
};

export default normalizeFhirObservation;
