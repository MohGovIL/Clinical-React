/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param condition {object}
 * @returns {object}
 */

const normalizeFhirCondition = (condition) => {
  const patient = condition.subject
    ? condition.subject.reference.split('/')[1]
    : null;

  const recorder = condition.recorder
    ? condition.recorder.reference.split('/')[1]
    : null;

  let clinicalStatus = '';
  let categoryCode = '';
  let categorySystem = '';
  let codeCode = '';
  let codeText = '';
  let codeSystem = '';
  let title = '';
  let stageTypeCode = '';
  let stageTypeSystem = '';
  let stageTypeText = '';
  let evidenceCode = '';
  let evidenceSystem = '';
  let note = '';

  if (
    condition.clinicalStatus &&
    Object.keys(condition.clinicalStatus).length > 0
  ) {
    if (
      condition.clinicalStatus.coding &&
      condition.clinicalStatus.coding.length
    ) {
      clinicalStatus = condition.clinicalStatus.coding[0].code;
    }
  }

  if (condition.category && Object.keys(condition.category).length > 0) {
    if (condition.category[0].coding && condition.category[0].coding.length) {
      categoryCode = condition.category[0].coding[0].code;
      categorySystem = condition.category[0].coding[0].system;
    }
  }

  if (condition.code && Object.keys(condition.code).length > 0) {
    codeText = condition.code.text || '';
    if (condition.code.coding && condition.code.coding.length) {
      codeCode = condition.code.coding[0].code;
      codeSystem = condition.code.coding[0].system;
    }
  }

  if (condition.stage && condition.stage.length > 0) {
    if (Object.keys(condition.stage[0].summary).length > 0) {
      title = condition.stage[0].summary.text;
    }

    if (
      condition.stage[0].type &&
      Object.keys(condition.stage[0].type).length > 0
    ) {
      stageTypeCode = condition.stage[0].type.coding[0].code;
      stageTypeSystem = condition.stage[0].type.coding[0].system;

      if (condition.stage[0].type.text) {
        stageTypeText = condition.stage[0].type.text;
      }
    }
  }

  if (condition.evidence && condition.evidence.length > 0) {
    evidenceCode = condition.evidence[0].code[0].coding[0].code;
    evidenceSystem = condition.evidence[0].code[0].coding[0].system;
  }

  if (condition.note && condition.note.length > 0) {
    note = condition.note[0].text;
  }

  return {
    id: condition.id,
    categoryCode,
    categorySystem,
    clinicalStatus,
    codeCode,
    codeText,
    codeSystem,
    patient,
    recorder,
    title,
    stageTypeCode,
    stageTypeSystem,
    stageTypeText,
    evidenceCode,
    evidenceSystem,
    note,
  };
};

export default normalizeFhirCondition;
