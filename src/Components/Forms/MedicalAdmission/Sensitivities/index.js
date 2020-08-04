import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyledSensitivities } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useFormContext } from 'react-hook-form';

const Sensitivities = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const { register, unregister, setValue } = useFormContext();
  const [sensitivitiesChanged, setSensitivitiesChanged] = useState(false);

  const [sensitivitiesList, setSensitivitiesList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingSensitivitiesList =
    servicesTypeOpen && sensitivitiesList.length === 0;

  const sensitivitiesRadioList = [t('UNknown'), t('Known')];

  const sensitivitiesHandlerRadio = (value) => {
    console.log('sensitivities: ' + value);
    if (!value) setValue('sensitivitiesCodes', []);
    setValue('sensitivity', value);
    setSensitivitiesChanged(value);
  };

  useEffect(() => {
    register({ name: 'sensitivitiesCodes' });
    register({ name: 'sensitivity' });
    return () => unregister(['sensitivitiesCodes', 'sensitivity']);
  }, [register, unregister]);

  useEffect(() => {
    let active = true;

    if (!loadingSensitivitiesList) {
      return undefined;
    }

    (async () => {
      try {
        const sensitivitiesResponse = await getValueSet('sensitivities');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            sensitivitiesResponse.data.expansion.contains.map((sensitive) => {
              const normalizedSensitiveSet = normalizeFhirValueSet(sensitive);
              const optionObj = {};
              optionObj['serviceType'] = {
                ...servicesTypeObj[normalizedSensitiveSet.code],
              };
              optionObj['reasonCode'] = normalizedSensitiveSet;
              options.push(optionObj);
            }),
          );
          setSensitivitiesList(options);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingSensitivitiesList]);

  return (
    <StyledSensitivities>
      <RadioGroupChoice
        gridLabel={t('Sensitivities')}
        radioName={'sensitivities'}
        listValues={sensitivitiesRadioList}
        trueValue={t('Known')}
        callBackFunction={sensitivitiesHandlerRadio}
      />
      {sensitivitiesChanged && (
        <CustomizedSelectCheckList
          selectCheckList={sensitivitiesList}
          loadingCheckList={loadingSensitivitiesList}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'sensitivitiesCodes'}
          labelInputText={'Sensitivities details'}
          helperErrorText={'Some error text'}
          defaultRenderOptionFunction={defaultRenderOptionFunction}
          defaultChipLabelFunction={defaultChipLabelFunction}
        />
      )}
    </StyledSensitivities>
  );
};

export default Sensitivities;
