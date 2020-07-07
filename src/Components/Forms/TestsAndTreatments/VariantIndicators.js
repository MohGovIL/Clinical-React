import {
  StyledConstantForm,
  StyledConstantHeaders,
  StyledForm,
  StyledTable,
  StyledVariableForm,
  StyledVariantForm,
  StyledVarientIndicatorsTR,
} from './Style';
import React from 'react';

import { useTranslation } from 'react-i18next';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

const VariantIndicators = ({ variantIndicators }) => {
  const { t } = useTranslation();
  if (!variantIndicators) {
    return null;
  } else {
    return (
      <React.Fragment>
        <StyledVariantForm autoComplete='off'>
          <TableContainer component={Paper}>
            <StyledTable>
              <TableBody>
                {Object.entries(variantIndicators).map(([index, tr]) => {
                  return (
                    <StyledVarientIndicatorsTR key={`variant_tr_${index}`}>
                      {Object.entries(tr).map(([index, value]) => {
                        return value && value.componentType !== undefined ? (
                          <TableCell key={index}>
                            <value.componentType
                              name={value.name}
                              componenttype={value.componenttype}
                              mask={value.mask}
                              disabled={value.disabled}
                              onChange={value.handleOnChange}
                              id={value.id}
                              label={t(value.label)}
                              value={
                                value.disabled && value.value === ''
                                  ? '-'
                                  : value.value
                              }
                            />
                          </TableCell>
                        ) : null;
                      })}
                    </StyledVarientIndicatorsTR>
                  );
                })}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </StyledVariantForm>
      </React.Fragment>
    );
  }
};
export default VariantIndicators;
