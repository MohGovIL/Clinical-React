//this array is created after normalization of data retrieved from FHIR
import { StyledConstantTextField, StyledVariantTextField } from '../Style';
import * as ComponentsViewHelpers from './ViewHelpers';
import LabelWithHourComponent from '../LabelWithHourComponent';
import React from 'react';
import FormattedInputs from '../../../Generic/MaskedControllers/FormattedInputs/FormattedInputs';
function mergeMultipleConstants(
  variantIndicatorsNormalizedData,
  keyOne,
  keyTwo,
  seperator,
) {
  let keysPlaces = [];
  for (let i = 0; i < variantIndicatorsNormalizedData.length; i++) {
    if (
      variantIndicatorsNormalizedData[i]['description'] === keyOne ||
      variantIndicatorsNormalizedData[i]['description'] === keyTwo
    ) {
      keysPlaces.push(i);
    }
  }
  if (keysPlaces.length > 0) {
    let variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['description']
    }${seperator}${
      variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['description']
    }`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['unit']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['unit']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['mask']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['mask']}`;
    variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code'] = `${
      variantIndicatorsNormalizedDataTemp[keysPlaces[0]]['code']
    }${seperator}${variantIndicatorsNormalizedDataTemp[keysPlaces[1]]['code']}`;

    variantIndicatorsNormalizedDataTemp.splice(keysPlaces[1], 1);

    return variantIndicatorsNormalizedDataTemp;
  }
  return variantIndicatorsNormalizedData;
}

export const thickenTheConstantIndicators = ({
  height,
  weight,
  setWeight,
  setHeight,
  constantIndicatorsNormalizedData,
}) => {
  let constantIndicators = [];
  if (constantIndicatorsNormalizedData) {
    for (const [key, dataset] of Object.entries(
      constantIndicatorsNormalizedData,
    )) {
      switch (dataset.label) {
        case 'Height':
          {
            dataset.value = height; //get from system value set constants
            dataset.componentType = StyledConstantTextField;
            dataset.handleOnChange = (e) =>
              ComponentsViewHelpers.handleConstantVariablesChange({
                value: e.target.value,
                valid: e.target.validity.valid,
                current: weight,
                setterFunction: setHeight,
              });
          }
          break;
        case 'Weight': {
          dataset.value = weight; //get from system value set constants
          dataset.componentType = StyledConstantTextField;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleConstantVariablesChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              current: height,
              setterFunction: setWeight,
            });
        }
      }
      constantIndicators.push(dataset);
    }
  }
  return constantIndicators;
};

export const thickenTheVariantIndicators = ({
  variantIndicatorsNormalizedData: variantIndicatorsNormalizedData,
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
  disabled,
  newRow,
  size,
  setVariantIndicators,
}) => {
  let variantIndicators = [];
  let sizeTemp = size;
  if (!variantIndicatorsNormalizedData) return [];
  for (let i = 0; i < userName.length; i++) {
    let variantIndicatorsNormalizedDataTemp = JSON.parse(
      JSON.stringify(variantIndicatorsNormalizedData),
    );
    variantIndicatorsNormalizedDataTemp.unshift({ label: 'userName' });
    sizeTemp++;
    /*let variantIndicatorsNormalaizedDataTemp = [
      ...variantIndicatorsNormalizedData,
    ];*/

    variantIndicatorsNormalizedDataTemp = mergeMultipleConstants(
      variantIndicatorsNormalizedDataTemp,
      'Diastolic blood pressure',
      'Systolic blood pressure',
      '/',
    );

    for (const [key, dataset] of Object.entries(
      variantIndicatorsNormalizedDataTemp,
    )) {
      dataset.disabled = disabled;
      dataset.newRow = newRow;
      dataset.idTemp = i;
      switch (dataset.label) {
        case 'userName':
          dataset.componentType = LabelWithHourComponent;
          dataset.label =
            userName && userName[i] && userName[i]['name']
              ? userName[i]['name']
              : '';

          dataset.value =
            userName && userName[i] && userName[i]['loggedHour']
              ? newRow
                ? ''
                : userName[i]['loggedHour']
              : '';
          dataset.id = `user_name_${sizeTemp > 0 ? sizeTemp : i}`;
          break;
        case 'Blood pressure':
          dataset.value = pressure && pressure[i] ? pressure[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: [...pressure],
              setterFunction: setPressure,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 1,
            });
          dataset.id = `blood_pressure_${sizeTemp > 0 ? sizeTemp : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/

          break;
        case 'Pulse':
          dataset.value = pulse && pulse[i] ? pulse[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: pulse,
              setterFunction: setPulse,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 2,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `pulse_${sizeTemp > 0 ? sizeTemp : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/

          break;
        case 'Fever':
          /*
          * Hot
            44 °C (111.2 °F) or more – Almost certainly death will occur; however, people have been known to survive up to 46.5 °C (115.7 °F).[23][24]
            43 °C (109.4 °F) – Normally death, or there may be serious brain damage, continuous convulsions and shock. Cardio-respiratory collapse will likely occur.
            42 °C (107.6 °F) – Subject may turn pale or remain flushed and red. They may become comatose, be in severe delirium, vomiting, and convulsions can occur. Blood pressure may be high or low and heart rate will be very fast.
            41 °C (105.8 °F) – (Medical emergency) – Fainting, vomiting, severe headache, dizziness, confusion, hallucinations, delirium and drowsiness can occur. There may also be palpitations and breathlessness.
            40 °C (104 °F) – Fainting, dehydration, weakness, vomiting, headache, breathlessness and dizziness may occur as well as profuse sweating. Starts to be life-threatening.
            39 °C (102.2 °F) – Severe sweating, flushed and red. Fast heart rate and breathlessness. There may be exhaustion accompanying this. Children and people with epilepsy may be very likely to get convulsions at this point.
            38 °C (100.4 °F) – (Classed as hyperthermia if not caused by a fever) – Feeling hot, sweating, feeling thirsty, feeling very uncomfortable, slightly hungry. If this is caused by fever, there may also be chills.
            Normal
            36.5–37.5 °C (97.7–99.5 °F) is a typically reported range for normal body temperature.[8]
            Cold
            36 °C (96.8 °F) – Feeling cold, mild to moderate shivering. Body temperature may drop this low during sleep. May be a normal body temperature.
            35 °C (95 °F) – (Hypothermia is less than 35 °C (95 °F)) – Intense shivering, numbness and bluish/grayness of the skin. There is the possibility of heart irritability.
            34 °C (93.2 °F) – Severe shivering, loss of movement of fingers, blueness, and confusion. Some behavioral changes may take place.
            33 °C (91.4 °F) – Moderate to severe confusion, sleepiness, depressed reflexes, progressive loss of shivering, slow heartbeat, shallow breathing. Shivering may stop. Subject may be unresponsive to certain stimuli.
            32 °C (89.6 °F) – (Medical emergency) – Hallucinations, delirium, complete confusion, extreme sleepiness that is progressively becoming comatose. Shivering is absent (subject may even think they are hot). Reflex may be absent or very slight.
            31 °C (87.8 °F) – Comatose, very rarely conscious. No or slight reflexes. Very shallow breathing and slow heart rate. Possibility of serious heart rhythm problems.
            28 °C (82.4 °F) – Severe heart rhythm disturbances are likely and breathing may stop at any time. The person may appear to be dead.
            24–26 °C (75.2–78.8 °F) or less – Death usually occurs due to irregular heart beat or respiratory arrest; however, some patients have been known to survive with body temperatures as low as 13.7 °C (56.7 °F).[25]
          * */
          dataset.value = fever && fever[i] ? fever[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: fever,
              setterFunction: setFever,
              id: i,
              paddWithZero: true,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 3,
              min: 24,
              max: 44,
              mod: 100,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `fever_${sizeTemp > 0 ? sizeTemp : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Saturation':
          dataset.value = saturation && saturation[i] ? saturation[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: saturation,
              setterFunction: setSaturation,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 4,
              min: 0,
              max: 100,
              mod: 100,
            });
          dataset.id = `saturation_${sizeTemp > 0 ? sizeTemp : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        /*
          * Average resting respiratory rates by age are:[10][11]

          birth to 6 weeks: 30–40 breaths per minute
          6 months: 25–40 breaths per minute
          3 years: 20–30 breaths per minute
          6 years: 18–25 breaths per minute
          10 years: 17–23 breaths per minute
          Adults: 12–18 breaths per minute[9]
          Elderly ≥ 65 years old: 12–28 breaths per minute.[12]
          Elderly ≥ 80 years old: 10-30 breaths per minute.[12]*/
        case 'Breaths per minute':
          dataset.value =
            breathsPerMin && breathsPerMin[i] ? breathsPerMin[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: breathsPerMin,
              setterFunction: setBreathsPerMin,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 5,
              min: 12,
              max: 30,
              mod: 100,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `breaths_per_min_${sizeTemp > 0 ? sizeTemp : i}`;
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Pain level':
          /*
          *
          *
Comparative 0 to 10 Pain Scale
Printable pain scale assessment chart that can be printed and used in order for people and kids to be able to point to the current pain level they are feeling.
Printable pain scale assessment chart that can be printed and used in order for people and kids to be able to point to the current pain level they are feeling.

No Pain
No pain icon
No pain icon
Pain Level 0

No pain at all, you feel perfectly normal.

Minor Pain Levels
Mild pain icon
Mild pain icon
Minor pain levels generally do not interfere with most day to day activities. Able to adapt to pain psychologically and with medication or devices such as cushions.

Pain Level 1

Pain level one means very light barely noticeable pain, like a mosquito bite or a poison ivy itch. Most of the time you never think about the pain.

Pain Level 2

Pain level two is discomforting minor pain, like lightly pinching the fold of skin between the thumb and first finger with the other hand, using the fingernails. People can react differently to this self-test.
Pain Level 3

Pain level three is a tolerable, but very noticeable pain, like an accidental cut, a blow to the nose causing a bloody nose, or a doctor giving you an injection. The pain is not so strong that you cannot get used to it. Eventually, most of the time you don't notice the pain, as you have adapted to it.

Moderate Pain Levels
Moderate pain icon
Moderate pain icon
Moderate pain levels interfere with many daily activities. These pain levels usually require some lifestyle changes but you can remain independent, however, you are unable to adapt to the pain.

Pain Level 4

Pain level four is a distressing strong and deep pain, like an average toothache, the initial pain from a bee sting, or minor trauma to part of the body, such as stubbing your toe real hard. So strong you notice the pain all the time and cannot completely adapt. This pain level can be simulated by pinching the fold of skin between the thumb and first finger with the other hand, using the fingernails, and squeezing real hard. Note how the simulated pain is initially piercing but becomes dull after that.

Pain Level 5

Pain level five is a very distressing strong, deep, piercing pain, such as a sprained ankle when you stand on it wrong or mild back pain. Not only do you notice the pain all the time, you are now so preoccupied with managing it that you normal lifestyle is curtailed. Temporary personality disorders are frequent.

Pain Level 6

Pain level six is an intense pain that is strong, deep and piercing. The pain is so strong it seems to partially dominate your senses, causing you to think somewhat unclearly. At this point you begin to have trouble holding a job or maintaining normal social relationships. Comparable to a bad non-migraine headache combined with several bee stings, or a bad back pain

Severe Pain Levels
Severe pain icon
Severe pain icon
Severe pain levels, meaning you are unable to engage in your normal activities. The patient is considered disabled and unable to function independently.

Pain Level 7

Pain level seven consists of very intense pain. Much the same as level 6 except the pain completely dominates your senses, causing you to think unclearly about half the time. At this point you are effectively disabled and frequently cannot live alone. Comparable to an average migraine headache.

Very severe pain icon
Very severe pain icon
Pain Level 8

Pain level eight is horrible pain. The pain you feel is so intense you can no longer think clearly at all, and have often undergone severe personality change if the pain has been present for a long time. Suicide is frequently contemplated and sometimes tried. Comparable to childbirth or a real bad migraine headache.

Pain Level 9

Pain level nine is excruciating pain, so intense you cannot tolerate it and demand pain killers or surgery, no matter what the side effects or risk. If this doesn't work, suicide is frequent since there is no more joy in life whatsoever. Comparable to throat cancer.

Terrible pain icon
Terrible pain icon
Pain Level 10

Pain level ten means unimaginable pain. This pain level is so intense you will go unconscious shortly. Most people have never experienced this level of pain. Those who have suffered a severe accident, such as a crushed hand, and lost consciousness as a result of the
          * */
          dataset.value = painLevel && painLevel[i] ? painLevel[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: painLevel,
              setterFunction: setPainLevel,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 6,
              min: 0,
              max: 10,
            });
          dataset.id = `pain_level_${sizeTemp > 0 ? sizeTemp : i}`;
          dataset.componenttype = 'textFieldWithMask';
          /*dataset['aria-describedby'] = dataset.mask;*/
          break;
        case 'Blood sugar':
          dataset.value = bloodSugar && bloodSugar[i] ? bloodSugar[i] : '';
          dataset.componentType = disabled
            ? StyledVariantTextField
            : FormattedInputs;
          dataset.handleOnChange = (e) =>
            ComponentsViewHelpers.handleVariantColumnChange({
              value: e.target.value,
              valid: e.target.validity.valid,
              parentArr: bloodSugar,
              setterFunction: setBloodSugar,
              id: i,
              setVariantIndicators: newRow ? setVariantIndicators : null,
              newRow,
              variantIndicators,
              column: 7,
            });
          dataset.componenttype = 'textFieldWithMask';
          dataset.id = `blood_sugar_${sizeTemp > 0 ? sizeTemp : i}`;

          break;
      }
    }
    variantIndicators.push(variantIndicatorsNormalizedDataTemp);
  }

  return variantIndicators;
};

export const thickenTheData = ({
  indicators,
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
  height,
  weight,
  setWeight,
  setHeight,
  userNameNew,
  feverNew,
  pressureNew,
  saturationNew,
  painLevelNew,
  breathsPerMinNew,
  bloodSugarNew,
  pulseNew,
  setFeverNew,
  setPressureNew,
  setSaturationNew,
  setPainLevelNew,
  setBreathsPerMinNew,
  setBloodSugarNew,
  setPulseNew,
  setVariantIndicatorsNew,
  setVariantIndicators,
  setConstantIndicators,
}) => {
  let constantIndicatorsNormalizedData =
    indicators && indicators['data'] && indicators['data']['constant']
      ? indicators['data']['constant']
      : null;
  let constantIndicatorsUIData = thickenTheConstantIndicators({
    height,
    weight,
    setWeight,
    setHeight,
    constantIndicatorsNormalizedData,
    setConstantIndicators,
  });

  let variantIndicatorsNormalizedData =
    indicators && indicators['data'] && indicators['data']['variant']
      ? indicators['data']['variant']
      : null;

  let variantIndicatorUIData = thickenTheVariantIndicators({
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
    setVariantIndicators: setVariantIndicators,
  });

  let newVariantIndicatorsUIData = thickenTheVariantIndicators({
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
    setVariantIndicators: setVariantIndicatorsNew,
  });
  setVariantIndicatorsNew(newVariantIndicatorsUIData);
  setVariantIndicators(variantIndicatorUIData);
  setConstantIndicators(constantIndicatorsUIData);
};
