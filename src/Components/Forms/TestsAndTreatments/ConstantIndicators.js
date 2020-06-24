import { StyledConstantHeaders } from './Style';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ConstantIndicators = ({ constantIndicators }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <StyledConstantHeaders>{t('Constant indicators')}</StyledConstantHeaders>
      <hr />
      <form autoComplete='off'>
        {constantIndicators.map((value, index) => {
          return value ? (
            <value.componentType
              key={index}
              inputProps={{ pattern: value.pattern }}
              onChange={value.handleOnChange}
              id={value.id}
              label={t(value.label) + ' (' + t(value.type) + ')'}
              value={value.value}
            />
          ) : null;
        })}
      </form>
    </React.Fragment>
  );
};
export default ConstantIndicators;
