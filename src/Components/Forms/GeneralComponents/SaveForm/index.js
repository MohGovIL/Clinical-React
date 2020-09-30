import React from 'react';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import { CenterButton } from './Style';
import Content from './Content';
import { useFormContext } from 'react-hook-form';
import { store } from 'index';
import { FHIR } from 'Utils/Services/FHIR';
import { useHistory } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import Grid from '@material-ui/core/Grid';


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
  updateEncounterExtension,
  disabledOnSubmit = false,
  setLoading
}) => {
  const { t } = useTranslation();

  const { permission, watch, getValues } = useFormContext();

  const history = useHistory();
  let selectedStatus = '';
  if (statuses) selectedStatus = watch('nextStatus');
  const practitioner = store.getState().login.userID;
  const updateEncounter = !updateEncounterExtension
    ? async () => {
        try {
          const cloneEncounter = { ...encounter };
          cloneEncounter.extensionSecondaryStatus = selectedStatus;
          cloneEncounter.status = mainStatus;
          cloneEncounter.practitioner = practitioner;

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
      }
    : async () =>
        updateEncounterExtension(encounter, watch('nextStatus'), practitioner);

  const onClickHandler = async () => {
    try {
      if (validationFunction(getValues({ nest: true })) || true) {
        setLoading(true);
        const onSubmitPromises = onSubmit(getValues({ nest: true }));

        if (Array.isArray(onSubmitPromises)) {
          await Promise.all(onSubmitPromises);
        }
        await onSubmitPromises;
        updateEncounter();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabled = () => {
    let clonePermission = true;
    if (!statuses) {
      clonePermission = false;
    }
    if (!selectedStatus) {
      clonePermission = true;
    }
    if (permission === 'write') {
      clonePermission = false;
    } else {
      clonePermission = true;
    }
    if (disabledOnSubmit) {
      clonePermission = true
    }
    return clonePermission;
  };

  return (
    <Grid container spacing={4} direction={statuses ? 'row' : 'row-reverse'}>
      {statuses ? (
        <Content
          statuses={statuses}
          currentStatus={encounter.extensionSecondaryStatus}
        />
      ) : null}
      <Grid item xs={3}>
        <CenterButton>
          <StyledButton
            color='primary'
            variant='contained'
            type='button'
            letterSpacing={'0.1'}
            onClick={onClickHandler}
            disabled={isDisabled()}
          >
            {t('Save & Close')}
          </StyledButton>
        </CenterButton>
      </Grid>
    </Grid>
  );
};

export default SaveForm;
