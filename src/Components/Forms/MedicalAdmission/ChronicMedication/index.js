import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyleChronicMedication } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useFormContext } from 'react-hook-form';

const ChronicMedication = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const { register, unregister, watch } = useFormContext();

  const medicationToggleButton = watch('medication');

  const [chronicMedicationList, setChronicMedicationList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingChronicMedicationList =
    servicesTypeOpen && chronicMedicationList.length === 0;

  //Radio buttons for medication details
  const medicationRadioList = ["Doesn't exist", 'Exist'];

  useEffect(() => {
    register({ name: 'chronicMedicationCodes' });
    return () => unregister(['chronicMedicationCodes']);
  }, [register, unregister]);

  useEffect(() => {
    let active = true;

    if (!loadingChronicMedicationList) {
      return undefined;
    }

    (async () => {
      try {
        const sensitivitiesResponse = await getValueSet('drugs_list');
        if (active) {
          const myOptions = [{ code: '1', display: 'sadfadsasd' }];
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
          // setChronicMedicationList(options);
          setChronicMedicationList(myOptions);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingChronicMedicationList]);

  return (
    <StyleChronicMedication>
      <RadioGroupChoice
        gridLabel={t('Chronic medications')}
        radioName={'medication'}
        listValues={medicationRadioList}
      />
      {medicationToggleButton === 'Exist' && (
        <CustomizedSelectCheckList
          selectCheckList={chronicMedicationList}
          loadingCheckList={loadingChronicMedicationList}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'chronicMedicationCodes'}
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
