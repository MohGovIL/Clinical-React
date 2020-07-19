import React from 'react';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import StyledSaveForm, { CenterButton } from './Style';
import Content from './Content';
import { useFormContext } from 'react-hook-form';
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param { [{value: string, label: string}] } statuses
 * @description The data from this component will be inside the data object as 'nextStatus' in the onSubmitHandler
 */
const SaveForm = ({ statuses }) => {
  const { t } = useTranslation();
  const { permission, watch } = useFormContext();

  const selectedStatus = watch('nextStatus');

  return (
    <StyledSaveForm>
      <Content statuses={statuses} />
      <CenterButton>
        <StyledButton
          color='primary'
          variant='contained'
          type='submit'
          letterSpacing={'0.1'}
          disabled={
            !selectedStatus ? true : permission === 'view' ? true : false
          }>
          {t('Save & Close')}
        </StyledButton>
      </CenterButton>
    </StyledSaveForm>
  );
};

export default SaveForm;
