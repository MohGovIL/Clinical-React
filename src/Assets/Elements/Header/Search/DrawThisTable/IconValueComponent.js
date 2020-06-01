import React from 'react';
import {
  StyledIcon,
  StyledIconText,
} from 'Assets/Elements/Header/Search/DrawThisTable/Style';
import { useTranslation } from 'react-i18next';

const IconValueComponent = ({ iconType, value, onClickHandler }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {iconType ? (
        <StyledIcon onClick={onClickHandler}>{iconType}</StyledIcon>
      ) : (
        ''
      )}
      {value ? (
        <StyledIconText onClick={onClickHandler}>{t(value)}</StyledIconText>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default IconValueComponent;
