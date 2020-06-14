import React, { useState, useEffect } from 'react';
import { StyledFormGroup, StyledDivider } from '../Style';
import Title from 'Assets/Elements/Title';
import { Tabs, Tab, Grid } from '@material-ui/core';
import TabPanel from '../TabPanel';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import StyledToggleButtonGroup from 'Assets/Elements/StyledToggleButtonGroup';
import StyledToggleButton from 'Assets/Elements/StyledToggleButton';
import { Controller, useFormContext } from 'react-hook-form';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CustomizedKeyboardDatePicker from 'Assets/Elements/CustomizedKeyboardDatePicker';
import { useTranslation } from 'react-i18next';
import MomentUtils from '@date-io/moment';
import { checkCurrencyFormat } from 'Utils/Helpers/checkCurrencyFormat';
import { formatToCurrency } from 'Utils/Helpers/formatToCurrency';
import moment from 'moment';
import { normalizeFhirOrganization } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirOrganization';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';

const Payment = ({
  pid,
  eid,
  isCommitmentForm,
  formatDate,
  managingOrganization,
}) => {
  const { t } = useTranslation();

  const {
    register,
    control,
    setValue,
    requiredErrors,
    errors,
    reset,
    unregister,
  } = useFormContext();

  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentMethodHandler = (event, method) => {
    setPaymentMethod(method);
  };
  const [
    commitmentAndPaymentTabValue,
    setCommitmentAndPaymentTabValue,
  ] = useState(isCommitmentForm === '1' ? 'HMO' : 'Private');
  const setCommitmentAndPaymentTabValueChangeHandler = (event, newValue) => {
    setCommitmentAndPaymentTabValue(newValue);
  };

  const [paymentAmount, setPaymentAmount] = useState('0');
  const [
    commitmentAndPaymentCommitmentDate,
    setCommitmentAndPaymentCommitmentDate,
  ] = useState(new Date());
  const [
    commitmentAndPaymentCommitmentValidity,
    setCommitmentAndPaymentCommitmentValidity,
  ] = useState(new Date());
  const onChangePaymentAmountHandler = (event) => {
    if (checkCurrencyFormat(event.target.value))
      setPaymentAmount(event.target.value);
  };

  const onBlurPaymentAmountHandler = (event) => {
    const format = formatToCurrency(event.target.value);
    // setValue('paymentAmount', format);
    setPaymentAmount(formatToCurrency(format));
  };

  // Commitment And Payment - functions
  const validateDate = (date, type) => {
    switch (type) {
      case 'before':
        return moment(date).isSameOrBefore(moment(), 'day');

      case 'after':
        return moment(date).isSameOrAfter(moment(), 'day');

      default:
        return false;
    }
  };
  const dateOnChangeHandler = (date, valueName, set) => {
    try {
      setValue(valueName, date, true);
      set(date);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };
  const [HMO, setHMO] = useState({});

  const [questionnaireResponse, setQuestionnaireResponse] = useState({});
  const [questionnaireId, setQuestionnaireId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const Organization = await FHIR('Organization', 'doWork', {
          functionName: 'readOrganization',
          functionParams: {
            OrganizationId: managingOrganization,
          },
        });
        const normalizedOrganization = normalizeFhirOrganization(
          Organization.data,
        );
        setHMO(normalizedOrganization);
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const questionnaire = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: { QuestionnaireName: 'commitment_questionnaire' },
        });
        if (questionnaire.data.total) {
          setQuestionnaireId(questionnaire.data.entry[1].resource.id);
        }
        const questionnaireResponseData = await FHIR(
          'QuestionnaireResponse',
          'doWork',
          {
            functionName: 'getQuestionnaireResponse',
            functionParams: {
              patientId: pid,
              encounterId: eid,
              questionnaireId: questionnaire.data.entry[1].resource.id,
            },
          },
        );
        if (questionnaireResponseData.data.total !== 0) {
          const normalizedQuestionnaireResponse = normalizeFhirQuestionnaireResponse(
            questionnaireResponseData.data.entry[1].resource,
          );
          if (normalizedQuestionnaireResponse.items.length) {
            if (isCommitmentForm === '1') {
              reset({
                commitmentAndPaymentReferenceForPaymentCommitment:
                  normalizedQuestionnaireResponse.items.find(
                    (item) => item.linkId === '1',
                  ).answer[0].valueInteger || '',
                commitmentAndPaymentDoctorsName:
                  normalizedQuestionnaireResponse.items.find(
                    (item) => item.linkId === '4',
                  ).answer[0].valueString || '',
                commitmentAndPaymentDoctorsLicense:
                  normalizedQuestionnaireResponse.items.find(
                    (item) => item.linkId === '5',
                  ).answer[0].valueInteger || '',
              });
              const commitmentDate = normalizedQuestionnaireResponse.items.find(
                (item) => item.text === 'Commitment date',
              );
              const commitmentValidity = normalizedQuestionnaireResponse.items.find(
                (item) => item.text === 'Commitment expiration date',
              );
              if (commitmentDate) {
                setCommitmentAndPaymentCommitmentDate(
                  moment(commitmentDate.answer[0].valueDate),
                );
              }
              if (commitmentValidity) {
                setCommitmentAndPaymentCommitmentValidity(
                  moment(commitmentValidity.answer[0].valueDate),
                );
              }
            } else {
              const paymentAmount = normalizedQuestionnaireResponse.items.find(
                (item) => item.linkId === '6',
              ).answer[0].valueString;
              const paymentMethod = normalizedQuestionnaireResponse.items.find(
                (item) => item.linkId === '7',
              ).answer[0].valueString;
              const receiptNumber = normalizedQuestionnaireResponse.items.find(
                (item) => item.linkId === '8',
              ).answer[0].valueString;
              register({ name: 'paymentMethod' });
              if (receiptNumber)
                reset({
                  receiptNumber: receiptNumber,
                });
              if (paymentAmount) setPaymentAmount(paymentAmount);
              if (paymentMethod) {
                setValue('paymentMethod', paymentMethod);
                setPaymentMethod(paymentMethod);
              }
            }
            setQuestionnaireResponse(normalizedQuestionnaireResponse);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      unregister('paymentMethod');
    };
  }, []);
  return (
    <StyledFormGroup>
      <Title
        fontSize={'18px'}
        color={'#000b40'}
        label={t('Commitment and payment')}
        bold
      />
      <Title
        fontSize={'14px'}
        color={'#000b40'}
        label={t(
          `Please fill in the payer details for the current ${
            isCommitmentForm === '1' ? 'test' : 'visit'
          }`,
        )}
      />
      <StyledDivider variant='fullWidth' />
      {/* Commitment and payment - tabs */}
      <Tabs
        value={commitmentAndPaymentTabValue}
        onChange={setCommitmentAndPaymentTabValueChangeHandler}
        indicatorColor='primary'
        textColor='primary'
        variant='standard'
        aria-label='full width tabs example'>
        {isCommitmentForm === '1' ? (
          <Tab label={t('HMO')} value={'HMO'} />
        ) : (
          <Tab label={t('Private')} value={'Private'} />
        )}
        {/* <Tab label={t('insurance company')} /> */}
      </Tabs>
      <TabPanel value='Private' selectedValue={commitmentAndPaymentTabValue}>
        <CustomizedTextField
          width={'70%'}
          onChange={onChangePaymentAmountHandler}
          onBlur={onBlurPaymentAmountHandler}
          value={paymentAmount}
          inputRef={register}
          name='paymentAmount'
          label={t('Payment amount')}
        />
        <Grid
          container
          direction='row'
          justify={'flex-start'}
          alignItems={'center'}
          style={{ margin: '24px 0 24px 0' }}>
          <span>{t('Payment method')}</span>
          <StyledToggleButtonGroup
            value={paymentMethod}
            onChange={paymentMethodHandler}
            exclusive
            aria-label='Payment method'>
            <StyledToggleButton value='Cash' aria-label='Cash'>
              {t('Cash')}
            </StyledToggleButton>
            <StyledToggleButton value='Credit card' aria-label='Credit card'>
              {t('Credit Card')}
            </StyledToggleButton>
          </StyledToggleButtonGroup>
        </Grid>
        <CustomizedTextField
          name='receiptNumber'
          width={'70%'}
          inputRef={register}
          label={t('Receipt number')}
          InputLabelProps={{ shrink: true }}
        />
      </TabPanel>
      <TabPanel value='HMO' selectedValue={commitmentAndPaymentTabValue}>
        <CustomizedTextField
          width={'70%'}
          name={'commitmentAndPaymentHMO'}
          inputRef={register}
          value={HMO.name || ''}
          label={t('HMO')}
          id={'commitmentAndPaymentHMO'}
          disabled
        />
        <CustomizedTextField
          width={'70%'}
          name='commitmentAndPaymentReferenceForPaymentCommitment'
          label={`${t('Reference for payment commitment')} *`}
          inputRef={register}
          id={'commitmentAndPaymentReferenceForPaymentCommitment'}
          type='number'
          InputLabelProps={{ shrink: true }}
          error={
            requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment
              ? true
              : false
          }
          helperText={
            requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment
          }
        />
        <Controller
          name='commitmentAndPaymentCommitmentDate'
          rules={{
            validate: {
              value: (value) => validateDate(value, 'before'),
            },
          }}
          defaultValue={commitmentAndPaymentCommitmentDate}
          control={control}
          as={
            <MuiPickersUtilsProvider
              utils={MomentUtils}
              moment={moment}
              libInstance={moment}>
              <CustomizedKeyboardDatePicker
                disableToolbar
                autoOk
                variant='inline'
                allowKeyboardControl={true}
                format={formatDate}
                margin='normal'
                id='commitmentAndPaymentCommitmentDate'
                label={`${t('Commitment date')} *`}
                value={commitmentAndPaymentCommitmentDate}
                onChange={(date) =>
                  dateOnChangeHandler(
                    date,
                    'commitmentAndPaymentCommitmentDate',
                    setCommitmentAndPaymentCommitmentDate,
                  )
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                error={errors.commitmentAndPaymentCommitmentDate && true}
                helperText={
                  errors.commitmentAndPaymentCommitmentDate &&
                  t('An equal date or less than today must be entered')
                }
              />
            </MuiPickersUtilsProvider>
          }
        />
        <Controller
          name='commitmentAndPaymentCommitmentValidity'
          control={control}
          rules={{
            validate: {
              value: (value) => validateDate(value, 'after'),
            },
          }}
          defaultValue={commitmentAndPaymentCommitmentValidity}
          as={
            <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
              <CustomizedKeyboardDatePicker
                disableToolbar
                allowKeyboardControl={true}
                autoOk
                variant='inline'
                format={formatDate}
                margin='normal'
                id='commitmentAndPaymentCommitmentValidity'
                label={`${t('Commitment validity')} *`}
                value={commitmentAndPaymentCommitmentValidity}
                onChange={(date) =>
                  dateOnChangeHandler(
                    date,
                    'commitmentAndPaymentCommitmentValidity',
                    setCommitmentAndPaymentCommitmentValidity,
                  )
                }
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                error={errors.commitmentAndPaymentCommitmentValidity && true}
                helperText={
                  errors.commitmentAndPaymentCommitmentValidity &&
                  t('An equal or greater date must be entered than today')
                }
              />
            </MuiPickersUtilsProvider>
          }
        />
        <CustomizedTextField
          width={'70%'}
          name='commitmentAndPaymentDoctorsName'
          label={`${t('Doctors name')} *`}
          inputRef={register}
          id={'commitmentAndPaymentDoctorsName'}
          InputLabelProps={{ shrink: true }}
          error={requiredErrors.commitmentAndPaymentDoctorsName ? true : false}
          helperText={requiredErrors.commitmentAndPaymentDoctorsName || ''}
        />
        <CustomizedTextField
          width={'70%'}
          label={`${t('Doctors license')} *`}
          name='commitmentAndPaymentDoctorsLicense'
          inputRef={register}
          id={'commitmentAndPaymentDoctorsLicense'}
          type='number'
          InputLabelProps={{ shrink: true }}
          error={
            requiredErrors.commitmentAndPaymentDoctorsLicense ? true : false
          }
          helperText={requiredErrors.commitmentAndPaymentDoctorsLicense || ''}
        />
      </TabPanel>
    </StyledFormGroup>
  );
};

export default Payment;
