const denormalizeFhirCondition = (condition) => {
  if (!condition)
    throw new Error('denormalizeFhirCondition: condition is empty');

  const denormalizedFhirCondition = {};
  const stage = [{}];
  const code = { coding: [{}] };

  for (const conditionKey in condition) {
    if (condition.hasOwnProperty(conditionKey)) {
      const element = condition[conditionKey];

      switch (conditionKey) {
        case 'patient':
          denormalizedFhirCondition['subject'] = {
            reference: `Patient/${element}`,
          };
          break;
        case 'recorder':
          denormalizedFhirCondition['recorder'] = {
            reference: `Practitioner/${element}`,
          };
          break;
        case 'clinicalStatus':
          denormalizedFhirCondition['clinicalStatus'] = {
            coding: [
              {
                code: element,
              },
            ],
          };
          break;

        case 'categoryCode':
          denormalizedFhirCondition['category'] = {
            coding: [
              {
                system: condition.categorySystem,
                code: element,
              },
            ],
          };
          break;
        case 'codeCode':
          code.coding[0]['code'] = {
            code: element,
          };
          break;

        case 'codeSystem':
          code.coding[0]['system'] = {
            system: element,
          };
          break;

        case 'title':
          stage[0]['summary'] = {
            text: element,
          };
          break;

        case 'stageTypeCode':
          stage[0]['type'] = {
            coding: [
              {
                system: condition.stageTypeSystem,
                code: element,
              },
            ],
            text: condition.stageTypeText,
          };
          break;
        case 'evidenceCode':
          denormalizedFhirCondition['evidence'] = {
            code: [
              {
                coding: [
                  {
                    code: element,
                    system: condition.evidenceSystem,
                  },
                ],
              },
            ],
          };
          break;
        case 'note':
          denormalizedFhirCondition['note'] = [
            {
              text: element,
            },
          ];
          break;

        default:
          break;
      }
    }
  }

  if (Object.keys(stage[0]).length) denormalizedFhirCondition['stage'] = stage;

  if (Object.keys(code.coding[0]).length)
    denormalizedFhirCondition['code'] = code;
  return denormalizedFhirCondition;
};

export default denormalizeFhirCondition;
