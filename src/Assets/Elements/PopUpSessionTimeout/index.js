import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import { store } from 'index';
import { logoutAction, restoreTokenAction } from 'Store/Actions/LoginActions/LoginActions';
import {connect} from "react-redux";

const PopUpSessionTimeout = ({
  isOpen,
  setIsOpen,
  logoutAction,
  restoreTokenAction
}) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);

  useEffect( ()=> {
    let timeout = null;
    if (isOpen) {
      if (timer > 0) {
        timeout = setTimeout(() => {
          setTimer((prev) => {
            console.log(prev)
            const prevTimer = prev;
            return prevTimer - 1
          })
        }, 1000)
      } else {
        logoutAction();
      }
    }
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timeout);
  });

  const restoreSession = () => {
    restoreTokenAction()
    setIsOpen(false);
  }

  return (
    <CustomizedPopup
      title={t('System notification')}
      isOpen={isOpen}
      bottomButtons={[
        {
          color: 'primary',
          label: t('Yes, Keep me signed in'),
          variant: 'outlined',
          onClickHandler: restoreSession,
        },
        {
          color: 'primary',
          label: t('No, Sign me out'),
          variant: 'contained',
          onClickHandler: logoutAction
        }
      ]}>
      <span>{t('No system usage detected')}!</span><br />
        <span>{t('You will be logged out in')} {timer} {t('seconds')}.</span><br />
         <span>{t('Do you want to stay signed in')}?</span><br />
    </CustomizedPopup>
  );
};

export default connect(null, { logoutAction, restoreTokenAction })(PopUpSessionTimeout);


