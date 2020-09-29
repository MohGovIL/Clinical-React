import ReactDOM from 'react-dom';
import CustomizedPopupStandAlone from 'Assets/Elements/CustomizedPopupStandAlone';
import React from 'react';
export const destroyReactNoLetterPopUp = () => {
  let NoLetterPopUp = document.getElementById('NoLetterPopUp');
  ReactDOM.unmountComponentAtNode(NoLetterPopUp);
};
export const showCustomizedPopUp = ({ buttonsArr, message, title }) => {
  let NoLetterPopUp = document.getElementById('NoLetterPopUp');
  if (!NoLetterPopUp) {
    const d = document.createElement('div');
    d.id = 'NoLetterPopUp';
    let main = document.getElementById('root').appendChild(d);
  }
  let buttons = [];

  buttonsArr.map((value, index) => {
    buttons.push({
      color: value.color,
      label: value.label,
      variant: value.varient,
      onClickHandler: () => {
        value.onClickHandler();
      },
    });
  });

  ReactDOM.render(
    <CustomizedPopupStandAlone
      props={{
        AlertMessage: '',
        disableBackdropClick: true,
        dialogMaxWidth: 'xl',
        content_dividers: false,
        bottomButtons: buttons,
        message: message,
        title: title,
      }}
      isOpen={true}
      onClose={destroyReactNoLetterPopUp}></CustomizedPopupStandAlone>,
    document.getElementById('NoLetterPopUp'),
  );
};
