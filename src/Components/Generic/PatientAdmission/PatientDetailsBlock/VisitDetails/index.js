import React, { useState, useEffect } from 'react';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import ListboxComponent from '../ListboxComponent';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Grid,
  InputAdornment,
  CircularProgress,
  ListItemText,
  Checkbox,
} from '@material-ui/core';
import {
  Close,
  ExpandLess,
  ExpandMore,
  CheckBoxOutlineBlankOutlined,
  CheckBox,
} from '@material-ui/icons';
import {
  StyledChip,
  StyledFormGroup,
  StyledDivider,
  StyledAutoComplete,
} from '../Style';
import Title from 'Assets/Elements/Title';
import { useTranslation } from 'react-i18next';
import matchSorter from 'match-sorter';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { connect } from 'react-redux';

const VisitDetails = ({
  reasonCodeDetails,
  examination,
  examinationCode,
  serviceType,
  serviceTypeCode,
  priority,
  props,
}) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    requiredErrors,
    setValue,
    unregister,
  } = useFormContext();

  const [selectedServicesType, setSelectedServicesType] = useState([]);
  const [pendingValue, setPendingValue] = useState([]);
  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;
  const selectTestRef = React.useRef();
  // Requested service - select examination - functions / useEffect
  const selectExaminationOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };

  const onCloseChangeHandler = (value) => {
    const examinationCodeArr = [];
    let serviceTypeCodeValue = '';
    if (value && value.length) {
      serviceTypeCodeValue = value[0].serviceType.code;
      value.forEach((item, itemIndex) => {
        examinationCodeArr.push(item.reasonCode.code);
      });
    }
    setValue([
      {
        serviceTypeCode: serviceTypeCodeValue,
      },
      {
        examinationCode: examinationCodeArr,
      },
    ]);
  };

  const selectExaminationOnOpenHandler = () => {
    setPendingValue(selectedServicesType);
    setServicesTypeOpen(true);
  };
  const selectExaminationOnCloseHandler = () => {
    setServicesTypeOpen(false);
  };
  const filterOptions = (options, { inputValue }) => {
    if (pendingValue.length) {
      options = matchSorter(options, pendingValue[0].serviceType.code, {
        keys: ['serviceType.code'],
      });
    }
    return matchSorter(options, inputValue, {
      keys: [
        (item) => t(item.reasonCode.name),
        'reasonCode.code',
        (item) => t(item.serviceType.name),
      ],
    });
  };
  const chipOnDeleteHandler = (chipToDeleteIndex) => () => {
    const filteredSelectedServicesType = selectedServicesType.filter(
      (_, selectedIndex) => chipToDeleteIndex !== selectedIndex,
    );
    onCloseChangeHandler(filteredSelectedServicesType);
    setSelectedServicesType(filteredSelectedServicesType);
  };
  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        const serviceTypeResponse = await getValueSet('service_types');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            serviceTypeResponse.data.expansion.contains.map((serviceType) => {
              const normalizedServiceType = normalizeFhirValueSet(serviceType);
              servicesTypeObj[normalizedServiceType.code] = {
                ...normalizedServiceType,
              };
              return getValueSet(`reason_codes_${normalizedServiceType.code}`);
            }),
          );

          for (
            let reasonsIndex = 0;
            reasonsIndex < allReasonsCode.length;
            reasonsIndex++
          ) {
            allReasonsCode[reasonsIndex].data.expansion.contains.forEach(
              (reasonCode) => {
                const optionObj = {};
                optionObj['serviceType'] = {
                  ...servicesTypeObj[
                    allReasonsCode[reasonsIndex].data.id.split('_')[2]
                  ],
                };
                optionObj['reasonCode'] = normalizeFhirValueSet(reasonCode);
                options.push(optionObj);
              },
            );
          }
          setServicesType(options);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingServicesType]);

  const unFocusSelectTest = () => {
    selectTestRef.current.blur();
    // Should work don't know why it doesn't work. This function is to close the listBox in the autoComplete
  };

  useEffect(() => {
    register({ name: 'serviceTypeCode' });
    register({ name: 'examinationCode' });
    setValue([
      { serviceTypeCode },
      { examinationCode },
      { isUrgent: priority > 1 ? true : false },
    ]);
    return () => {
      unregister(['serviceTypeCode', 'examinationCode']);
    };
  }, [
    register,
    priority,
    unregister,
    examinationCode,
    serviceTypeCode,
    setValue,
  ]);

  useEffect(() => {
    if (examination && examination.length) {
      const selectedArr = examination.map((reasonCodeEl, reasonCodeElIndex) => {
        return {
          serviceType: {
            name: serviceType,
            code: serviceTypeCode,
          },
          reasonCode: {
            name: reasonCodeEl,
            code: examinationCode[reasonCodeElIndex],
          },
        };
      });
      setSelectedServicesType(selectedArr);
    }
  }, [examination, examinationCode, serviceType, serviceTypeCode]);
  return (
    <React.Fragment>
      {!props.hasOwnProperty('disableHeaders') ||
      props.disableHeaders === true ? (
        <Title
          marginTop={'80px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Visit Details'}
        />
      ) : null}
      {/* Requested service */}
      <StyledFormGroup>
        {!props.hasOwnProperty('disableHeaders') ||
        props.disableHeaders === true ? (
          <>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={'Requested service'}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
          </>
        ) : null}
        {!props.hasOwnProperty('disableButtonIsUrgent') ||
        props.disableButtonIsUrgent === true ? (
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <span>{t('Is urgent?')}</span>
            {/* Requested service - switch */}
            <StyledSwitch
              name='isUrgent'
              register={register}
              label_1={'No'}
              label_2={'Yes'}
              marginLeft={'40px'}
              marginRight={'40px'}
            />
          </Grid>
        ) : null}
        {/* Requested service - select test */}
        <StyledAutoComplete
          filterOptions={filterOptions}
          multiple
          noOptionsText={t('No Results')}
          loadingText={t('Loading')}
          open={servicesTypeOpen}
          loading={loadingServicesType}
          onOpen={selectExaminationOnOpenHandler}
          onClose={selectExaminationOnCloseHandler}
          value={pendingValue}
          onChange={selectExaminationOnChangeHandler}
          getOptionSelected={(option, value) =>
            option.reasonCode.name === value.reasonCode.name
          }
          disableCloseOnSelect
          renderTags={() => null}
          renderOption={(option, state) => (
            <Grid container justify='flex-end' alignItems='center'>
              <Grid item xs={3}>
                <Checkbox
                  color='primary'
                  icon={<CheckBoxOutlineBlankOutlined />}
                  checkedIcon={<CheckBox />}
                  checked={state.selected}
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText>{option.reasonCode.code}</ListItemText>
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary={t(option.serviceType.name)} />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary={t(option.reasonCode.name)} />
              </Grid>
            </Grid>
          )}
          ListboxComponent={ListboxComponent}
          ListboxProps={{
            pendingValue: pendingValue,
            setSelectedServicesType: setSelectedServicesType,
            setOpen: setServicesTypeOpen,
            setValue: onCloseChangeHandler,
          }}
          options={servicesType}
          renderInput={(params) => (
            <CustomizedTextField
              width={'70%'}
              name='selectTest'
              inputRef={(e) => {
                selectTestRef.current = e;
              }}
              error={requiredErrors.selectTest ? true : false}
              helperText={
                requiredErrors.selectTest &&
                t(
                  'The visit reason performed during the visit must be selected',
                )
              }
              {...params}
              label={`${t('Reason for refferal')} *`}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    <InputAdornment position={'end'}>
                      {loadingServicesType ? (
                        <CircularProgress color={'inherit'} size={20} />
                      ) : null}
                      {servicesTypeOpen ? <ExpandLess /> : <ExpandMore />}
                    </InputAdornment>
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        {/* Requested service - selected test - chips */}
        <Grid container direction='row' wrap='wrap'>
          {selectedServicesType.map((selected, selectedIndex) => (
            <StyledChip
              deleteIcon={<Close fontSize='small' />}
              onDelete={chipOnDeleteHandler(selectedIndex)}
              key={selectedIndex}
              label={`${selected.reasonCode.code} | ${t(
                selected.serviceType.name,
              )} | ${t(selected.reasonCode.name)}`}
            />
          ))}
        </Grid>
        <Controller
          control={control}
          name='reasonForReferralDetails'
          defaultValue={reasonCodeDetails}
          as={
            <CustomizedTextField
              width={'70%'}
              label={t('Reason for referral details')}
            />
          }
        />
      </StyledFormGroup>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
  };
};
export default connect(mapStateToProps, null)(VisitDetails);
