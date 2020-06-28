//TestsAndTreatment

import { connect } from 'react-redux';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import ConstantIndicators from './ConstantIndicators';
import VariantIndicators from './VariantIndicators';
import * as DataHelpers from './Helpers/DataHelpers';
import { StyledTestsAndTreatments, StyledVariantTextField } from './Style';
import LabelWithHourComponent from './LabelWithHourComponent';
const TestsAndTreatments = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
}) => {
  const [height, setHeight] = useState('10');
  const [weight, setWeight] = useState('2');
  const [pressure, setPressure] = useState([
    10,
    10,
    20,
    10,
    30,
    50,
    90,
    20,
    30,
    40,
    10,
    20,
  ]);
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
  const constantIndicatorsNormalaizedData = [];
  const variantIndicatorsNormalaizedData = [
    {
      label: 'userName',
    },
    {
      label: 'Pressure',
      type: 'mmHg',
      pattern: '[1-9]{1,3}|[1-9]{1,3}[/]|^[0-9]\\d{2}\\/\\d{1}$',
    },
    {
      label: 'Pulse',

      pattern: '[1-9]{1,2}',
    },
    {
      label: 'Fever',
      pattern:
        '[1-9]{1,2} | [1-9]{1,2}[.] | [1-9]{1,2}[.]| ^[0-9]\\d{2}\\.\\d{1}$',
    },
    {
      label: 'Saturation',

      pattern: '[1-9]{1,2}',
    },
    {
      label: 'Breaths per minute',

      pattern: '[1-9]{1,2}',
    },
    {
      label: 'Pain level',

      pattern: '[1-9]{1,2}',
    },
    {
      label: 'Blood sugar',

      pattern: '[1-9]{1,2}',
    },
  ];

  const constantIndicatorsNormalizedData = {};
  constantIndicatorsNormalizedData['height'] = {
    label: 'Height',
    id: 'height',

    pattern: '[1-9]{1,3}',
  };
  constantIndicatorsNormalizedData['weight'] = {
    label: 'Weight',
    id: 'weight',

    pattern: '[1-9]{1,3}|[1-9]{1,3}[.]|^[0-9]\\d{2}\\.\\d{1}$',
  };
  const constantIndicators = DataHelpers.thickenTheConstantIndicators({
    height,
    weight,
    setWeight,
    setHeight,
    constantIndicatorsNormalizedData,
  });
  const variantIndicators = DataHelpers.thickenTheVariantIndicators({
    variantIndicatorsNormalaizedData,
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
  });
  return (
    <StyledTestsAndTreatments dir={languageDirection}>
      <ConstantIndicators
        constantIndicators={constantIndicators}
        setWeight={setWeight}
        setHeight={setHeight}
      />
      <VariantIndicators variantIndicators={variantIndicators} />
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
  };
};
export default connect(mapStateToProps, null)(TestsAndTreatments);
