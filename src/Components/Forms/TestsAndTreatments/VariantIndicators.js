import { StyledConstantHeaders } from './Style';
import React from 'react';

import { useTranslation } from 'react-i18next';

const VariantIndicators = ({ variantIndicators }) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <StyledConstantHeaders>{t('Variable indicators')}</StyledConstantHeaders>
      <hr />
      {variantIndicators.map((indicatorLogged, index) => {
        return (
          <form key={index} autoComplete='off'>
            <table>
              <tbody>
                <tr>
                  {indicatorLogged.map((value, index) => {
                    return (
                      <td key={index}>
                        <value.componentType
                          inputProps={{ pattern: value.pattern }}
                          onChange={value.handleOnChange}
                          id={value.id}
                          label={
                            t(value.label) /*+ ' (' + t(value.type) + ')'*/
                          }
                          value={value.value}
                        />
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </form>
        );
      })}
    </React.Fragment>
  );
};
export default VariantIndicators;
