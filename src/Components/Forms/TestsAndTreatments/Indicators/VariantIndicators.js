/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} VariantIndicators
 * @returns UI DRAW OF VariantIndicators
 */

import {
  StyledTable,
  StyledVariantForm,
  StyledVarientIndicatorsTR,
} from 'Components/Forms/TestsAndTreatments/Style';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const VariantIndicators = ({ variantIndicators, setFormDirty }) => {
  let rowCounter = 0;
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
                        rowCounter++;
                        return value && value.componentType !== undefined ? (
                          <TableCell key={index}>
                            <value.componentType
                              name={value.name}
                              componenttype={value.componenttype}
                              placeholder={value.placeholder}
                              symbol={value.symbol ? value.symbol : false}
                              mask={value.mask ? value.mask : false}
                              disabled={value.disabled}
                              onChange={value.handleOnChange}
                              onKeyUp={() => setFormDirty(true)}
                              id={value.id + '_' + rowCounter}
                              label={t(value.label)}
                              value={
                                value.disabled && (value.value === '')
                                  ? '-'
                                  : value.value
                              }
                              dir={'ltr'}
                              InputProps={{
                                endAdornment: value.symbol && (
                                  <InputAdornment>
                                    <IconButton size={'small'}>
                                      {value.symbol}
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
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
