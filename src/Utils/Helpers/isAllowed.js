import {store} from "../../../src";
import getUIACOMapping from "./acoMapping";
import errorHandler from "../../../src/Utils/Helpers/errorHandler";
const modes = ['write','view'];


const isAllowed = object => {
         let codeOfTheAcoToCheck = getUIACOMapping[object.id];
         modes.forEach(function(element,index){
             let elementsAllowed = store.getState().settings.user_aco[element];
             if(elementsAllowed) {
                     //check for super user
                     if (elementsAllowed.includes('SuperUser')) {
                         object.mode = element;
                     } else {

                         elementsAllowed.forEach(function (allowedTo, index) {
                             //check for ARO allowed
                             if (allowedTo === codeOfTheAcoToCheck) {
                                 object.mode = element;
                             }
                         });
                     }

             }

        });
};
export default isAllowed;


