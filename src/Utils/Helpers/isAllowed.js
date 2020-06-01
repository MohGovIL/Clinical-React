/**
 * @author Dror Golan drorgo@matrix.co.il, Idan Gigi idangi@matrix.co.il
 * @param {string} acoMappingId
 * @return {string} 'hide' | 'view' | 'write'
 * @calibrate  data inside components tabs
 */

import { store } from 'index';
import getUIACOMapping from 'Utils/Helpers/acoMapping';
// const modes = ['write', 'view'];

const isAllowed = (acoMappingId) => {
  let codeToCheck = getUIACOMapping[acoMappingId];
  let allowedWritePermissions = store.getState().settings.user_aco['write'];
  if (allowedWritePermissions) {
    if(allowedWritePermissions.includes('SuperUser')){
      return 'write';
    }
    for (const permission of allowedWritePermissions) {
      if(permission === codeToCheck) {
        return 'write';
      }
    }
  }
  let allowedViewPermissions = store.getState().settings.user_aco['view'];
  for (const permission of allowedViewPermissions) {
    if (permission === codeToCheck) {
      return 'view';
    }
  }
  return 'hide';
}
export default isAllowed;
