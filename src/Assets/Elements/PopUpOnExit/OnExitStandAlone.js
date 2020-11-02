/* Opened stand alone and not part of the react DOM */

import {
  destroyReactNoLetterPopUp,
  showCustomizedPopUp,
} from 'Utils/Helpers/showCustomizedPopUp';


export const onExitStandAlone = (exitFunc) => {
  let buttonArr = [
    {
      color: 'primary',
      label: 'Yes',
      variant: 'contained',
      onClickHandler: () => {exitFunc(); destroyReactNoLetterPopUp()},
    },
    {
      color: 'primary',
      label: 'No',
      variant: 'contained',
      onClickHandler: destroyReactNoLetterPopUp,
    },
  ];
  showCustomizedPopUp({
    title: 'Exit without saving',
    message:
      'You choose to exit without saving your changes. Would you like to continue?',
    buttonsArr: buttonArr,
  });

};
