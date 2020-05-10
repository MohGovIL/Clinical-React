// Other
import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import { getCellPhoneRegexPattern } from 'Utils/Helpers/validation/patterns';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
// Helpers
import { normalizeFhirOrganization } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirOrganization';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import normalizeFhirRelatedPerson from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirRelatedPerson';
import { calculateFileSize } from 'Utils/Helpers/calculateFileSize';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';
import { splitBase_64 } from 'Utils/Helpers/splitBase_64';
// Styles
import {
  StyledAutoComplete,
  StyledButton,
  StyledChip,
  StyledDivider,
  StyledForm,
  StyledFormGroup,
  StyledKeyboardDatePicker,
  StyledPatientDetails,
  StyledTextField,
} from './Style';
import { useTranslation } from 'react-i18next';
// Assets, Customized elements
import Title from 'Assets/Elements/Title';
import ListboxComponent from './ListboxComponent/index';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import ChipWithImage from 'Assets/Elements/StyledChip';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';

// Material-UI Icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import CheckBox from '@material-ui/icons/CheckBox';
import Close from '@material-ui/icons/Close';
import CheckBoxOutlineBlankOutlined from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import Scanner from '@material-ui/icons/Scanner';
import AddCircle from '@material-ui/icons/AddCircle';
// Material-UI core, lab, pickers components
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// APIs
import { getCities, getStreets } from 'Utils/Services/API';
import moment from 'moment';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirDocumentReference from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';

