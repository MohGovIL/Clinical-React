import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref,
) {
  const {
    setClose,
    pendingValue,
    setSelectedServicesType,
    setValue,
    ...other
  } = props;
  const { t } = useTranslation();
  const onConfirmHandler = () => {
    setSelectedServicesType((prevState) => {
      setValue('selectTest', pendingValue, true);
      return pendingValue;
    });
    // An idea on how to solve when clicking confirm to make the autoComplete to close is to give a ref to the next element or the inputElement of the autoComplete and make it focus on that element or unfocus.
    setClose(true);
  };
  return (
    <div
      style={{
        position: 'relative',
        maxHeight: '300px',
        overflowY: 'scroll',
        marginBottom: '64px',
      }}
      ref={ref}
      {...other}>
      {props.children}
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
          left: '0',
          bottom: '0',
          backgroundColor: '#ffffff',
          width: 'calc(100% - 15px - 15px)',
          padding: '0 15px 0 15px',
        }}>
        <span>
          {`${t('Is selected')}
            ${pendingValue.length} `}
        </span>
        <CustomizedButton
          label={t('OK')}
          variant='contained'
          color='primary'
          onClickHandler={onConfirmHandler}
        />
      </div>
    </div>
  );
});

export default ListboxComponent;
