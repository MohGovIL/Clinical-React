import React, { useEffect, useState } from 'react';
import RadioGroupChoice from 'Assets/Elements/RadioGroupChoice';
import CustomizedSelectCheckList from 'Assets/Elements/CustomizedSelectCheckList';
import { useTranslation } from 'react-i18next';
import { StyledSensitivities } from './Style';
import { getValueSet } from 'Utils/Services/FhirAPI';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useFormContext } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';

const Sensitivities = ({
  defaultRenderOptionFunction,
  defaultChipLabelFunction,
}) => {
  const { t } = useTranslation();
  const {
    register,
    unregister,
    watch,
    requiredErrors,
    patientId,
    setValue,
  } = useFormContext();

  const direction = useSelector((state) => state.settings.lang_dir);
  const radioName = 'sensitivities';

  const sensitivityToggleValue = watch(radioName);

  const [selectedList, setSelectedList] = useState([]);

  const [sensitivitiesList, setSensitivitiesList] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingSensitivitiesList =
    servicesTypeOpen && sensitivitiesList.length === 0;

  const sensitivitiesRadioList = ['UNknown', 'Known'];

  useEffect(() => {
    register({ name: 'sensitivitiesCodes' });
    register({ name: 'sensitiveConditionsIds' });
    (async () => {
      const conditions = await FHIR('Condition', 'doWork', {
        functionName: 'getConditionListByParams',
        functionParams: {
          category: 'sensitive',
          subject: patientId,
        },
      });
      if (conditions.data.total) {
        const conditionCodes = [];
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
          }
        });
        setSelectedList(conditionCodes);
        setValue([
          { sensitivities: 'Known' },
          { sensitiveConditionsIds: conditionIds },
        ]);
      }
    })();
    return () => unregister(['sensitivitiesCodes', 'sensitiveConditionsIds']);
  }, [register, unregister, patientId, setValue]);

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
        gridLabel={`* ${t('Sensitivities')}`}
        radioName={radioName}
        listValues={sensitivitiesRadioList}
        // customRef={focus}
      />
      <FormHelperText
        style={{ textAlign: `${direction === 'rtl' ? 'right' : 'left'}` }}
        error={requiredErrors[radioName] ? true : false}>
        {requiredErrors[radioName] || ' '}
      </FormHelperText>
      {sensitivityToggleValue === 'Known' && (
        <CustomizedSelectCheckList
          selectedList={selectedList}
          selectCheckList={sensitivitiesList}
          loadingCheckList={loadingSensitivitiesList}
          servicesTypeOpen={servicesTypeOpen}
          setServicesTypeOpen={setServicesTypeOpen}
          valueSetCode={'sensitivitiesCodes'}
          labelInputText={'Sensitivities details'}
          // helperErrorText={'Some error text'}
          defaultRenderOptionFunction={defaultRenderOptionFunction}
          defaultChipLabelFunction={defaultChipLabelFunction}
          sortByTranslation
        />
      )}
    </StyledSensitivities>
  );
};

export default Sensitivities;
