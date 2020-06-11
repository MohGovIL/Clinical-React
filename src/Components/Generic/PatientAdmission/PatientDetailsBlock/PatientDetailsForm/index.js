import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup, StyledDivider } from '../Style';
import { Grid } from '@material-ui/core';
import StyledToggleButtonGroup from 'Assets/Elements/StyledToggleButtonGroup';
import StyledToggleButton from 'Assets/Elements/StyledToggleButton';
import { useTranslation } from 'react-i18next';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { israelPhoneNumberRegex } from 'Utils/Helpers/validation/patterns';
import normalizeFhirRelatedPerson from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirRelatedPerson';
import { FHIR } from 'Utils/Services/FHIR';
const PatientDetailsForm = () => {
  const {
    errors,
    isArrivalWay,
    relatedPersonId,
    reset,
    setValue,
    encounterArrivalWay,
    register,
    watch,
  } = useFormContext();
  const { t } = useTranslation();

  const [arrivalWay, setArrivalWay] = useState(
    encounterArrivalWay || 'Independent',
  );

  const arrivalWayHandler = (event, way) => {
    setArrivalWay(() => {
      setValue('arrivalWay', way);
      return way;
    });
  };

  const watchIsEscort = watch('isEscorted', false);

  useEffect(() => {
    (async () => {
      try {
        if (relatedPersonId) {
          const relatedPerson = await FHIR('RelatedPerson', 'doWork', {
            functionName: 'getRelatedPerson',
            functionParams: {
              relatedPersonId,
            },
          });
          const normalizedRelatedPerson = normalizeFhirRelatedPerson(
            relatedPerson.data,
          );
          reset({
            escortMobilePhone: normalizedRelatedPerson.mobilePhone,
            escortName: normalizedRelatedPerson.name,
            isEscorted: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [relatedPersonId, reset, setValue]);

  return (
    <React.Fragment>
      <Title
        marginTop={'55px'}
        fontSize={'28px'}
        color={'#002398'}
        label={'Patient Details'}
      />
      {/* Escorted */}
      <StyledFormGroup>
        <Title
          fontSize={'18px'}
          color={'#000b40'}
          label={t('Accompanying patient')}
          bold
        />
        <StyledDivider variant={'fullWidth'} />
        <Grid
          container
          direction={'row'}
          justify={'flex-start'}
          alignItems={'center'}
          style={{ marginBottom: '50px' }}>
          {isArrivalWay === '1' && (
            <React.Fragment>
              <span>{`${t('Arrival way')}?`}</span>
              <StyledToggleButtonGroup
                value={arrivalWay}
                onChange={arrivalWayHandler}
                exclusive
                aria-label='Arrival way'>
                <StyledToggleButton value='Ambulance' aria-label='ambulance'>
                  {t('Ambulance')}
                </StyledToggleButton>
                <StyledToggleButton
                  value='Independent'
                  aria-label='Independent'>
                  {t('Independent')}
                </StyledToggleButton>
              </StyledToggleButtonGroup>
            </React.Fragment>
          )}
        </Grid>
        <Grid
          container
          direction={'row'}
          justify={'flex-start'}
          alignItems={'center'}>
          <span>
            {isArrivalWay === '1'
              ? `${t('Arrival with escort')}?`
              : `${t('Patient arrived with an escort')}?`}
          </span>
          {/* Escorted Information Switch */}
          <StyledSwitch
            name='isEscorted'
            label_1={'No'}
            register={register}
            label_2={'Yes'}
            marginLeft={'40px'}
            marginRight={'40px'}
          />
        </Grid>
      </StyledFormGroup>
      {/* Escorted Information */}
      {watchIsEscort && (
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Escort details')}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
          {/* Escorted Information name */}
          <CustomizedTextField
            width={'70%'}
            label={t('Escort name')}
            name='escortName'
            inputRef={register}
          />
          {/* Escorted Information cell phone */}
          <CustomizedTextField
            width={'70%'}
            label={t('Escort cell phone')}
            name='escortMobilePhone'
            error={errors.escortMobilePhone && true}
            helperText={
              errors.escortMobilePhone && t('The number entered is incorrect')
            }
            inputRef={register({
              pattern: israelPhoneNumberRegex(),
            })}
          />
        </StyledFormGroup>
      )}
    </React.Fragment>
  );
};

export default PatientDetailsForm;
