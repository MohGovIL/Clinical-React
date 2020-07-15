import React, { useEffect, useState } from 'react';
import {
  StyledAutoComplete,
  StyledChip,
  StyledFormGroup,
} from 'Components/Generic/PatientAdmission/PatientDetailsBlock/Style';
import {
  Checkbox,
  CircularProgress,
  Grid,
  InputAdornment,
  ListItemText,
} from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Close,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import ListboxComponent from 'Components/Generic/PatientAdmission/PatientDetailsBlock/ListboxComponent';
import CustomizedTextField from '../CustomizedTextField';
import { useTranslation } from 'react-i18next';
import matchSorter from 'match-sorter';
import { useFormContext } from 'react-hook-form';
import { getValueSet } from '../../../Utils/Services/FhirAPI';
import normalizeFhirValueSet from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

const CustomizedSelectCheckList = ({ labelInputText, helperErrorText }) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    requiredErrors,
    setValue,
    unregister,
    reset,
    getValues,
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

  return (
    <React.Fragment>
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
              requiredErrors.selectTest && helperErrorText && t(helperErrorText)
              // t('The visit reason performed during the visit must be selected')
            }
            {...params}
            label={`${t(labelInputText)} *`}
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
    </React.Fragment>
  );
};
export default CustomizedSelectCheckList;
