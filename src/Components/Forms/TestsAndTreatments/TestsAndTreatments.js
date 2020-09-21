/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param  {object} patient,
           {object} encounter,
           {object} permission,
           {object} formatDate,
           {object} language_direction,
           {object} verticalName,
           {object} currentUser,
 * @purpose TestsAndTreatments -  will be the main component which will draw all other components -
 *                                a) the constant indicators - ConstantIndicators.
 *                                b) the variant indicators - VariantIndicators.
 *                                c) the new variant indicators - VariantIndicators.
 *                                d) Test and treatment instructions
 * @returns TestsAndTreatments Component.
 */

import { connect } from 'react-redux';
import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConstantIndicators from 'Components/Forms/TestsAndTreatments/Indicators/ConstantIndicators';
import VariantIndicators from 'Components/Forms/TestsAndTreatments/Indicators/VariantIndicators';
import {
  StyledConstantHeaders,
  StyledTestsAndTreatments,
} from 'Components/Forms/TestsAndTreatments/Style';
import * as Moment from 'moment';
import normalizeFhirUser from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import { getIndicatorsSettings } from 'Utils/Services/API';
import { thickenTheData } from 'Components/Forms/TestsAndTreatments/Helpers/DataHelpers';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirObservation from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirObservation';
import InstructionsForTreatment from 'Components/Forms/TestsAndTreatments/Instructions/InstructionsForTreatment';
import denormalizeFhirObservation from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirObservation';
import { explodeMultipleIndicators } from 'Components/Forms/TestsAndTreatments/Helpers/FunctionHelpers.js';
import { fhirFormatDateTime, formatTime }  from 'Utils/Helpers/Datetime/formatDate';

/**
 *
 * @param patient
 * @param encounter
 * @param permission
 * @param formatDate
 * @param language_direction
 * @param currentUser
 * @returns {*}
 * @constructor
 */
