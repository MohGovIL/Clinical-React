import React, { useState, useEffect } from 'react';
import { StyledChip } from 'Components/Generic/PatientAdmission/PatientDetailsBlock/Style';
import {
  Checkbox,
  CircularProgress,
  Grid,
  InputAdornment,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Close,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import ListboxComponent from 'Components/Generic/PatientAdmission/PatientDetailsBlock/ListboxComponent';
import VirtualizedListBoxWithConfirmButton from 'Assets/Elements/AutoComplete/VirtualizedListBoxWithConfirmButton';
import CustomizedTextField from '../CustomizedTextField';
import { useTranslation } from 'react-i18next';
import matchSorter from 'match-sorter';
import { useFormContext } from 'react-hook-form';
import { StyledAutocomplete } from './Style';

const CustomizedSelectCheckList = ({
  labelInputText,
  helperErrorText,
  selectCheckList,
  loadingCheckList,
  servicesTypeOpen,
  setServicesTypeOpen,
  valueSetCode,
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
  virtual,
  selectedList,
}) => {
  const { t } = useTranslation();
  const { requiredErrors, setValue } = useFormContext();
  
  const [selectedServicesType, setSelectedServicesType] = useState([]);

  useEffect(() => {
    setSelectedServicesType(selectedList);
    setValue(
      valueSetCode,
      selectedList.map((item) => item.reasonCode.code),
    );
  }, [setValue, valueSetCode, selectedList]);

  const [pendingValue, setPendingValue] = useState([]);
  const selectTestRef = React.useRef();
  // Requested service - select examination - functions / useEffect
  const selectCheckListOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };

  const onCloseChangeHandler = (value) => {
    const checkListCodeArr = [];
    if (value && value.length) {
      value.forEach((item, itemIndex) => {
        checkListCodeArr.push(item.reasonCode.code);
      });
    }
    setValue([
      {
        [valueSetCode]: checkListCodeArr,
      },
    ]);
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

  //this function for change dropdown list style
  const defaultRenderOption = (option, state) => {
    return (
      <React.Fragment>
        <Grid container justify='flex-start' alignItems='center'>
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
              <Typography noWrap>{option.reasonCode.code}</Typography>
              {/* <ListItemText>{option.reasonCode.code}</ListItemText> */}
            </Grid>
          )}
          {option.serviceType && option.serviceType.name && (
            <Grid item xs={3}>
              <Typography noWrap>{option.serviceType.name}</Typography>
              {/* <ListItemText primary={t(option.serviceType.name)} /> */}
            </Grid>
          )}
          {option.reasonCode && option.reasonCode.name && (
            <Grid item xs={3}>
              <Typography noWrap>{option.reasonCode.name}</Typography>
              {/* <ListItemText primary={t(option.reasonCode.name)} /> */}
            </Grid>
          )}
        </Grid>
      </React.Fragment>
    );
  };

  //this function draw default chip-label style
  const defaultChipLabel = (selected) => {
    return `${selected.reasonCode.code} | ${t(selected.serviceType.name)} | ${t(
      selected.reasonCode.name,
    )}`;
  };

  return (
    <React.Fragment>
      <StyledAutocomplete
        filterOptions={filterOptions}
        multiple
        noOptionsText={t('No Results')}
        loadingText={t('Loading')}
        open={servicesTypeOpen}
        loading={loadingCheckList}
        onOpen={selectCheckListOnOpenHandler}
        onClose={selectCheckListOnCloseHandler}
        value={pendingValue}
        onChange={selectCheckListOnChangeHandler}
        getOptionSelected={(option, value) =>
          option.reasonCode.name === value.reasonCode.name
        }
        disableCloseOnSelect
        renderTags={() => null}
        renderOption={(option, state) =>
          defaultRenderOptionFunction
            ? defaultRenderOptionFunction(option, state)
            : defaultRenderOption(option, state)
        }
        // TODO check why using virtual makes the list go ltr from rtl
        ListboxComponent={
          virtual ? VirtualizedListBoxWithConfirmButton : ListboxComponent
        }
        ListboxProps={{
          pendingValue: pendingValue,
          setSelectedServicesType: setSelectedServicesType,
          setOpen: setServicesTypeOpen,
          setValue: onCloseChangeHandler,
        }}
        options={selectCheckList}
        renderInput={(params) => (
          <CustomizedTextField
            width={'70%'}
            name='selectTest'
            inputRef={(e) => {
              selectTestRef.current = e;
            }}
            error={requiredErrors[valueSetCode] ? true : false}
            helperText={
              // requiredErrors[valueSetCode] && helperErrorText && t(helperErrorText)
              // t('The visit reason performed during the visit must be selected')
              requiredErrors[valueSetCode] || ''
            }
            {...params}
            label={`${t(labelInputText)} *`}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  <InputAdornment position={'end'}>
                    {loadingCheckList ? (
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
            label={
              defaultChipLabelFunction
                ? defaultChipLabelFunction(selected)
                : defaultChipLabel(selected)
            }
          />
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default CustomizedSelectCheckList;
