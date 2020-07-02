import { StyledConstantForm, StyledConstantHeaders } from './Style';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ConstantIndicators = ({ constantIndicators }) => {
  const { t } = useTranslation();
  if (!constantIndicators) {
    return null;
  } else {
    return (
      <React.Fragment>
        <StyledConstantHeaders>
          {t('Constant indicators')}
        </StyledConstantHeaders>
        <hr />
        <StyledConstantForm autoComplete='off'>
          {constantIndicators.map((value, index) => {
            return value ? (
              <value.componentType
                key={index}
                inputProps={{ pattern: value.pattern }}
                onChange={value.handleOnChange}
                id={value.value}
                label={t(value.label) + ' (' + t(value.unit) + ')'}
                value={value.value}
                mask={value.mask}
              />
            ) : null;
          })}
        </StyledConstantForm>
      </React.Fragment>
    );
  }
};
export default ConstantIndicators;
