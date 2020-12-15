import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import { store } from 'index';
import { showSnackbar } from "Store/Actions/UiActions/ToastActions.js";

const PopUpOnExit = ({
  returnFunction,
  exitWithOutSavingFunction,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  const exitFunction = () =>{
      exitWithOutSavingFunction();
      store.dispatch(showSnackbar(t('The changes has not saved'), 'error'));
  }

  return (
    <CustomizedPopup
      title={t('Exit without saving')}
      isOpen={isOpen}
      onClose={onClose}
      bottomButtons={[
        {
          color: 'primary',
          label: 'Return',
          variant: 'outlined',
          onClickHandler: returnFunction,
        },
        {
          color: 'primary',
          label: 'Exit without saving',
          variant: 'contained',
          onClickHandler: exitFunction,
        },
      ]}>
      {t(
        `You choose to exit without saving your changes. Would you like to continue?`,
      )}
    </CustomizedPopup>
  );
};

export default PopUpOnExit;
