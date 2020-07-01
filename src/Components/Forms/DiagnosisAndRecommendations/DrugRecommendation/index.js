import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid, MenuItem } from '@material-ui/core';
import { StyledDivider } from '../Style';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Delete } from '@material-ui/icons';

const DrugRecommendation = () => {
  const { t } = useTranslation();
  const { control, permission, register, watch } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'drugRecommendation',
  });
  const drugRecommendation = watch('drugRecommendation');
  const [value, setValue] = React.useState('hey');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const checkIsDisabled = (name, index) => {
    const value = drugRecommendation[index][name];
    if (!value) {
      return true;
    }
    return permission === 'view' ? true : false;
  };

  return (
    <StyledFormGroup>
      <Grid container direction='row' justify='space-between'>
        <Title
          label={t('Drug Recommendation')}
          bold
          fontSize='22px'
          color='#000b40'
        />
        <StyledButton
          width='113px'
          disabled={permission === 'view' ? true : false}
          margin='0 16px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'
          onClick={() =>
            append({
              drugName: '',
              quantity: '',
              drugForm: '',
              drugRoute: '',
              intervals: '',
              duration: '',
              toDate: '',
              instructionsForTheDrug: '',
            })
          }>{` + ${t('Add Drug')}`}</StyledButton>
      </Grid>
      <StyledDivider />
      {fields.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Controller
              name={`drugRecommendation[${index}].drugName`}
              control={control}
              value={value}
              defaultValue=''
              as={
                <CustomizedTextField
                  iconColor='#1976d2'
                  width='30%'
                  select
                  label={t('Drug Name')}
                  onChange={handleChange}>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </CustomizedTextField>
              }
            />
            <Grid container direction='row' justify='space-between'>
              <CustomizedTextField
                name={`drugRecommendation[${index}].quantity`}
                inputRef={register()}
                label={`${t('Quantity')} *`}
                width='30%'
                type='number'
                disabled={checkIsDisabled('drugName', index)}
                inputProps={{
                  min: '0',
                }}
              />
              <Controller
                control={control}
                name={`drugRecommendation[${index}].drugForm`}
                value={value}
                defaultValue=''
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={t('Drug form')}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
              <Controller
                control={control}
                name={`drugRecommendation[${index}].drugRoute`}
                value={value}
                defaultValue=''
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={t('Drug route')}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
            </Grid>
            <Grid container direction='row' justify='space-between'>
              <Controller
                control={control}
                value={value}
                name={`drugRecommendation[${index}].intervals`}
                defaultValue=''
                as={
                  <CustomizedTextField
                    disabled={checkIsDisabled('drugName', index)}
                    iconColor='#1976d2'
                    width='30%'
                    select
                    label={t('Intervals')}
                    onChange={handleChange}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomizedTextField>
                }
              />
              <CustomizedTextField
                disabled={checkIsDisabled('drugName', index)}
                name={`drugRecommendation[${index}].duration`}
                label={t('Duration (days)')}
                inputRef={register()}
                type='number'
                inputProps={{
                  min: '0',
                  max: '99',
                }}
              />

              <CustomizedTextField
                disabled
                //TODO needs to add a calculation for the date : today + duration (days)
                name={`drugRecommendation[${index}].toDate`}
                label={t('To date')}
                inputRef={register()}
                placeholder='dd/mm/yyyy'
              />
            </Grid>
            <Grid container direction='row' alignItems='baseline'>
              <CustomizedTextField
                disabled={checkIsDisabled('drugName', index)}
                name={`drugRecommendation[${index}].instructionsForTheDrug`}
                label={t('Instructions for the drug')}
                inputRef={register()}
              />
              <StyledButton
                width='113px'
                disabled={checkIsDisabled('drugName', index)}
                margin='0 16px'
                height='32px'
                color='primary'
                variant='outlined'
                size='small'>
                {t('Select template')}
              </StyledButton>
            </Grid>
            <Grid container direction='row' justify='flex-end'>
              <Delete
                color='primary'
                onClick={() => remove(index)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ cursor: 'pointer' }}>{t('Delete drug')}</span>
            </Grid>
          </React.Fragment>
        );
      })}
    </StyledFormGroup>
  );
};

export default DrugRecommendation;
