import React from 'react';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import StyledSaveForm, { CenterButton } from './Style';
import Content from './Content';
import { useFormContext } from 'react-hook-form';
import { store } from 'index';
import { FHIR } from 'Utils/Services/FHIR';
import { useHistory } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param { [{value: string, label: string}] } statuses
 * @description The data from this component will be inside the data object as 'nextStatus' in the onSubmitHandler
 */
const SaveForm = ({
  statuses,
  mainStatus,
  encounter,
  onSubmit,
  validationFunction,
}) => {
  const { t } = useTranslation();
  const { permission, watch, getValues } = useFormContext();

  const history = useHistory();
  let selectedStatus = '';
  if (statuses) selectedStatus = watch('nextStatus');

  const updateEncounter = async () => {
    try {
      const cloneEncounter = { ...encounter };
      cloneEncounter.extensionSecondaryStatus = selectedStatus;
      cloneEncounter.status = mainStatus;
      cloneEncounter.practitioner = store.getState().login.userID;

      await FHIR('Encounter', 'doWork', {
        functionName: 'updateEncounter',
        functionParams: {
          encounterId: encounter.id,
          encounter: cloneEncounter,
        },
      });
      history.push(`${baseRoutePath()}/generic/patientTracking`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = async () => {
    if (validationFunction(getValues({ nest: true })) || true) {
      // await Promise.all(onSubmit(getValues({ nest: true })));
      updateEncounter();
    }
  };

  return (
    <StyledSaveForm direction={statuses ? 'row' : 'row-reverse'}>
      {statuses ? <Content statuses={statuses} /> : null}
      <CenterButton>
        <StyledButton
          color='primary'
          variant='contained'
          type='button'
          letterSpacing={'0.1'}
          onClick={onClickHandler}
          disabled={
            !statuses
              ? false
              : !selectedStatus
              ? true
              : permission === 'view'
              ? true
              : false
          }>
          {t('Save & Close')}
        </StyledButton>
      </CenterButton>
    </StyledSaveForm>
  );
};

export default SaveForm;
