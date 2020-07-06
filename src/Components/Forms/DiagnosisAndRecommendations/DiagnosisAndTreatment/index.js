import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid } from '@material-ui/core';
import { StyledDivider } from '../Style';
import { useFormContext } from 'react-hook-form';
const DiagnosisAndTreatment = () => {
  const { t } = useTranslation();
  const {
    permission,
    setPopUpProps,
    setValue,
    register,
    watch,
  } = useFormContext();

  const diagnosisAndTreatmentFields = watch([
    'findingsDetails',
    'diagnosisDetails',
    'treatmentDetails',
  ]);
  const callBack = (data, name) => {
    setValue(name, data);
  };

  const handlePopUpProps = (title, fields, id, callBack, name) => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: true,
        formFieldsTitle: title,
        formFields: fields,
        formID: id,
        setTemplatesTextReturned: callBack,
        name,
      };
    });
  };
  return (
    <StyledFormGroup>
      <Title
        label={t('Diagnosis and treatment')}
        fontSize='22px'
        bold
        color='#000b40'
      />
      <StyledDivider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          name='findingsDetails'
          inputRef={register}
          label={t('Findings details')}
          width='45%'
          multiline
          InputLabelProps={{
            shrink: diagnosisAndTreatmentFields['findingsDetails']
              ? true
              : false,
          }}
          disabled={permission === 'view' ? true : false}
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
            handlePopUpProps(
              t('Findings details'),
              'findings_details',
              'diagnosis_recommendations',
              callBack,
              'findingsDetails',
            )
          }>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          inputRef={register}
          name='diagnosisDetails'
          label={t('Diagnosis details')}
          InputLabelProps={{
            shrink: diagnosisAndTreatmentFields['diagnosisDetails']
              ? true
              : false,
          }}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledButton
          disabled={permission === 'view' ? true : false}
          width='113px'
          margin='0 16px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'
          onClick={() =>
            handlePopUpProps(
              t('Diagnosis details'),
              'diagnosis_details',
              'diagnosis_recommendations',
              callBack,
              'diagnosisDetails',
            )
          }>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          inputRef={register}
          name='treatmentDetails'
          label={t('Treatment details')}
          InputLabelProps={{
            shrink: diagnosisAndTreatmentFields['treatmentDetails']
              ? true
              : false,
          }}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledButton
          disabled={permission === 'view' ? true : false}
          width='113px'
          height='32px'
          color='primary'
          margin='0 16px'
          variant='outlined'
          size='small'
          onClick={() =>
            handlePopUpProps(
              t('Treatment details'),
              'treatment_details',
              'diagnosis_recommendations',
              callBack,
              'treatmentDetails',
            )
          }>
          {t('Select template')}
        </StyledButton>
      </Grid>
    </StyledFormGroup>
  );
};

export default DiagnosisAndTreatment;
