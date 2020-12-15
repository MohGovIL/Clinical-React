import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleStyle from './Style';

const Title = ({ marginTop, margin, label, fontSize, color, bold }) => {
  const { t } = useTranslation();
  return (
    <TitleStyle
      fontSize={fontSize}
      color={color}
      bold={bold}
      marginTop={marginTop}>
      {t(label)}
    </TitleStyle>
  );
};

export default Title;
