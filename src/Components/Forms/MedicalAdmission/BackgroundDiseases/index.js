import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyleBackgroundDiseases } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useFormContext } from 'react-hook-form';

const BackgroundDiseases = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const { register, unregister, watch } = useFormContext();
  const backgroundDiseasesToggleValue = watch('background_diseases');

  const [backgroundDiseasesList, setBackgroundDiseasesList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingBackgroundDiseasesList =
    servicesTypeOpen && backgroundDiseasesList.length === 0;

  const backgroundDisRadioList = ['Usually healthy', 'There are diseases'];

  useEffect(() => {
    register({ name: 'backgroundDiseasesCodes' });
    return () => unregister(['backgroundDiseasesCodes']);
  }, [register, unregister]);

  useEffect(() => {
    let active = true;

    if (!loadingBackgroundDiseasesList) {
      return undefined;
    }

    (async () => {
      try {
        const sensitivitiesResponse = await getValueSet('bk_diseases');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          await Promise.all(
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
          setBackgroundDiseasesList(options);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingBackgroundDiseasesList]);

  return (
    <StyleBackgroundDiseases>
      <RadioGroupChoice
        gridLabel={t('Background diseases')}
        radioName={'background_diseases'}
        listValues={backgroundDisRadioList}
      />
      {backgroundDiseasesToggleValue === 'There are diseases' && (
        <CustomizedSelectCheckList
          selectCheckList={backgroundDiseasesList}
          loadingCheckList={loadingBackgroundDiseasesList}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'backgroundDiseasesCodes'}
          labelInputText={'Diseases details'}
          helperErrorText={'Some error text'}
          defaultRenderOptionFunction={defaultRenderOptionFunction}
          defaultChipLabelFunction={defaultChipLabelFunction}
        />
      )}
    </StyleBackgroundDiseases>
  );
};
export default BackgroundDiseases;
