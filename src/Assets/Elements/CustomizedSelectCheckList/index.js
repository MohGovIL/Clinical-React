import React, { useState } from 'react';
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

const CustomizedSelectCheckList = ({
  labelInputText,
  helperErrorText,
  servicesType,
  loadingServicesType,
  servicesTypeOpen,
  setServicesTypeOpen,
}) => {
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
  const selectTestRef = React.useRef();
  // Requested service - select examination - functions / useEffect
  const selectCheckListOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };

  const onCloseChangeHandler = (value) => {
    const checkListCodeArr = [];
    let serviceTypeCodeValue = '';
    if (value && value.length) {
      serviceTypeCodeValue = value[0].serviceType.code;
      value.forEach((item, itemIndex) => {
        checkListCodeArr.push(item.reasonCode.code);
      });
    }
    // setValue([
    //   {
    //     serviceTypeCode: serviceTypeCodeValue,
    //   },
    //   {
    //     examinationCode: examinationCodeArr,
    //   },
    // ]);
  };

  const selectCheckListOnOpenHandler = () => {
    setPendingValue(selectedServicesType);
    setServicesTypeOpen(true);
  };
  const selectCheckListOnCloseHandler = () => {
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

  return (
    <React.Fragment>
      <StyledAutoComplete
        filterOptions={filterOptions}
        multiple
        noOptionsText={t('No Results')}
        loadingText={t('Loading')}
        open={servicesTypeOpen}
        loading={loadingServicesType}
        onOpen={selectCheckListOnOpenHandler}
        onClose={selectCheckListOnCloseHandler}
        value={pendingValue}
        onChange={selectCheckListOnChangeHandler}
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
            {option.reasonCode && option.reasonCode.code && (
              <Grid item xs={3}>
                <ListItemText>{option.reasonCode.code}</ListItemText>
              </Grid>
            )}
            {option.serviceType && option.serviceType.name && (
              <Grid item xs={3}>
                <ListItemText primary={t(option.serviceType.name)} />
              </Grid>
            )}
            {option.reasonCode && option.reasonCode.name && (
              <Grid item xs={3}>
                <ListItemText primary={t(option.reasonCode.name)} />
              </Grid>
            )}
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