const TestsAndTreatments = ({
  patient,
  encounter,
  permission,
  formatDate,
  language_direction,
  currentUser,
  functionToRunOnTabChange,
  validationFunction,
}) => {
  const { t } = useTranslation();
  const [
    thereIsARecordOfExamObservation,
    setThereIsARecordOfExamObservation,
  ] = useState(false);
  const [clinicIndicators, setClinicIndicators] = useState(null);
  const [saveFormClicked, setSaveFormClicked] = useState(0);
  const [constantIndicators, setConstantIndicators] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      Height: null,
      Weight: null,
    },
  );
  const userDetails = normalizeFhirUser(currentUser);
  const [variantIndicators, setVariantIndicators] = useState(null);
  const variantNewState = [
    {
      userName: {
        name: userDetails.name[0].toString(),
        loggedHour: Moment(Moment.now()).format('HH:mm'),
      },
      'Blood pressure': null,
      Pulse: null,
      Fever: null,
      Saturation: null,
      'Breaths per minute': null,
      'Pain level': null,
      'Blood sugar': null,
    },
  ];
  const [variantIndicatorsNew, setVariantIndicatorsNew] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    variantNewState,
  );
  function checkWheterToSaveIndicators(indicators) {
    if (!indicators) return;

    let saveThis = false;
    for (const observed in indicators) {
      if (indicators[observed] && indicators[observed].value !== '')
        return true;
    }
    return saveThis;
  }

  const saveIndicatorsOnSubmit = () => {
    if (permission !== 'write') {
      return []; //return empty async calls
    }

    let FHIRAsyncCalls = [];
    if (checkWheterToSaveIndicators(constantIndicators)) {
      const denormelizedConstantObservation = denormalizeFhirObservation({
        component: constantIndicators,
        status: 'amended',
        subject: Number(patient.id),
        encounter: Number(encounter.id),
        issued: fhirFormatDateTime(),
        performer: userDetails.id,
        category: {
          code: 'exam',
          system: 'http://hl7.org/fhir/ValueSet/observation-category',
        },
      });
      FHIRAsyncCalls.push(
        FHIR('Observations', 'doWork', {
          functionName: thereIsARecordOfExamObservation
            ? 'updateObservation'
            : 'createNewObservation',
          functionParams: {
            id: thereIsARecordOfExamObservation
              ? thereIsARecordOfExamObservation
              : null,
            data: denormelizedConstantObservation,
          },
        }),
      );
    }

    let checkVariantIndicators = { ...variantIndicatorsNew[0] };
    delete checkVariantIndicators.userName;

    if (checkWheterToSaveIndicators(checkVariantIndicators)) {
      const explodeMultiIndicators = explodeMultipleIndicators(
        checkVariantIndicators,
        'Systolic blood pressure/Diastolic blood pressure',
        '/',
      );
      if (
        explodeMultiIndicators['Saturation'] &&
        explodeMultiIndicators['Saturation']['value']
      ) {
        explodeMultiIndicators['Saturation']['value'] = parseInt(
          explodeMultiIndicators['Saturation']['value'],
        );
      }
      const denormelizedVariantIndicatorsNew = denormalizeFhirObservation({
        component: explodeMultiIndicators,
        status: 'amended',
        subject: Number(patient.id),
        encounter: Number(encounter.id),
        issued: fhirFormatDateTime(),
        performer: userDetails.id,
        category: {
          code: 'vital-signs',
          system: 'http://hl7.org/fhir/ValueSet/observation-category',
        },
      });

      FHIRAsyncCalls.push(
        FHIR('Observations', 'doWork', {
          functionName: 'createNewObservation',
          functionParams: {
            id: null,
            data: denormelizedVariantIndicatorsNew,
          },
        }),
      );
    }

    return FHIRAsyncCalls;
  };

  useEffect(() => {
    (async () => {
      try {
        let fhirClinikalCalls = [];
        fhirClinikalCalls.push(getIndicatorsSettings());

        fhirClinikalCalls.push(
          FHIR('Observations', 'doWork', {
            functionName: 'getObservations',
            functionParams: {
              patient: Number(patient.id),
              encounter: Number(encounter.id),
              category: 'exam',
              _sort: '-issued',
              _include: 'Observation:performer',
            },
          }),
        );

        fhirClinikalCalls.push(
          FHIR('Observations', 'doWork', {
            functionName: 'getObservations',
            functionParams: {
              patient: patient.id,
              encounter: encounter.id,
              category: 'vital-signs',
              _sort: '-issued',
              _include: 'Observation:performer',
            },
          }),
        );

        const fhirClinikalCallsAfterAwait = await Promise.all(
          fhirClinikalCalls,
        );

        const clinicIndicators = fhirClinikalCallsAfterAwait[0]; //'clinicIndicators';
        const constantFromFhirIndicators = fhirClinikalCallsAfterAwait[1]; //'constantFromFhirIndicators';

        if (
          constantFromFhirIndicators &&
          constantFromFhirIndicators.data &&
          constantFromFhirIndicators.data.total > 0
        ) {
          setThereIsARecordOfExamObservation(
            constantFromFhirIndicators.data.entry[1].resource.id,
          );
        }
        const variantFromFhirIndicators = fhirClinikalCallsAfterAwait[2]; //'variantFromFhirIndicators';
        setClinicIndicators(clinicIndicators);

        let performers = [];

        variantFromFhirIndicators.data.entry.map((entry, key) => {
          if (
            entry.resource &&
            entry.resource.resourceType === 'Practitioner'
          ) {
            let user = normalizeFhirUser(entry.resource);
            performers[entry.resource.id] = user.name;
          }
        });

        let normalizedVariantObservation = [];
        variantFromFhirIndicators.data.entry.map((entry, key) => {
          if (entry.resource && entry.resource.resourceType === 'Observation') {
            normalizedVariantObservation.push(
              normalizeFhirObservation(
                entry.resource,
                clinicIndicators.data['variant'],
                performers,
              ),
            );
          }
        });

        let normalizedConstantObservation = [];
        constantFromFhirIndicators.data.entry.map((entry, key) => {
          if (entry.resource && entry.resource.resourceType === 'Observation') {
            normalizedConstantObservation.push(
              normalizeFhirObservation(
                entry.resource,
                clinicIndicators.data['constant'],
                performers,
              ),
            );
          }
        });

        normalizedConstantObservation = thickenTheData({
          normalizedConstantObservation:
            normalizedConstantObservation &&
            normalizedConstantObservation.length > 0 &&
            normalizedConstantObservation[0] &&
            normalizedConstantObservation[0]['observation']
              ? normalizedConstantObservation[0]['observation']
              : clinicIndicators.data['constant'],
          constantIndicators,
          setConstantIndicators,
          disabled: encounter.status === 'finished' || permission !== 'write',
        });

        setConstantIndicators(normalizedConstantObservation);

        if (permission === 'write') {
          let normalizedVarientNewObservation = thickenTheData({
            indicators: clinicIndicators,
            variantIndicatorsNew: variantNewState,
            setVariantIndicatorsNew,
            normalizedVariantObservation: [],
          });

          setVariantIndicatorsNew([normalizedVarientNewObservation]);
        }

        let normalizedVariantObservationTemp = [];

        // eslint-disable-next-line no-unused-expressions
        normalizedVariantObservation.map((value, index) => {
          if (value['observation']) {
            let userName = {
              userName: {
                name: value.performerName && value.performerName.toString(),
                loggedHour: formatTime(value.issued),
              },
            };
            value['observation'] = { ...userName, ...value.observation };
          }

          normalizedVariantObservationTemp.push(
            thickenTheData({
              indicators: clinicIndicators,
              variantIndicators,
              setVariantIndicators,
              normalizedVariantObservation:
                value && value['observation'] ? value['observation'] : null,
              disabled: true,
            }),
          );
        });

        setVariantIndicators(normalizedVariantObservationTemp);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <StyledTestsAndTreatments>
      {constantIndicators && clinicIndicators ? (
        <ConstantIndicators constantIndicators={constantIndicators} />
      ) : null}
      {clinicIndicators && (variantIndicators || variantIndicatorsNew) ? (
        <React.Fragment>
          <StyledConstantHeaders>
            {t('Variable indicators')}
          </StyledConstantHeaders>
          <hr />

          <VariantIndicators
            variantIndicators={
              variantIndicators
                ? encounter.status !== 'finished'
                  ? variantIndicatorsNew
                    ? variantIndicators.concat(variantIndicatorsNew[0])
                    : variantIndicators
                  : variantIndicators
                : encounter.status !== 'finished'
                ? variantIndicatorsNew
                : null
            }
          />

          <InstructionsForTreatment
            constantIndicators={constantIndicators}
            variantIndicatorsNew={variantIndicatorsNew}
            saveIndicatorsOnSubmit={saveIndicatorsOnSubmit}
            validationFunction={validationFunction}
            functionToRunOnTabChange={functionToRunOnTabChange}
            permission={permission}
          />
        </React.Fragment>
      ) : null}
    </StyledTestsAndTreatments>
  );
};
/**
 *
 * @param state
 * @returns {{formatDate: any, currentUser: {}, language_direction: any, patient: {}, encounter: {}}}
 */
const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    language_direction: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(TestsAndTreatments);
