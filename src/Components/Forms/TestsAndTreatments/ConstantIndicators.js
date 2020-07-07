import { StyledConstantForm, StyledConstantHeaders } from './Style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { thickenTheData } from './Helpers/DataHelpers';

const ConstantIndicators = ({ constantIndicators }) => {
  const { t } = useTranslation();
  if (!constantIndicators) {
    return null;
  } else {
    return constantIndicators ? (
      <React.Fragment>
        <StyledConstantHeaders>
          {t('Constant indicators')}
        </StyledConstantHeaders>
        <hr />
        <StyledConstantForm autoComplete='off'>
          {Object.entries(constantIndicators).map(([key, value]) => {
            return value ? (
              <value.componentType
                key={key}
                inputProps={{ pattern: value.pattern }}
                onChange={value.handleOnChange}
                id={value.value}
                label={t(value.label) + ' (' + t(value.unit) + ')'}
                value={value.value}
                mask={value.mask}
                name={value.name}
                componenttype={value.componenttype}
              />
            ) : null;
          })}
        </StyledConstantForm>
      </React.Fragment>
    ) : null;
  }
};
export default ConstantIndicators;
