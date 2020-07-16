import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyleBackgroundDiseases } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

const BackgroundDiseases = ({}) => {
  const { t } = useTranslation();
  const [backgroundDisChanged, setBackgroundDisChanged] = useState(false);
  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;

  const backgroundDisRadioList = [
    t('Usually healthy'),
    t('There are diseases'),
  ];

  const backgroundDisHandlerRadio = (value) => {
    console.log('backgroundDis: ' + value);
    setBackgroundDisChanged(value);
  };

  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        const sensitivitiesResponse = await getValueSet('bk_diseases');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            sensitivitiesResponse.data.expansion.contains.map((sensitive) => {
              const normalizedSensitiveSet = normalizeFhirValueSet(sensitive);
              const optionObj = {};
              optionObj['serviceType'] = {
                ...servicesTypeObj[normalizedSensitiveSet.code]
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
    <StyleBackgroundDiseases>
      <RadioGroupChoice
        gridLabel={t('Background diseases')}
        radioName={'background_diseases'}
        listValues={backgroundDisRadioList}
        trueValue={t('There are diseases')}
        callBackFunction={backgroundDisHandlerRadio}
      />
      {backgroundDisChanged && (
        <CustomizedSelectCheckList
          servicesType={servicesType}
          loadingServicesType={loadingServicesType}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}

          labelInputText={'Diseases details'}
          helperErrorText={
            'The visit reason performed during the visit must be selected'
          }
        />
      )}
    </StyleBackgroundDiseases>
  );
};
export default BackgroundDiseases;
