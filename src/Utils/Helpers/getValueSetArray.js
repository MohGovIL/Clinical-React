import { FHIR } from '../Services/FHIR';
import normalizeFhirValueSet from './FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

const convertArrayToObject = (array, key) => {
  if (!array) return {};
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.title,
    };
  }, initialValue);
};

export const getValueSetLists = async (valueSetNames, turnToObj) => {
  let list = [];
  let detailsObj = [];
  valueSetNames.map((value, index) => {
    list.push(
      FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: {
          id: `${value}`,
        },
      }),
    );
  });

  const listAfterAwait = await Promise.all(list);
  listAfterAwait.map((value, index) => {
    if (value && value && value.status && value.status === 200) {
      let counter = 0;
      value.data.expansion.contains.map((data) => {
        const dataNormalized = normalizeFhirValueSet(data);
        if (!detailsObj[valueSetNames[counter]]) {
          detailsObj[valueSetNames[counter]] = [];
        }
        detailsObj[valueSetNames[counter]].push({
          title: dataNormalized.name,
          code: dataNormalized.code,
        });
      });
      counter++;
    }
  });
  if (turnToObj) {
    detailsObj = convertArrayToObject(detailsObj[valueSetNames], 'code');
  }
  return detailsObj;
};
