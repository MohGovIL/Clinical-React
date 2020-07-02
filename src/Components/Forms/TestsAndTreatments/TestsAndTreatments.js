//TestsAndTreatment

import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import MomentUtils from '@date-io/moment';
import ConstantIndicators from './ConstantIndicators';
import VariantIndicators from './VariantIndicators';
import * as DataHelpers from './Helpers/DataHelpers';
import {
  StyledConstantHeaders,
  StyledForm,
  StyledTestsAndTreatments,
  StyledVariantTextField,
} from './Style';
import LabelWithHourComponent from './LabelWithHourComponent';
import * as Moment from 'moment';
import { store } from '../../../index';
import normalizeFhirUser from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import { getCities, getIndicatorsSettings } from '../../../Utils/Services/API';
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
  const [pressureNew, setPressureNew] = useState([]);
  const [pulseNew, setPulseNew] = useState([]);
  const userDetails = normalizeFhirUser(currentUser);
  const [userNameNew, setUserNameNew] = useState([
    {
      name: userDetails.name[0].toString(),
      loggedHour: Moment(Moment.now()).format('HH:mm'),
    },
  ]);
  const [feverNew, setFeverNew] = useState([]);
  const [saturationNew, setSaturationNew] = useState([]);
  const [breathsPerMinNew, setBreathsPerMinNew] = useState([]);
  const [painLevelNew, setPainLevelNew] = useState([]);
  const [bloodSugarNew, setBloodSugarNew] = useState([]);

  const [height, setHeight] = useState('10');
  const [weight, setWeight] = useState('2');
  const [pressure, setPressure] = useState([]);
  const [pulse, setPulse] = useState([
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
  ]);
  const [userName, setUserName] = useState([
    { name: 'Smurfette', loggedHour: '9:00' },
    { name: 'Papa Smurf', loggedHour: '19:00' },
    { name: 'Clumsy Smurf', loggedHour: '2:00' },
    { name: 'Brainy Smurf', loggedHour: '4:00' },
    { name: 'Grouchy Smurf', loggedHour: '5:00' },
    { name: 'Hefty Smurf', loggedHour: '7:00' },
    { name: 'Greedy Smurf', loggedHour: '8:00' },
    { name: 'Chef Smurf', loggedHour: '9:11' },
    { name: 'Vanity Smurf', loggedHour: '9:22' },
    { name: 'Handy Smurf', loggedHour: '9:33' },
    { name: 'Scaredy Smurf', loggedHour: '9:34' },
    { name: 'Tracker Smurf', loggedHour: '9:36' },
  ]);
  const [fever, setFever] = useState([
    99,
    98,
    90,
    100,
    99,
    90,
    100,
    100,
    90,
    90,
    100,
    100,
  ]);
  const [saturation, setSaturation] = useState([
    10,
    0,
    0,
    0,
    0,
    10,
    90,
    90,
    90,
    90,
    90,
    98,
  ]);
  const [breathsPerMin, setBreathsPerMin] = useState([
    50,
    22,
    33,
    22,
    44,
    55,
    66,
    77,
    66,
    55,
    44,
    33,
  ]);
  const [painLevel, setPainLevel] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]);
  const [bloodSugar, setBloodSugar] = useState([
    90,
    60,
    50,
    40,
    30,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
  ]);

  /*[
    {
      label: 'userName',
    },
    {
      label: 'Blood pressure',
      unit: 'mmHg',
      /!*  pattern: '[1-9]{1,3}|[1-9]{1,3}[/]|^[0-9]\\d{2}\\/\\d{1}$',*!/
      mask: '999/999',
    },
    {
      label: 'Pulse',

      /!*pattern: '[1-9]{1,2}',*!/
      mask: '99',
    },
    {
      label: 'Fever',
      /!*pattern:
        '[1-9]{1,2} | [1-9]{1,2}[.] | [1-9]{1,2}[.]| ^[0-9]\\d{2}\\.\\d{1}$',*!/
      mask: '99.9',
    },
    {
      label: 'Saturation',

      /!*pattern: '[1-9]{1,2}',*!/
      mask: '999%',
    },
    {
      label: 'Breaths per minute',

      /!*pattern: '[1-9]{1,2}',*!/
      mask: '99',
    },
    {
      label: 'Pain level',

      /!*pattern: '[1-9]{1,2}',*!/
      mask: '99',
    },
    {
      label: 'Blood sugar',

      /!*pattern: '[1-9]{1,2}',*!/
      mask: '999',
    },
  ];*/

  /*onst constantIndicatorsNormalizedData = {};
  constantIndicatorsNormalizedData['height'] = {
    label: 'Height',
    id: 'height',

    pattern: '[1-9]{1,3}',
  };
  constantIndicatorsNormalizedData['weight'] = {
    label: 'Weight',
    id: 'weight',

    pattern: '[1-9]{1,3}|[1-9]{1,3}[.]|^[0-9]\\d{2}\\.\\d{1}$',
  };*/

  const [indicators, setIndicators] = useState(null);
  const [constantIndicators, setConstantIndicators] = useState(null);
  const [variantIndicators, setVariantIndicators] = useState(null);
  const [variantIndicatorsNew, setVariantIndicatorsNew] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (!indicators) {
          const clinicIndicators = await getIndicatorsSettings();
          if (clinicIndicators) {
            setIndicators(clinicIndicators);

            let constantIndicatorsNormalizedData =
              clinicIndicators &&
              clinicIndicators['data'] &&
              clinicIndicators['data']['constant']
                ? clinicIndicators['data']['constant']
                : null;
            let constantIndicatorsUIData = DataHelpers.thickenTheConstantIndicators(
              {
                height,
                weight,
                setWeight,
                setHeight,
                constantIndicatorsNormalizedData,
              },
            );

            let variantIndicatorsNormalizedData =
              clinicIndicators &&
              clinicIndicators['data'] &&
              clinicIndicators['data']['variant']
                ? clinicIndicators['data']['variant']
                : null;

            let variantIndicatorUIData = DataHelpers.thickenTheVariantIndicators(
              {
                variantIndicatorsNormalizedData,
                userName,
                fever,
                pressure,
                saturation,
                painLevel,
                breathsPerMin,
                bloodSugar,
                pulse,
                setFever,
                setPressure,
                setSaturation,
                setPainLevel,
                setBreathsPerMin,
                setBloodSugar,
                setPulse,
                disabled: true,
                newRow: false,
                size: 0,
              },
            );

            let newVariantIndicatorsUIData = DataHelpers.thickenTheVariantIndicators(
              {
                variantIndicatorsNormalizedData,
                userName: userNameNew,
                fever: feverNew,
                pressure: pressureNew,
                saturation: saturationNew,
                painLevel: painLevelNew,
                breathsPerMin: breathsPerMinNew,
                bloodSugar: bloodSugarNew,
                pulse: pulseNew,
                setFever: setFeverNew,
                setPressure: setPressureNew,
                setSaturation: setSaturationNew,
                setPainLevel: setPainLevelNew,
                setBreathsPerMin: setBreathsPerMinNew,
                setBloodSugar: setBloodSugarNew,
                setPulse: setPulseNew,
                disabled: false,
                newRow: true,
                size: userName.length,
              },
            );
            setVariantIndicatorsNew(newVariantIndicatorsUIData);
            setVariantIndicators(variantIndicatorUIData);
            setConstantIndicators(constantIndicatorsUIData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  });

  return (
    <StyledTestsAndTreatments dir={languageDirection}>
      {constantIndicators ? (
        <ConstantIndicators
          constantIndicators={constantIndicators}
          setWeight={setWeight}
          setHeight={setHeight}
        />
      ) : null}
      {variantIndicators || variantIndicatorsNew ? (
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
                    ? variantIndicators.concat(variantIndicatorsNew)
                    : variantIndicators
                  : variantIndicators
                : null
            }
          />
        </React.Fragment>
      ) : null}

      {/*{encounter.status !== 'finished' ? (
        <StyledForm autoComplete='off'>
          <VariantIndicators variantIndicators={variantIndicatorsNew} />
        </StyledForm>
      ) : null}*/}
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
