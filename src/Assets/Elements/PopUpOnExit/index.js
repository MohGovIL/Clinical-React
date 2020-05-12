import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import PropTypes from 'prop-types';
const PopUpOnExit = ({
  returnFunction,
  exitWithOutSavingFunction,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

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
          onClickHandler: exitWithOutSavingFunction,
        },
      ]}>
      {t(
        `You choose to exit without saving your changes. Would you like to continue?`,
      )}
    </CustomizedPopup>
  );
};

PopUpOnExit.propTypes = {
  returnFunction: PropTypes.func,
  exitWithOutSavingFunction: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default PopUpOnExit;
