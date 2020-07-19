import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyleChronicMedication } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

const ChronicMedication = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const [medicationChanged, setMedicationChanged] = useState(false);
  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;

  //Radio buttons for medication details
  const medicationRadioList = [t("Doesn't exist"), t('Exist')];

  const medicationHandlerRadio = (value) => {
    console.log('medication: ' + value);
    setMedicationChanged(value);
  };

  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        const sensitivitiesResponse = await getValueSet('drugs_list');
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
    <StyleChronicMedication>
      <RadioGroupChoice
        gridLabel={t('Chronic medications')}
        radioName={'medication'}
        listValues={medicationRadioList}
        trueValue={t('Exist')}
        callBackFunction={medicationHandlerRadio}
      />
      {medicationChanged && (
        <CustomizedSelectCheckList
          servicesType={servicesType}
          loadingServicesType={loadingServicesType}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          labelInputText={'Medications details'}
          helperErrorText={
            'The visit reason performed during the visit must be selected'
          }
          defaultRenderOptionFunction={defaultRenderOptionFunction}
          defaultChipLabelFunction={defaultChipLabelFunction}
        />
      )}
    </StyleChronicMedication>
  );
};
export default ChronicMedication;