const PatientDetailsBlock = ({
  patientData,
  edit_mode,
  encounterData,
  formatDate,
}) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    errors,
    setValue,
    register,
    triggerValidation,
    formState,
  } = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });
  const { dirty } = formState;
  //Sending the form
  const [requiredErrors, setRequiredErrors] = useState({
    selectTest: '',
    commitmentAndPaymentReferenceForPaymentCommitment: '',
    commitmentAndPaymentCommitmentDate: '',
    commitmentAndPaymentCommitmentValidity: '',
    commitmentAndPaymentDoctorsName: '',
    commitmentAndPaymentDoctorsLicense: '',
    ReferralFile: '',
    CommitmentFile: '',
  });
  const onSubmit = async (data) => {
    try {
      // const clear = isRequiredValidation(data);
      console.log(errors);
      if (true) {
        // const APIsArray = [];
        //   //Updating patient
        //   let patientPatchParams = {};
        //   if (contactInformationTabValue === 0) {
        //     if (data.addressCity) {
        //       patientPatchParams['city'] = addressCity.code;
        //     }
        //     if (data.addressStreet) {
        //       patientPatchParams['streetName'] = addressStreet.code;
        //     }
        //     if (data.addressStreetNumber) {
        //       patientPatchParams['streetNumber'] = data.addressStreetNumber;
        //     }
        //     if (data.addressPostalCode) {
        //       patientPatchParams['postalCode'] = data.addressPostalCode;
        //     }
        //   } else {
        //     if (data.POBoxCity) {
        //       patientPatchParams['city'] = POBoxCity.code;
        //     }
        //     if (data.POBox) {
        //       patientPatchParams['POBox'] = data.POBox;
        //     }
        //     if (data.POBoxPostalCode) {
        //       patientPatchParams['postalCode'] = data.POBoxPostalCode;
        //     }
        //   }
        //   APIsArray.push(
        //     FHIR('Patient', 'doWork', {
        //       functionName: 'updatePatient',
        //       functionParams: { patientPatchParams, patientId: patientData.id },
        //     }),
        //   );
        //   //Updating/Creating relatedPerson
        //   if (encounterData.appointment) {
        //     APIsArray.push(
        //       FHIR('Appointment', 'doWork', {
        //         functionName: 'updateAppointment',
        //         functionParams: {
        //           functionParams: {
        //             appointmentId: encounterData.appointment,
        //             appointmentParams: {
        //               status: 'arrived',
        //             },
        //           },
        //         },
        //       }),
        //     );
        //   }
        //   if (data.isEscorted) {
        //     let relatedPersonParams = {};
        //     if (encounter.relatedPerson) {
        //       if (
        //         data.escortName !== relatedPerson.name &&
        //         data.escortMobilePhone !== relatedPerson.mobilePhone
        //       ) {
        //         relatedPersonParams['name'] = data.escortName;
        //         relatedPersonParams['mobilePhone'] = data.escortMobilePhone;
        //         APIsArray.push(
        //           FHIR('RelatedPerson', 'doWork', {
        //             // eslint-disable-next-line no-use-before-define
        //             functionName: 'updateRelatedPerson',
        //             functionParams: {
        //               relatedPersonParams,
        //               // eslint-disable-next-line no-use-before-define
        //               relatedPersonId: relatedPerson.id,
        //             },
        //           }),
        //         );
        //       }
        //     } else {
        //       if (data.escortName) {
        //         relatedPersonParams['name'] = data.escortName;
        //       }
        //       if (data.escortMobilePhone) {
        //         relatedPersonParams['mobilePhone'] = data.escortMobilePhone;
        //       }
        //       APIsArray.push(
        //         FHIR('RelatedPerson', 'doWork', {
        //           // eslint-disable-next-line no-use-before-define
        //           functionName: 'createRelatedPerson',
        //           functionParams: {
        //             relatedPersonParams,
        //           },
        //         }),
        //       );
        //     }
        //   }
        // if (Object.values(questionnaireResponse).length) {
        //   APIsArray.push(FHIR('QuestionnaireResponse', 'doWork', {
        //     functionName: 'patchQuestionnaireResponse',
        //     questionnaireResponseId: questionnaireResponse.id,
        //     questionnaireResponseParams: {
        //       item: [
        //         {
        //           linkId: '1',
        //           text: 'Commitment number',
        //           answer: [
        //             {
        //               valueInteger: data.commitmentAndPaymentReferenceForPaymentCommitment
        //             }
        //           ]
        //         },
        //         {
        //           linkId: '2',
        //           text: 'Commitment date',
        //           answer: [
        //             {
        //               valueDate: data.commitmentAndPaymentCommitmentDate
        //             }
        //           ]
        //         },
        //         {
        //           linkId: '3',
        //           text: 'Commitment expiration date',
        //           answer: [
        //             {
        //               valueDate: data.commitmentAndPaymentCommitmentValidity
        //             }
        //           ]
        //         },
        //         {
        //           linkId: '4',
        //           text: 'Signing doctor',
        //           answer: [
        //             {
        //               valueString: data.commitmentAndPaymentDoctorsName
        //             }
        //           ]
        //         },
        //         {
        //           linkId: '5',
        //           text: 'doctor license number',
        //           answer: [
        //             {
        //               valueInteger: data.commitmentAndPaymentDoctorsLicense
        //             }
        //           ]
        //         },
        //       ]
        //     }
        //   }))
        // } else {
        //   APIsArray.push(FHIR('QuestionnaireResponse', 'doWork', {
        //     functionName: 'createQuestionnaireResponse',
        //     functionParams: {
        //       questionnaireResponse: {
        //         questionnaire: questionnaireId,
        //         status: 'completed',
        //         patient: patientData.id,
        //         encounter: encounterData.id,
        //         authored: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        //         source: patientData.id,
        //         item: [
        //           {
        //             linkId: '1',
        //             text: 'Commitment number',
        //             answer: [
        //               {
        //                 valueInteger: data.commitmentAndPaymentReferenceForPaymentCommitment
        //               }
        //             ]
        //           },
        //           {
        //             linkId: '2',
        //             text: 'Commitment date',
        //             answer: [
        //               {
        //                 valueDate: data.commitmentAndPaymentCommitmentDate
        //               }
        //             ]
        //           },
        //           {
        //             linkId: '3',
        //             text: 'Commitment expiration date',
        //             answer: [
        //               {
        //                 valueDate: data.commitmentAndPaymentCommitmentValidity
        //               }
        //             ]
        //           },
        //           {
        //             linkId: '4',
        //             text: 'Signing doctor',
        //             answer: [
        //               {
        //                 valueString: data.commitmentAndPaymentDoctorsName
        //               }
        //             ]
        //           },
        //           {
        //             linkId: '5',
        //             text: 'doctor license number',
        //             answer: [
        //               {
        //                 valueInteger: data.commitmentAndPaymentDoctorsLicense
        //               }
        //             ]
        //           },
        //         ]
        //       },
        //     },
        //   }));
        // }
        // const promises = await Promise.all(APIsArray);
        // const encounter = { ...encounterData };
        // if (data.isEscorted) {
        //   if (!encounter.relatedPerson) {
        //     const NewRelatedPerson = normalizeFhirRelatedPerson(promises[3]);
        //     encounter['relatedPerson'] = NewRelatedPerson.id;
        //   }
        // }
        // if (selectedServicesType.length) {
        //   encounter.examinationCode = selectedServicesType.map((option) => {
        //     return option.reasonCode.code;
        //   });
        //   encounter.serviceTypeCode = selectedServicesType[0].serviceType.code;
        // } else {
        //   encounter.serviceType = '';
        //   encounter.examinationCode = '';
        // }
        // if (encounter.status === 'planned') {
        //  encounter.status = 'arrived';
        // }
        // await FHIR('Encounter', 'doWork', {
        //   functionName: 'updateEncounter',
        //   encounterId: encounter.id,
        //   encounter: encounter,
        // });
        const APIsFILE = [];
        const referral_64Obj = splitBase_64(referralFile_64);
        const documentReferenceReferral = {
          encounter: encounterData.id,
          patient: patientData.id,
          contentType: referral_64Obj.type,
          data: referral_64Obj.data,
          categoryCode: '2',
          url: referralFile.name,
        };
        APIsFILE.push(
          FHIR('DocumentReference', 'doWork', {
            documentReference: documentReferenceReferral,
            functionName: 'createDocumentReference',
          }),
        );

        const commitment_64Obj = splitBase_64(commitmentFile_64);
        const documentReferenceCommitment = {
          encounter: encounterData.id,
          patient: patientData.id,
          contentType: commitment_64Obj.type,
          data: commitment_64Obj.data,
          categoryCode: '2',
          url: commitmentFile.name,
        };
        APIsFILE.push(
          FHIR('DocumentReference', 'doWork', {
            documentReference: documentReferenceCommitment,
            functionName: 'createDocumentReference',
          }),
        );
        if (additionalDocumentFile_64.length) {
          const additional_64Obj = splitBase_64(additionalDocumentFile_64);
          const documentReferenceAdditionalDocument = {
            encounter: encounterData.id,
            patient: patientData.id,
            contentType: additional_64Obj.type,
            data: additional_64Obj.data,
            categoryCode: '2',
            url: additionalDocumentFile.name,
          };
          APIsFILE.push(
            FHIR('DocumentReference', 'doWork', {
              documentReference: documentReferenceAdditionalDocument,
              functionName: 'createDocumentReference',
            }),
          );
        }
        await Promise.all(APIsFILE);
      } else {
        triggerValidation();
      }
      return;
    } catch (error) {
      console.log(error);
    }

    // 0. Run isRequired validation - done but didn't check
    // 1. Check if the encounter has ref to any appointment if there is any ref change their status to 'arrived'
    // 2. Change the encounter status to arrived ONLY if the current status of the encounter is 'planned'
    // 3. Save the commitment data
    // 4. Go back to PatientTracking route
  };
  const requiredFields = {
    selectTest: {
      name: 'selectTest',
      required: function (data) {
        return (
          data[this.name] &&
          data[this.name] === '' &&
          selectedServicesType.length > 0
        );
      },
    },
    commitmentAndPaymentReferenceForPaymentCommitment: {
      name: 'commitmentAndPaymentReferenceForPaymentCommitment',
      linkId: '1',
      codeText: 'Commitment number',
      required: function (data) {
        return data[this.name] && data[this.name].trim().length;
      },
    },
    commitmentAndPaymentCommitmentDate: {
      name: 'commitmentAndPaymentCommitmentDate',
      linkId: '2',
      codeText: 'Commitment date',
      required: function (data) {
        return (
          data[this.name] &&
          moment(data[this.name]).toString().length > 0 &&
          moment(data[this.name]).isValid
        );
      },
    },
    commitmentAndPaymentCommitmentValidity: {
      name: 'commitmentAndPaymentCommitmentValidity',
      linkId: '3',
      codeText: 'Commitment expiration date',
      required: function (data) {
        return (
          data[this.name] &&
          moment(data[this.name]).toString().length > 0 &&
          moment(data[this.name]).isValid
        );
      },
    },
    commitmentAndPaymentDoctorsName: {
      name: 'commitmentAndPaymentDoctorsName',
      linkId: '4',
      codeText: 'Signing doctor',
      required: function (data) {
        return data[this.name] && data[this.name].trim().length;
      },
    },
    commitmentAndPaymentDoctorsLicense: {
      name: 'commitmentAndPaymentDoctorsLicense',
      linkId: '5',
      codeText: 'doctor license number',
      required: function (data) {
        return data[this.name] && data[this.name].trim().length;
      },
    },
    ReferralFile: {
      name: 'ReferralFile',
      linkId: '',
      required: function (data) {
        return data[this.name] && Object.values(referralFile).length > 0;
      },
    },
    CommitmentFile: {
      name: 'CommitmentFile',
      linkId: '',
      required: function (data) {
        return data[this.name] && Object.values(commitmentFile).length > 0;
      },
    },
  };
  const isRequiredValidation = (data) => {
    let clean = true;
    for (const fieldKey in requiredFields) {
      if (requiredFields.hasOwnProperty(fieldKey)) {
        if (!requiredFields[fieldKey].required(data)) {
          setRequiredErrors((prevState) => {
            const cloneState = { ...prevState };
            cloneState[requiredFields[fieldKey].name] = t(
              'This value is required',
            );
            return cloneState;
          });
          // setError(
          //   requiredFields[fieldKey].name,
          //   'required',
          //   'This field is required',
          // );
          clean = false;
        }
      }
    }
    return clean;
  };

  // Escorted Information
  // Escorted Information - vars
  const [isEscorted, setIsEscorted] = useState(false);
  const [relatedPerson, setRelatedPerson] = useState({});
  // Escorted Information - functions
  const isEscortedSwitchOnChangeHandle = () => {
    setIsEscorted((prevState) => {
      setValue('isEscorted', !prevState);
      return !prevState;
    });
  };

  // Contact Information
  // Contact Information - cities var
  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const loadingCities = citiesOpen && cities.length === 0;
  // Contact Information - streets var
  const [streets, setStreets] = useState([]);
  const [streetsOpen, setStreetsOpen] = useState(false);
  const loadingStreets = streetsOpen && streets.length === 0;
  // Contact Information - tabs var
  const [contactInformationTabValue, setContactInformationTabValue] = useState(
    0,
  );
  // Contact Information - tabs function
  const contactInformationTabValueChangeHandler = (event, newValue) => {
    setContactInformationTabValue(newValue);
  };
  // Contact Information - address city - var
  const [addressCity, setAddressCity] = useState({});
  const [addressStreet, setAddressStreet] = useState({});
  // Contact Information - PObox city - var
  const [POBoxCity, setPOBoxCity] = useState({});
  // Contact Information - functions / useEffect
  // Contact Information - functions / useEffect - reset cities and streets
  useEffect(() => {
    if (!citiesOpen) {
      setCities([]);
    }
    if (!streetsOpen) {
      setStreets([]);
    }
    // if (!servicesTypeOpen) {
    //   setPendingValue([]);
    // }
  }, [citiesOpen, streetsOpen]);
  // Contact Information - functions / useEffect - loading cities
  useEffect(() => {
    let active = true;

    if (!loadingCities) {
      return undefined;
    }

    (async () => {
      try {
        const cities = await getCities();
        if (active) {
          setCities(
            Object.keys(cities.data).map((cityKey) => {
              let cityObj = {};
              cityObj.code = cities.data[cityKey];
              cityObj.name = t(cities.data[cityKey]);

              return cityObj;
            }),
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingCities]);
  // Contact Information - functions / useEffect - loading streets
  useEffect(() => {
    let active = true;

    if (!loadingStreets) {
      return undefined;
    }

    (async () => {
      try {
        const streets = await getStreets(addressCity.code.split('_')[1]);
        if (active) {
          if (Object.keys(streets.data).length) {
            setStreets(
              Object.keys(streets.data).map((streetKey) => {
                let streetObj = {};
                streetObj.code = streets.data[streetKey];
                streetObj.name = t(streets.data[streetKey]);

                return streetObj;
              }),
            );
          } else {
            const emptyResultsObj = {
              code: 'no_result',
              name: t('No Results'),
            };
            const emptyResults = [emptyResultsObj];
            setStreets(emptyResults);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingStreets]);

  // Requested service
  // Requested service - is urgent - vars
  const [isUrgent, setIsUrgent] = useState(false);
  // Requested service - is urgent - functions
  const isUrgentSwitchOnChangeHandler = () => {
    setIsUrgent((prevState) => !prevState);
  };
  // Requested service - select examination - vars
  const [selectedServicesType, setSelectedServicesType] = useState([]);
  const [pendingValue, setPendingValue] = useState([]);
  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);

  const [HMO, setHMO] = useState({});

  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;
  const selectTestRef = React.useRef();
  // Requested service - select examination - functions / useEffect
  const selectExaminationOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };
  const selectExaminationOnOpenHandler = () => {
    setPendingValue(selectedServicesType);
    setServicesTypeOpen(true);
  };
  const selectExaminationOnCloseHandler = () => {
    setServicesTypeOpen(false);
  };
  const filterOptions = (options, { inputValue }) => {
    if (pendingValue.length) {
      options = matchSorter(options, pendingValue[0].serviceType.code, {
        keys: ['serviceType.code'],
      });
    }
    return matchSorter(options, inputValue, {
      keys: [
        (item) => t(item.reasonCode.name),
        'reasonCode.code',
        (item) => t(item.serviceType.name),
      ],
    });
  };
  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        const serviceTypeResponse = await getValueSet('service_types');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            serviceTypeResponse.data.expansion.contains.map((serviceType) => {
              const normalizedServiceType = normalizeFhirValueSet(serviceType);
              servicesTypeObj[normalizedServiceType.code] = {
                ...normalizedServiceType,
              };
              return getValueSet(`reason_codes_${normalizedServiceType.code}`);
            }),
          );

          for (
            let reasonsIndex = 0;
            reasonsIndex < allReasonsCode.length;
            reasonsIndex++
          ) {
            allReasonsCode[reasonsIndex].data.expansion.contains.forEach(
              (reasonCode) => {
                const optionObj = {};
                optionObj['serviceType'] = {
                  ...servicesTypeObj[
                    allReasonsCode[reasonsIndex].data.id.split('_')[2]
                  ],
                };
                optionObj['reasonCode'] = normalizeFhirValueSet(reasonCode);
                options.push(optionObj);
              },
            );
          }
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
  const unFocusSelectTest = () => {
    selectTestRef.current.blur();
    // Should work don't know why it doesn't work. This function is to close the listBox in the autoComplete
  };
  // Requested service - select examination - chips - functions
  const chipOnDeleteHandler = (chipToDeleteIndex) => () => {
    const filteredSelectedServicesType = selectedServicesType.filter(
      (_, selectedIndex) => chipToDeleteIndex !== selectedIndex,
    );
    setSelectedServicesType(filteredSelectedServicesType);
  };
  // Commitment And Payment - vars
  const [questionnaireResponse, setQuestionnaireResponse] = useState({});
  const [questionnaireId, setQuestionnaireId] = useState('');
  const [
    commitmentAndPaymentCommitmentDate,
    setCommitmentAndPaymentCommitmentDate,
  ] = useState(new Date());
  const [
    commitmentAndPaymentCommitmentValidity,
    setCommitmentAndPaymentCommitmentValidity,
  ] = useState(new Date());
  const [
    commitmentAndPaymentTabValue,
    setCommitmentAndPaymentTabValue,
  ] = useState(0);
  // Commitment And Payment - functions
  const validateDate = (date, type) => {
    switch (type) {
      case 'before':
        return moment(date).isSameOrBefore(moment(), 'day');

      case 'after':
        return moment(date).isSameOrAfter(moment(), 'day');

      default:
        return false;
    }
  };
  const dateOnChangeHandler = (date, valueName, set) => {
    try {
      setValue(valueName, date, true);
      set(date);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };
  const setCommitmentAndPaymentTabValueChangeHandler = (event, newValue) => {
    setCommitmentAndPaymentTabValue(newValue);
  };

  // Files scan
  // Files scan - vars
  // Files scan - vars - states
  const [referralFile_64, setReferralFile_64] = useState('');
  const [commitmentFile_64, setCommitmentFile_64] = useState('');
  const [additionalDocumentFile_64, setAdditionalDocumentFile_64] = useState(
    '',
  );
  const [documents, setDocuments] = useState([]);
  const [referralFile, setReferralFile] = useState({});
  const [commitmentFile, setCommitmentFile] = useState({});
  const [additionalDocumentFile, setAdditionalDocumentFile] = useState({});
  const [numOfAdditionalDocument, setNumOfAdditionalDocument] = useState([]);
  const [
    nameOfAdditionalDocumentFile,
    setNameOfAdditionalDocumentFile,
  ] = useState('');
  // Files scan - vars - refs
  const referralRef = React.useRef();
  const commitmentRef = React.useRef();
  const additionalDocumentRef = React.useRef();
  // Files scan - vars - globals
  const FILES_OBJ = { type: 'MB', valueInBytes: 1000000, maxSize: 2, fix: 1 };
  // Files scan - functions
  async function onChangeFileHandler(ref, setState, fileName) {
    const files = ref.current.files;
    const [BoolAnswer, SizeInMB] = calculateFileSize(
      files[files.length - 1].size,
      FILES_OBJ.valueInBytes,
      FILES_OBJ.fix,
      FILES_OBJ.maxSize,
    );
    if (!BoolAnswer) {
      const fileObject = {};
      const reader = new FileReader();
      reader.onload = (event) => {
        if (fileName === 'Referral') {
          setReferralFile_64(event.target.result);
        } else if (fileName === 'Commitment') {
          setCommitmentFile_64(event.target.result);
        } else {
          setAdditionalDocumentFile_64(event.target.result);
        }
      };
      reader.readAsDataURL(ref.current.files[0]);
      fileObject['name'] = `${fileName}_${moment().format(
        'L',
      )}_${moment().format('HH:mm')}_${files[files.length - 1].name}`;
      fileObject['size'] = SizeInMB;
      setValue(`${fileName}File`, fileObject.name, true);
      setState({ ...fileObject });
    } else {
      ref.current.value = '';
    }
  }
  const onClickFileHandler = (event, ref) => {
    event.stopPropagation();
    const objUrl = URL.createObjectURL(ref.current.files[0]);
    window.open(objUrl, ref.current.files[0].name);
  };

  const onDeletePopUp = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPopUpOpen(true);
  };
  const handleServerFileDelete = async () => {
    if (documents.length) {
      const documentIndex = documents.findIndex((document) =>
        document.url.startsWith(popUpReferenceFile),
      );
      if (documentIndex !== -1 && documents[documentIndex].id) {
        const res = await FHIR('DocumentReference', 'doWork', {
          functionName: 'deleteDocumentReference',
          documentReferenceId: documents[documentIndex].id,
        });
        if (res && res.status === 200) {
          documents.splice(documentIndex, 1);
        }
      }
    }
  };
  const onDeleteFileHandler = () => {
    const emptyObj = {};
    if (popUpReferenceFile === 'Referral') {
      referralRef.current.value = '';
      setValue(`${popUpReferenceFile}File`, '');
      setReferralFile_64('');
      setReferralFile(emptyObj);
      handleServerFileDelete();
    } else if (popUpReferenceFile === 'Commitment') {
      commitmentRef.current.value = '';
      setValue(`${popUpReferenceFile}File`, '');
      setCommitmentFile_64('');
      setCommitmentFile(emptyObj);
      handleServerFileDelete();
    } else if (
      popUpReferenceFile === nameOfAdditionalDocumentFile ||
      popUpReferenceFile === 'Document1'
    ) {
      setValue(`${popUpReferenceFile}File`, '');
      additionalDocumentRef.current.value = '';
      setAdditionalDocumentFile_64('');
      setAdditionalDocumentFile(emptyObj);
      handleServerFileDelete();
    }
    handlePopUpClose();
  };

  const onClickAdditionalDocumentHandler = () => {
    numOfAdditionalDocument.length !== 1 &&
      setNumOfAdditionalDocument((prevState) => {
        let clonePrevState = prevState;
        clonePrevState.push(clonePrevState.length);
        return [...clonePrevState];
      });
  };
  const onChangeAdditionalDocumentHandler = (e) => {
    setNameOfAdditionalDocumentFile(e.target.value);
  };

  // Default values
  useEffect(() => {
    if (patientData) {
      if (patientData.managingOrganization) {
        (async () => {
          try {
            // const HMO_Data = await getHMO(patientData.managingOrganization);
            const Organization = await FHIR('Organization', 'doWork', {
              functionName: 'readOrganization',
              functionParams: {
                OrganizationId: patientData.managingOrganization,
              },
            });
            const normalizedOrganization = normalizeFhirOrganization(
              Organization.data,
            );
            setHMO(normalizedOrganization);
          } catch (error) {
            console.log(error);
          }
        })();
      }
      if (patientData.city) {
        const defaultAddressCityObj = {
          name: t(patientData.city),
          code: patientData.city,
        };
        setAddressCity(defaultAddressCityObj);
        setPOBoxCity(defaultAddressCityObj);
      }
      // If there is a streetName there might be streetNumber but that is not required streetName is required according to FHIR.
      if (patientData.streetName) {
        const defaultAddressStreetObj = {
          name: t(patientData.streetName),
          code: patientData.streetName,
        };
        setAddressStreet(defaultAddressStreetObj);
      }
    }
    if (encounterData) {
      if (encounterData.examination && encounterData.examination.length) {
        const selectedArr = encounterData.examination.map(
          (reasonCodeEl, reasonCodeElIndex) => {
            return {
              serviceType: {
                name: encounterData.serviceType,
                code: encounterData.serviceTypeCode,
              },
              reasonCode: {
                name: reasonCodeEl,
                code: encounterData.examinationCode[reasonCodeElIndex],
              },
            };
          },
        );
        setSelectedServicesType(selectedArr);
      }
      if (encounterData.priority > 1) {
        setIsUrgent(true);
      }
      if (encounterData.relatedPerson) {
        (async () => {
          try {
            if (encounterData.relatedPerson) {
              const relatedPerson = await FHIR('RelatedPerson', 'doWork', {
                functionName: 'getRelatedPerson',
                functionParams: {
                  RelatedPersonId: encounterData.relatedPerson,
                },
              });
              const normalizedRelatedPerson = normalizeFhirRelatedPerson(
                relatedPerson.data,
              );
              setRelatedPerson({ ...normalizedRelatedPerson });
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
    if (encounterData && patientData) {
      (async () => {
        try {
          const questionnaire = await FHIR('Questionnaire', 'doWork', {
            functionName: 'getQuestionnaire',
            functionParams: { QuestionnaireName: 'commitment_questionnaire' },
          });
          if (questionnaire.data.total) {
            setQuestionnaireId(questionnaire.data.entry[1].resource.id);
          }
          const questionnaireResponseData = await FHIR(
            'QuestionnaireResponse',
            'doWork',
            {
              functionName: 'getQuestionnaireResponse',
              functionParams: {
                patientId: patientData.id,
                encounterId: encounterData.id,
                questionnaireId: questionnaire.data.entry[1].resource.id,
              },
            },
          );
          if (questionnaireResponseData.data.total !== 0) {
            const normalizedQuestionnaireResponse = normalizeFhirQuestionnaireResponse(
              questionnaireResponseData.data.entry[1].resource,
            );
            setQuestionnaireResponse(normalizedQuestionnaireResponse);
            if (normalizedQuestionnaireResponse.items.length) {
              const commitmentDate = normalizedQuestionnaireResponse.items.find(
                (item) => item.text === 'Commitment date',
              );
              const commitmentValidity = normalizedQuestionnaireResponse.items.find(
                (item) => item.text === 'Commitment expiration date',
              );
              if (commitmentDate) {
                setCommitmentAndPaymentCommitmentDate(
                  moment(commitmentDate.answer[0].valueDate),
                );
              }
              if (commitmentValidity) {
                setCommitmentAndPaymentCommitmentValidity(
                  moment(commitmentValidity.answer[0].valueDate),
                );
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
      if (encounterData.id || patientData.id) {
        (async () => {
          const documentReferenceData = await FHIR(
            'DocumentReference',
            'doWork',
            {
              functionName: 'getDocumentReference',
              searchParams: {
                encounter: encounterData.id,
                patient: patientData.id,
              },
            },
          );
          if (documentReferenceData.data.total) {
            const documentsArray = [];
            for (
              let documentIndex = 0;
              documentReferenceData.data.entry.length > documentIndex;
              documentIndex++
            ) {
              if (documentReferenceData.data.entry[documentIndex].resource) {
                documentsArray.push(
                  normalizeFhirDocumentReference(documentReferenceData.data),
                );
              }
            }
            setDocuments(documentsArray);
          }
        })();
      }
    }
  }, [encounterData, patientData]);
  // PopUp
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpReferenceFile, setPopUpReferenceFile] = useState('');
  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
  };
  return (
    <React.Fragment>
      <CustomizedPopup
        isOpen={isPopUpOpen}
        onClose={handlePopUpClose}
        bottomButtons={[
          {
            color: 'primary',
            label: 'Delete',
            variant: 'contained',
            onClickHandler: onDeleteFileHandler,
          },
          {
            color: 'primary',
            label: 'Do not delete',
            variant: 'outlined',
            onClickHandler: handlePopUpClose,
          },
        ]}
        title={t('System notification')}>
        {`${t('You choose to delete the document')} ${t(
          popUpReferenceFile,
        )} ${t('Do you want to continue?')}`}
      </CustomizedPopup>
      <StyledPatientDetails edit={edit_mode}>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {/* Patient Details */}
          <Title
            marginTop={'55px'}
            fontSize={'28px'}
            color={'#002398'}
            label={'Patient Details'}
          />
          {/* Escorted */}
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Accompanying patient')}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <span>{t('Patient arrived with an escort?')}</span>
              {/* Escorted Information Switch */}
              <Controller
                name='isEscorted'
                control={control}
                defaultValue={isEscorted}
                onChangeName={isEscortedSwitchOnChangeHandle}
                as={
                  <StyledSwitch
                    name='isEscorted'
                    onChange={isEscortedSwitchOnChangeHandle}
                    checked={isEscorted}
                    label_1={'No'}
                    label_2={'Yes'}
                    marginLeft={'40px'}
                    marginRight={'40px'}
                  />
                }
              />
            </Grid>
          </StyledFormGroup>
          {/* Escorted Information */}
          {isEscorted && (
            <StyledFormGroup>
              <Title
                fontSize={'18px'}
                color={'#000b40'}
                label={t('Escort details')}
                bold
              />
              <StyledDivider variant={'fullWidth'} />
              {/* Escorted Information name */}
              <Controller
                as={<StyledTextField label={t('Escort name')} />}
                name={'escortName'}
                control={control}
                defaultValue={relatedPerson.name || ''}
              />
              {/* Escorted Information cell phone */}
              <Controller
                as={<StyledTextField label={t('Escort cell phone')} />}
                name={'escortMobilePhone'}
                control={control}
                defaultValue={relatedPerson.mobilePhone || ''}
                rules={{
                  pattern: getCellPhoneRegexPattern(),
                }}
                error={errors.escortMobilePhone && true}
                helperText={
                  errors.escortMobilePhone &&
                  t('The number entered is incorrect')
                }
              />
            </StyledFormGroup>
          )}
          {/* Contact Information */}
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Contact Information')}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            {/* Contact Information tabs */}
            <Tabs
              value={contactInformationTabValue}
              onChange={contactInformationTabValueChangeHandler}
              indicatorColor='primary'
              textColor='primary'
              variant='standard'
              aria-label='full width tabs example'>
              <Tab label={t('Address')} />
              <Tab label={t('PO box')} />
            </Tabs>
            {/* Contact Information tabs - address */}
            {contactInformationTabValue === 0 ? (
              <React.Fragment>
                {/* Contact Information - address - city */}
                <StyledAutoComplete
                  id='addressCity'
                  open={citiesOpen}
                  onOpen={() => {
                    setCitiesOpen(true);
                  }}
                  onClose={() => {
                    setCitiesOpen(false);
                  }}
                  loading={loadingCities}
                  options={cities}
                  value={addressCity}
                  onChange={(event, newValue) => {
                    setAddressCity(newValue);
                  }}
                  getOptionLabel={(option) =>
                    Object.keys(option).length === 0 &&
                    option.constructor === Object
                      ? ''
                      : option.name
                  }
                  noOptionsText={t('No Results')}
                  loadingText={t('Loading')}
                  renderInput={(params) => (
                    <StyledTextField
                      name='addressCity'
                      inputRef={register()}
                      {...params}
                      label={t('City')}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            <InputAdornment position={'end'}>
                              {loadingCities ? (
                                <CircularProgress color={'inherit'} size={20} />
                              ) : null}
                              {citiesOpen ? <ExpandLess /> : <ExpandMore />}
                            </InputAdornment>
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {/* Contact Information - address - streets */}
                <Autocomplete
                  options={streets}
                  loading={loadingStreets}
                  open={streetsOpen}
                  onOpen={() => addressCity.name && setStreetsOpen(true)}
                  onClose={() => setStreetsOpen(false)}
                  id='addressStreet'
                  value={addressStreet}
                  onChange={(event, newValue) => {
                    setAddressStreet(newValue);
                  }}
                  getOptionLabel={(option) =>
                    Object.keys(option).length === 0 &&
                    option.constructor === Object
                      ? ''
                      : option.name
                  }
                  noOptionsText={t('No Results')}
                  loadingText={t('Loading')}
                  getOptionDisabled={(option) => option.code === 'no_result'}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      name='addressStreet'
                      inputRef={register()}
                      InputProps={{
                        ...params.InputProps,

                        endAdornment: (
                          <InputAdornment position={'end'}>
                            {loadingStreets ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {streetsOpen ? <ExpandLess /> : <ExpandMore />}
                          </InputAdornment>
                        ),
                      }}
                      label={t('Street')}
                    />
                  )}
                />
                {/* Contact Information - address - house number */}
                <Controller
                  name={'addressStreetNumber'}
                  control={control}
                  defaultValue={patientData.streetNumber}
                  as={
                    <StyledTextField
                      id={'addressStreetNumber'}
                      label={t('House number')}
                    />
                  }
                />
                {/* Contact Information - address - postal code */}
                <Controller
                  defaultValue={patientData.postalCode || ''}
                  name={'addressPostalCode'}
                  as={
                    <StyledTextField
                      id={'addressPostalCode'}
                      label={t('Postal code')}
                      type='number'
                    />
                  }
                  rules={{ maxLength: { value: 7 }, minLength: { value: 7 } }}
                  control={control}
                  error={errors.addressPostalCode && true}
                  helperText={errors.addressPostalCode && 'יש להזין 7 ספרות'}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Contact Information - POBox - city */}
                <StyledAutoComplete
                  name='POBoxCity'
                  id='POBoxCity'
                  open={citiesOpen}
                  onOpen={() => {
                    setCitiesOpen(true);
                  }}
                  onClose={() => {
                    setCitiesOpen(false);
                  }}
                  onChange={(event, newValue) => {
                    setPOBoxCity(newValue);
                  }}
                  value={POBoxCity}
                  loading={loadingCities}
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  noOptionsText={t('No Results')}
                  loadingText={t('Loading')}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      name='POBoxCity'
                      inputRef={register()}
                      label={t('City')}
                      InputProps={{
                        ...params.InputProps,

                        endAdornment: (
                          <React.Fragment>
                            <InputAdornment position={'end'}>
                              {loadingCities ? (
                                <CircularProgress color={'inherit'} size={20} />
                              ) : null}
                              {citiesOpen ? <ExpandLess /> : <ExpandMore />}
                            </InputAdornment>
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
                {/* Contact Information - POBox - POBox */}
                <Controller
                  name={'POBox'}
                  control={control}
                  defaultValue={patientData.POBox}
                  as={<StyledTextField id={'POBox'} label={t('PO box')} />}
                />
                {/* Contact Information - POBox - postal code */}
                <Controller
                  defaultValue={patientData.postalCode}
                  name={'POBoxPostalCode'}
                  as={
                    <StyledTextField
                      id={'POBoxPostalCode'}
                      label={t('Postal code')}
                      InputLabelProps={{
                        shrink: patientData.postalCode && true,
                      }}
                    />
                  }
                  rules={{ maxLength: { value: 7 }, minLength: { value: 7 } }}
                  control={control}
                  error={errors.addressPostalCode && true}
                  helperText={errors.addressPostalCode && 'יש להזין 7 ספרות'}
                />
              </React.Fragment>
            )}
          </StyledFormGroup>
          <span>
            {t('To find a zip code on the Israel post site')}{' '}
            <a
              href={
                'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'
              }
              target={'_blank'}
              rel='noopener noreferrer'>
              {t('Click here')}
            </a>
          </span>
          {/* Visit Details */}
          <Title
            marginTop={'80px'}
            fontSize={'28px'}
            color={'#002398'}
            label={'Visit Details'}
          />
          {/* Requested service */}
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={'Requested service'}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <span>{t('Is urgent?')}</span>
              {/* Requested service - switch */}
              <StyledSwitch
                onChange={isUrgentSwitchOnChangeHandler}
                checked={isUrgent}
                label_1={'No'}
                label_2={'Yes'}
                marginLeft={'40px'}
                marginRight={'40px'}
              />
            </Grid>
            {/* Requested service - select test */}
            <Autocomplete
              filterOptions={filterOptions}
              multiple
              noOptionsText={t('No Results')}
              loadingText={t('Loading')}
              open={servicesTypeOpen}
              loading={loadingServicesType}
              onOpen={selectExaminationOnOpenHandler}
              onClose={selectExaminationOnCloseHandler}
              value={pendingValue}
              onChange={selectExaminationOnChangeHandler}
              disableCloseOnSelect
              renderTags={() => null}
              renderOption={(option, state) => (
                <Grid container justify='flex-end' alignItems='center'>
                  <Grid item xs={3}>
                    <Checkbox
                      color='primary'
                      icon={<CheckBoxOutlineBlankOutlined />}
                      checkedIcon={<CheckBox />}
                      checked={state.selected}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText>{option.reasonCode.code}</ListItemText>
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText primary={t(option.serviceType.name)} />
                  </Grid>
                  <Grid item xs={3}>
                    <ListItemText primary={t(option.reasonCode.name)} />
                  </Grid>
                </Grid>
              )}
              ListboxComponent={ListboxComponent}
              ListboxProps={{
                pendingValue: pendingValue,
                setSelectedServicesType: setSelectedServicesType,
                setClose: setServicesTypeOpen,
                setValue: setValue,
                close: unFocusSelectTest,
              }}
              options={servicesType}
              renderInput={(params) => (
                <StyledTextField
                  name='selectTest'
                  inputRef={(e) => {
                    selectTestRef.current = e;
                    register(e);
                  }}
                  error={requiredErrors.selectTest ? true : false}
                  helperText={
                    requiredErrors.selectTest &&
                    t('The test performed during the visit must be selected')
                  }
                  {...params}
                  label={`${t('Select test')} *`}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        <InputAdornment position={'end'}>
                          {loadingServicesType ? (
                            <CircularProgress color={'inherit'} size={20} />
                          ) : null}
                          {servicesTypeOpen ? <ExpandLess /> : <ExpandMore />}
                        </InputAdornment>
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            {/* Requested service - selected test - chips */}
            <Grid container direction='row' wrap='wrap'>
              {selectedServicesType.map((selected, selectedIndex) => (
                <StyledChip
                  deleteIcon={<Close fontSize='small' />}
                  onDelete={chipOnDeleteHandler(selectedIndex)}
                  key={selectedIndex}
                  label={`${selected.reasonCode.code} | ${t(
                    selected.serviceType.name,
                  )} | ${t(selected.reasonCode.name)}`}
                />
              ))}
            </Grid>
          </StyledFormGroup>
          {/* Commitment and payment */}
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Commitment and payment')}
              bold
            />
            <Title
              fontSize={'14px'}
              color={'#000b40'}
              label={t('Please fill in the payer details for the current test')}
            />
            <StyledDivider variant='fullWidth' />
            {/* Commitment and payment - tabs */}
            <Tabs
              value={commitmentAndPaymentTabValue}
              onChange={setCommitmentAndPaymentTabValueChangeHandler}
              indicatorColor='primary'
              textColor='primary'
              variant='standard'
              aria-label='full width tabs example'>
              <Tab label={t('HMO')} />
              {/* <Tab label={t('insurance company')} /> */}
              {/* <Tab label={t('Private')} /> */}
            </Tabs>
            {commitmentAndPaymentTabValue === 0 && (
              <React.Fragment>
                <StyledTextField
                  name={'commitmentAndPaymentHMO'}
                  inputRef={register()}
                  value={HMO.name || ''}
                  label={t('HMO')}
                  id={'commitmentAndPaymentHMO'}
                  disabled
                />
                <Controller
                  control={control}
                  name='commitmentAndPaymentReferenceForPaymentCommitment'
                  defaultValue={
                    questionnaireResponse.items
                      ? questionnaireResponse.items.find(
                          (item) => item.linkId === '1',
                        ).answer[0].valueInteger || ''
                      : ''
                  }
                  as={
                    <StyledTextField
                      name='commitmentAndPaymentReferenceForPaymentCommitment'
                      inputRef={register()}
                      label={`${t('Reference for payment commitment')} *`}
                      id={'commitmentAndPaymentReferenceForPaymentCommitment'}
                      type='number'
                      error={
                        requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment
                          ? true
                          : false
                      }
                      helperText={
                        requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment &&
                        t('Required field')
                      }
                    />
                  }
                />
                <Controller
                  name='commitmentAndPaymentCommitmentDate'
                  rules={{
                    validate: {
                      value: (value) => validateDate(value, 'before'),
                    },
                  }}
                  defaultValue={commitmentAndPaymentCommitmentDate}
                  control={control}
                  as={
                    <MuiPickersUtilsProvider
                      utils={MomentUtils}
                      moment={moment}>
                      <StyledKeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant='inline'
                        format={formatDate}
                        mask={formatDate}
                        margin='normal'
                        id='commitmentAndPaymentCommitmentDate'
                        label={`${t('Commitment date')} *`}
                        value={commitmentAndPaymentCommitmentDate}
                        onChange={(date) =>
                          dateOnChangeHandler(
                            date,
                            'commitmentAndPaymentCommitmentDate',
                            setCommitmentAndPaymentCommitmentDate,
                          )
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        error={
                          errors.commitmentAndPaymentCommitmentDate && true
                        }
                        helperText={
                          errors.commitmentAndPaymentCommitmentDate &&
                          t('An equal date or less than today must be entered')
                        }
                      />
                    </MuiPickersUtilsProvider>
                  }
                />
                <Controller
                  name='commitmentAndPaymentCommitmentValidity'
                  control={control}
                  rules={{
                    validate: {
                      value: (value) => validateDate(value, 'after'),
                    },
                  }}
                  defaultValue={commitmentAndPaymentCommitmentValidity}
                  as={
                    <MuiPickersUtilsProvider
                      utils={MomentUtils}
                      moment={moment}>
                      <StyledKeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant='inline'
                        mask={formatDate}
                        format={formatDate}
                        margin='normal'
                        id='commitmentAndPaymentCommitmentValidity'
                        label={`${t('Commitment validity')} *`}
                        value={commitmentAndPaymentCommitmentValidity}
                        onChange={(date) =>
                          dateOnChangeHandler(
                            date,
                            'commitmentAndPaymentCommitmentValidity',
                            setCommitmentAndPaymentCommitmentValidity,
                          )
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        error={
                          errors.commitmentAndPaymentCommitmentValidity && true
                        }
                        helperText={
                          errors.commitmentAndPaymentCommitmentValidity &&
                          t(
                            'An equal or greater date must be entered than today',
                          )
                        }
                      />
                    </MuiPickersUtilsProvider>
                  }
                />
                <Controller
                  control={control}
                  name='commitmentAndPaymentDoctorsName'
                  defaultValue={
                    questionnaireResponse.items
                      ? questionnaireResponse.items.find(
                          (item) => item.linkId === '4',
                        ).answer[0].valueString || ''
                      : ''
                  }
                  as={
                    <StyledTextField
                      // name='commitmentAndPaymentDoctorsName'
                      inputRef={register()}
                      label={`${t('Doctors name')} *`}
                      id={'commitmentAndPaymentDoctorsName'}
                      error={
                        requiredErrors.commitmentAndPaymentDoctorsName
                          ? true
                          : false
                      }
                      helperText={
                        requiredErrors.commitmentAndPaymentDoctorsName || ''
                      }
                    />
                  }
                />
                <Controller
                  control={control}
                  name='commitmentAndPaymentDoctorsLicense'
                  defaultValue={
                    questionnaireResponse.items
                      ? questionnaireResponse.items.find(
                          (item) => item.linkId === '5',
                        ).answer[0].valueInteger || ''
                      : ''
                  }
                  as={
                    <StyledTextField
                      // name='commitmentAndPaymentDoctorsLicense'
                      inputRef={register()}
                      label={`${t('Doctors license')} *`}
                      id={'commitmentAndPaymentDoctorsLicense'}
                      type='number'
                      error={
                        requiredErrors.commitmentAndPaymentDoctorsLicense
                          ? true
                          : false
                      }
                      helperText={
                        requiredErrors.commitmentAndPaymentDoctorsLicense || ''
                      }
                    />
                  }
                />
              </React.Fragment>
            )}
          </StyledFormGroup>
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Upload documents')}
              bold
            />
            <Title
              fontSize={'14px'}
              color={'#000b40'}
              label={`${t(
                'Uploading documents with a maximum size of up to',
              )} ${FILES_OBJ.maxSize}${FILES_OBJ.type}`}
            />
            <StyledDivider variant='fullWidth' />
            {/* ReferralRef  */}
            <Grid
              container
              alignItems='center'
              style={{ marginBottom: '41px' }}>
              <Grid item xs={3}>
                <label
                  style={{
                    color: `${
                      requiredErrors.ReferralFile ? '#f44336' : '#000b40'
                    }`,
                  }}
                  htmlFor='referral'>
                  {`${t('Referral')} *`}
                </label>
              </Grid>
              <Grid item xs={9}>
                <input
                  name='ReferralFile'
                  ref={(e) => {
                    referralRef.current = e;
                    register();
                  }}
                  id='referral'
                  type='file'
                  accept='.pdf,.gpf,.png,.gif,.jpg'
                  onChange={() =>
                    onChangeFileHandler(
                      referralRef,
                      setReferralFile,
                      'Referral',
                    )
                  }
                />
                {Object.values(referralFile).length > 0 ? (
                  <ChipWithImage
                    htmlFor='referral'
                    label={referralFile.name}
                    size={referralFile.size}
                    onDelete={
                      (event) => {
                        setPopUpReferenceFile('Referral');
                        onDeletePopUp(event);
                      }
                      // onDeleteFileHandler(
                      //   referralRef,
                      //   setReferralFile,
                      //   'Referral',
                      // )
                    }
                    onClick={() => onClickFileHandler(referralRef)}
                  />
                ) : (
                  <label htmlFor='referral'>
                    <StyledButton
                      variant='outlined'
                      color='primary'
                      component='span'
                      size={'large'}
                      startIcon={<Scanner />}>
                      {t('Upload document')}
                    </StyledButton>
                  </label>
                )}
              </Grid>
            </Grid>
            {/* CommitmentRef  */}
            <Grid
              container
              alignItems='center'
              style={{ marginBottom: '41px' }}>
              <Grid item xs={3}>
                <label
                  style={{
                    color: `${
                      requiredErrors.CommitmentFile ? '#f44336' : '#000b40'
                    }`,
                  }}
                  htmlFor='commitment'>
                  {`${t('Commitment')} *`}
                </label>
              </Grid>
              <Grid item xs={9}>
                <input
                  name='CommitmentFile'
                  ref={(e) => {
                    commitmentRef.current = e;
                    register();
                  }}
                  id='commitment'
                  type='file'
                  accept='.pdf,.gpf,.png,.gif,.jpg'
                  onChange={() =>
                    onChangeFileHandler(
                      commitmentRef,
                      setCommitmentFile,
                      'Commitment',
                    )
                  }
                />
                {Object.values(commitmentFile).length > 0 ? (
                  <ChipWithImage
                    htmlFor='commitment'
                    label={commitmentFile.name}
                    size={commitmentFile.size}
                    onDelete={
                      (event) => {
                        setPopUpReferenceFile('Commitment');
                        onDeletePopUp(event);
                      }
                      // onDeleteFileHandler(
                      //   commitmentRef,
                      //   setCommitmentFile,
                      //   'Commitment',
                      // )
                    }
                    onClick={() => onClickFileHandler(commitmentRef)}
                  />
                ) : (
                  <label htmlFor='commitment'>
                    <StyledButton
                      variant='outlined'
                      color='primary'
                      component='span'
                      size={'large'}
                      startIcon={<Scanner />}>
                      {t('Upload document')}
                    </StyledButton>
                  </label>
                )}
              </Grid>
            </Grid>
            {/* AdditionalDocumentRef */}
            {numOfAdditionalDocument.map((_, additionalDocumentIndex) => {
              return (
                <Grid
                  container
                  alignItems='center'
                  key={additionalDocumentIndex}>
                  <Grid item xs={3}>
                    <StyledTextField
                      onChange={onChangeAdditionalDocumentHandler}
                      label={`${t('Additional document')}`}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <input
                      name={nameOfAdditionalDocumentFile || 'Document1'}
                      ref={(e) => {
                        additionalDocumentRef.current = e;
                        register();
                      }}
                      id='additionalDocument'
                      type='file'
                      accept='.pdf,.gpf,.png,.gif,.jpg'
                      onChange={() =>
                        onChangeFileHandler(
                          additionalDocumentRef,
                          setAdditionalDocumentFile,
                          nameOfAdditionalDocumentFile || 'Document1',
                        )
                      }
                    />
                    {Object.values(additionalDocumentFile).length > 0 ? (
                      <ChipWithImage
                        htmlFor='additionalDocument'
                        label={additionalDocumentFile.name}
                        size={additionalDocumentFile.size}
                        onDelete={
                          (event) => {
                            setPopUpReferenceFile(
                              nameOfAdditionalDocumentFile || 'Document1',
                            );
                            onDeletePopUp(event);
                          }
                          // onDeleteFileHandler(
                          //   additionalDocumentRef,
                          //   setAdditionalDocumentFile,
                          //   nameOfAdditionalDocumentFile || 'Document1',
                          // )
                        }
                        onClick={() =>
                          onClickFileHandler(additionalDocumentRef)
                        }
                      />
                    ) : (
                      <label htmlFor='additionalDocument'>
                        <StyledButton
                          variant='outlined'
                          color='primary'
                          component='span'
                          size={'large'}
                          startIcon={<Scanner />}>
                          {t('Upload document')}
                        </StyledButton>
                      </label>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            <Grid container alignItems='center'>
              <AddCircle
                style={{ color: '#002398', cursor: 'pointer' }}
                onClick={onClickAdditionalDocumentHandler}
              />
              <Title
                margin='0 8px 0 8px'
                bold
                color={'#002398'}
                label={'Additional document'}
              />
            </Grid>
          </StyledFormGroup>
          <StyledFormGroup>
            <Grid container direction='row' justify='flex-end'>
              <Grid item xs={3}>
                <StyledButton
                  color='primary'
                  variant='outlined'
                  type='submit'
                  letterSpacing={'0.1'}>
                  {t('Save & Close')}
                </StyledButton>
              </Grid>
              <Grid item xs={3}>
                <StyledButton
                  color='primary'
                  variant='contained'
                  type='submit'
                  fontWeight={'bold'}>
                  {t('Medical questionnaire')}
                </StyledButton>
              </Grid>
            </Grid>
          </StyledFormGroup>
        </StyledForm>
        {/* <DevTool control={control} /> */}
      </StyledPatientDetails>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
  };
};

export default connect(mapStateToProps)(PatientDetailsBlock);
