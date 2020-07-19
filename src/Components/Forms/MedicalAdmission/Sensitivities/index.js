import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyledSensitivities } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { Checkbox, Grid, ListItemText } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlankOutlined } from '@material-ui/icons';

const Sensitivities = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const [sensitivitiesChanged, setSensitivitiesChanged] = useState(false);

  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;

  const sensitivitiesRadioList = [t('UNknown'), t('Known')];

  const sensitivitiesHandlerRadio = (value) => {
    console.log('sensitivities: ' + value);
    setSensitivitiesChanged(value);
  };
  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
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
          servicesType={servicesType}
          loadingServicesType={loadingServicesType}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'sensitivities'}
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
