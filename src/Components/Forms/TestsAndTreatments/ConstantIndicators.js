import {
  StyledConstantForm,
  StyledConstantHeaders,
} from 'Components/Forms/TestsAndTreatments/Style';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
                disabled={value.disabled}
              />
            ) : null;
          })}
        </StyledConstantForm>
      </React.Fragment>
    ) : null;
  }
};
export default ConstantIndicators;
