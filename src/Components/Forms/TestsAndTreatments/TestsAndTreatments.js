/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param  {object} patient,
           {object} encounter,
           {object} permission,
           {object} formatDate,
           {object} languageDirection,
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
import SaveTestAndTreatments from 'Components/Forms/TestsAndTreatments/Instructions/SaveTestAndTreatments';
import denormalizeFhirObservation from '../../../Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirObservation';
import moment from 'moment';

/**
 *
 * @param patient
 * @param encounter
 * @param permission
 * @param formatDate
 * @param languageDirection
 * @param currentUser
 * @returns {*}
 * @constructor
 */
const TestsAndTreatments = ({
  patient,
  encounter,
  permission,
  formatDate,
  languageDirection,
  currentUser,
}) => {
  const { t } = useTranslation();
  const [
    thereIsARecordOfExamObservation,
    setThereIsARecordOfExamObservation,
  ] = useState(false);
  const [clinicIndicators, setClinicIndicators] = useState(null);

  const [constantIndicators, setConstantIndicators] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      Height: null,
      Weight: null,
    },
  );
  const userDetails = normalizeFhirUser(currentUser);
  const [variantIndicators, setVariantIndicators] = useState(null);
  const [variantIndicatorsNew, setVariantIndicatorsNew] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    [
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
    ],
  );

  const saveIndicatorsOnSubmit = () => {
    const denormelizedConstantObservation = denormalizeFhirObservation({
      component: constantIndicators,
      status: 'amended',
      subject: Number(patient.id),
      encounter: Number(encounter.id),
      issued: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'), //Moment(Moment.now()).format(formatDate),
      performer: userDetails.id,
      category: {
        code: 'exam',
        system: 'http://hl7.org/fhir/ValueSet/observation-category',
      },
    });
    const denormelizedVariantIndicatorsNew = denormalizeFhirObservation({
      component: variantIndicatorsNew[0],
      status: 'amended',
      subject: Number(patient.id),
      encounter: Number(encounter.id),
      issued: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'), //Moment(Moment.now()).format(formatDate),
      performer: userDetails.id,
      category: {
        code: 'vital-signs',
        system: 'http://hl7.org/fhir/ValueSet/observation-category',
      },
    });
    FHIR('Observations', 'doWork', {
      functionName: 'createNewObservation',
      functionParams: {
        id: null,
        data: denormelizedVariantIndicatorsNew,
      },
    });
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
    });
    console.log(JSON.stringify(denormelizedConstantObservation));
    console.log(JSON.stringify(denormelizedVariantIndicatorsNew));
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
            performers[entry.resource.id] = entry.resource.name;
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
            normalizedConstantObservation[
              normalizedConstantObservation.length - 1
            ] &&
            normalizedConstantObservation[
              normalizedConstantObservation.length - 1
            ]['observation']
              ? normalizedConstantObservation[
                  normalizedConstantObservation.length - 1
                ]['observation']
              : clinicIndicators.data['constant'],
          constantIndicators,
          setConstantIndicators,
          disabled: encounter.status === 'finished',
        });

        setConstantIndicators(normalizedConstantObservation);

        let normalizedVarientNewObservation = thickenTheData({
          indicators: clinicIndicators,
          variantIndicatorsNew,
          setVariantIndicatorsNew,
          normalizedVariantObservation,
        });

        setVariantIndicatorsNew([normalizedVarientNewObservation]);

        let normalizedVariantObservationTemp = [];

        // eslint-disable-next-line no-unused-expressions
        normalizedVariantObservation.map((value, index) => {
          if (value['observation']) {
            let userName = {
              userName: {
                name: value.performerName && value.performerName.toString(),
                loggedHour: Moment(value.issued).format('HH:mm'),
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
    <StyledTestsAndTreatments dir={languageDirection}>
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
            saveIndicatorsOnSubmit={saveIndicatorsOnSubmit}
          />
        </React.Fragment>
      ) : null}
    </StyledTestsAndTreatments>
  );
};
/**
 *
 * @param state
 * @returns {{formatDate: any, currentUser: {}, languageDirection: any, patient: {}, encounter: {}}}
 */
const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(TestsAndTreatments);
