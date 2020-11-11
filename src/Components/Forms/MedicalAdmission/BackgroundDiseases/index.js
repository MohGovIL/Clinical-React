import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyleBackgroundDiseases } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useFormContext } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';

const BackgroundDiseases = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
  handleLoading,
  initValueFunction
}) => {
  const { t } = useTranslation();
  const {
    register,
    unregister,
    watch,
    requiredErrors,
    patientId,
    setValue,
    currEncounterResponse,
    prevEncounterResponse,
    getValues,
  } = useFormContext();
  const radioName = 'background_diseases';
  const backgroundDiseasesToggleValue = watch(radioName);

  const direction = useSelector((state) => state.settings.lang_dir);

  const [backgroundDiseasesList, setBackgroundDiseasesList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingBackgroundDiseasesList =
    servicesTypeOpen && backgroundDiseasesList.length === 0;

  const backgroundDisRadioList = ['Usually healthy', 'There are diseases'];

  const [selectedList, setSelectedList] = useState([]);

  const onDeleteChipHandler = async (chip) => {
    try {
      const {
        reasonCode: { code },
      } = chip;
      if (currEncounterResponse.length) {
        const { backgroundDiseasesIds } = getValues({ nest: true });
        if (backgroundDiseasesIds[code]) {
          await FHIR('Condition', 'doWork', {
            functionName: 'patchCondition',
            functionParams: {
              conditionId: backgroundDiseasesIds[code].id,
              patchParams: {
                clinicalStatus: 'inactive',
              },
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    register({ name: 'backgroundDiseasesCodes' });
    register({ name: 'backgroundDiseasesIds' });
    (async () => {
      const backgroundDiseasesLinkId = '6';
      if (currEncounterResponse.length || prevEncounterResponse.length) {
        let isBackgroundDiseases = 'noResponse';
        if (currEncounterResponse.length) {
          isBackgroundDiseases = Boolean(
            +currEncounterResponse.find(
              (i) => i.linkId === backgroundDiseasesLinkId,
            )['answer'][0]['valueBoolean'],
          );
        } else if (prevEncounterResponse.length) {
          isBackgroundDiseases = Boolean(
            +prevEncounterResponse.find(
              (i) => i.linkId === backgroundDiseasesLinkId,
            )['answer'][0]['valueBoolean'],
          );
        }
        if (isBackgroundDiseases === true) {
          const conditions = await FHIR('Condition', 'doWork', {
            functionName: 'getConditionListByParams',
            functionParams: {
              category: 'medical_problem',
              subject: patientId,
              status: 'active',
            },
          });
          if (conditions.data.total) {
            const conditionCodes = [];
            const conditionInitIds = [];
            const conditionIds = {};
            conditions.data.entry.forEach((condition) => {
              if (condition.resource) {
                const normalizedCondition = normalizeFhirCondition(
                  condition.resource,
                );
                conditionCodes.push({
                  reasonCode: {
                    name: normalizedCondition.codeText,
                    code: normalizedCondition.codeCode,
                  },
                  serviceType: {
                    code: '',
                    name: '',
                  },
                });
                conditionIds[normalizedCondition.codeCode] = {
                  id: normalizedCondition.id,
                  code: normalizedCondition.codeCode,
                };
                conditionInitIds.push(normalizedCondition.codeCode)
              }
            });
            setSelectedList(conditionCodes);
            initValueFunction([
              { background_diseases: 'There are diseases' },
              { backgroundDiseasesIds: conditionIds },
              { backgroundDiseasesCodes: conditionInitIds },
            ]);
            handleLoading('backgroundDiseases');
          }
        } else if (isBackgroundDiseases === false) {
          initValueFunction([
            {
              background_diseases: 'Usually healthy',
            },
          ]);
          handleLoading('backgroundDiseases');
        }
      } else {
        handleLoading('backgroundDiseases');
      }
    })();
    return () =>
      unregister(['backgroundDiseasesCodes', 'backgroundDiseasesIds']);
  }, [
    register,
    unregister,
    patientId,
    setValue,
    currEncounterResponse,
    prevEncounterResponse,
  ]);

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
        gridLabel={`* ${t('Background diseases')}`}
        radioName={radioName}
        listValues={backgroundDisRadioList}
      />
      <FormHelperText
        style={{ textAlign: `${direction === 'rtl' ? 'right' : 'left'}` }}
        error={requiredErrors[radioName] ? true : false}>
        {requiredErrors[radioName] || ' '}
      </FormHelperText>
      {backgroundDiseasesToggleValue === 'There are diseases' && (
        <CustomizedSelectCheckList
          selectedList={selectedList}
          selectCheckList={backgroundDiseasesList}
          loadingCheckList={loadingBackgroundDiseasesList}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'backgroundDiseasesCodes'}
          labelInputText={'Diseases details'}
          // helperErrorText={'Some error text'}
          defaultRenderOptionFunction={defaultRenderOptionFunction}
          defaultChipLabelFunction={defaultChipLabelFunction}
          sortByTranslation
          onDeleteChip={onDeleteChipHandler}
        />
      )}
    </StyleBackgroundDiseases>
  );
};
export default BackgroundDiseases;
