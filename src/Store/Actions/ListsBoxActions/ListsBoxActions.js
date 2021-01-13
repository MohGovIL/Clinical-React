import { SET_VALUESET } from './ListsboxActionTypes';
import {FHIR} from "Utils/Services/FHIR";

export const setValueset = (valueset, listBoxStat) => {
  return async (dispatch) => {
    if (listBoxStat.hasOwnProperty(valueset)) {
      return listBoxStat[valueset];
    }
    try {
      const result = await FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: {
          id: 'drug_form',
        },
      })
      let objValueset = {};
      objValueset[result.id] = result;
      dispatch({ type: SET_VALUESET, valueset:objValueset });
      return result;
    } catch (err) {
      console.log(err);
    }
  };
};
