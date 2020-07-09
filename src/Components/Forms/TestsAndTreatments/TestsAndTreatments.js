//TestsAndTreatment

import { connect } from 'react-redux';
import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConstantIndicators from 'Components/Forms/TestsAndTreatments/ConstantIndicators';
import VariantIndicators from 'Components/Forms/TestsAndTreatments/VariantIndicators';
import { StyledConstantHeaders, StyledTestsAndTreatments } from './Style';
import * as Moment from 'moment';
import normalizeFhirUser from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import { getIndicatorsSettings } from 'Utils/Services/API';
import { thickenTheData } from 'Components/Forms/TestsAndTreatments/Helpers/DataHelpers';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirObservation from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirObservation';
import TreatmentInstructions from 'Components/Forms/TestsAndTreatments/TreatmentInstructions';

const TestsAndTreatments = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
  currentUser,
}) => {
  const { t } = useTranslation();
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

  useEffect(() => {
    (async () => {
      try {
        const clinicIndicators = await getIndicatorsSettings();
        setClinicIndicators(clinicIndicators);

        const constantFromFhirIndicators = await FHIR(
          'Observations',
          'doWork',
          {
            functionName: 'getObservations',
            functionParams: {
              patient: Number(patient.id),
              encounter: Number(encounter.id),
              category: 'exam',
              _sort: '-issued',
            },
          },
        );
        const variantFromFhirIndicators = await FHIR('Observations', 'doWork', {
          functionName: 'getObservations',
          functionParams: {
            patient: patient.id,
            encounter: encounter.id,
            category: 'vital-signs',
            _sort: '-issued',
          },
        });
        let normalizedVariantObservation = [];
        variantFromFhirIndicators.data.entry.map((entry, key) => {
          if (entry.resource && entry.resource.resourceType === 'Observation') {
            normalizedVariantObservation.push(
              normalizeFhirObservation(
                entry.resource,
                clinicIndicators.data['variant'],
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
                name: value.performer.toString(),
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

          <TreatmentInstructions />
        </React.Fragment>
      ) : null}
    </StyledTestsAndTreatments>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(TestsAndTreatments);
