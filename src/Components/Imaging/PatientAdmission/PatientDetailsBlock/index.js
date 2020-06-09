// Other
import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import { israelPhoneNumberRegex } from 'Utils/Helpers/validation/patterns';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';

// Helpers
import { normalizeFhirOrganization } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirOrganization';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import normalizeFhirRelatedPerson from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirRelatedPerson';
import { calculateFileSize } from 'Utils/Helpers/calculateFileSize';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';
import { splitBase_64 } from 'Utils/Helpers/splitBase_64';
import { combineBase_64 } from 'Utils/Helpers/combineBase_64';
import { decodeBase_64IntoBlob } from 'Utils/Helpers/decodeBase_64IntoBlob';

// Styles
import {
  StyledAutoComplete,
  StyledButton,
  StyledChip,
  StyledDivider,
  StyledForm,
  StyledFormGroup,
  StyledPatientDetails,
} from './Style';
import { useTranslation } from 'react-i18next';
// Assets, Customized elements
import StyledToggleButton from 'Assets/Elements/StyledToggleButton';
import StyledToggleButtonGroup from 'Assets/Elements/StyledToggleButtonGroup';
import CustomizedKeyboardDatePicker from 'Assets/Elements/CustomizedKeyboardDatePicker';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
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
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ToggleButton from '@material-ui/lab/ToggleButton';

// APIs
import { getCities, getStreets } from 'Utils/Services/API';
import moment from 'moment';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirDocumentReference from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
const PatientDetailsBlock = ({
  patientData,
  edit_mode,
  encounterData,
  formatDate,
  setEncounterAndPatient,
  setIsDirty,
  configuration,
}) => {
  const { t } = useTranslation();
  let history = useHistory();
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    register,
    formState,
    reset,
    triggerValidation,
  } = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });
  // Giving the patientAdmission if the form is dirty
  // meaning that there has been changes in the form
  const { dirty } = formState;
  useEffect(() => {
    setIsDirty(dirty);
  }, [dirty, setIsDirty]);
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
      const clear = isRequiredValidation(data);
      if (clear) {
        const APIsArray = [];
        //Updating patient
        let patientPatchParams = {};
        if (contactInformationTabValue === 0) {
          if (data.addressCity) {
            patientPatchParams['city'] = addressCity.code;
          }
          if (data.addressStreet.trim()) {
            patientPatchParams['streetName'] = addressStreet.code;
          }
          if (data.addressStreetNumber.trim()) {
            patientPatchParams['streetNumber'] = data.addressStreetNumber;
          }
          if (data.addressPostalCode) {
            patientPatchParams['postalCode'] = data.addressPostalCode;
          }
        } else {
          if (data.POBoxCity) {
            patientPatchParams['city'] = POBoxCity.code;
          }
          if (data.POBox) {
            patientPatchParams['POBox'] = data.POBox;
          }
          if (data.POBoxPostalCode) {
            patientPatchParams['postalCode'] = data.POBoxPostalCode;
          }
        }
        APIsArray.push(
          FHIR('Patient', 'doWork', {
            functionName: 'updatePatient',
            functionParams: { patientPatchParams, patientId: patientData.id },
          }),
        );
        //Updating/Creating relatedPerson
        if (encounterData.appointment) {
          APIsArray.push(
            FHIR('Appointment', 'doWork', {
              functionName: 'updateAppointment',
              functionParams: {
                functionParams: {
                  appointmentId: encounterData.appointment,
                  appointmentParams: {
                    status: 'arrived',
                  },
                },
              },
            }),
          );
        }
        if (isEscorted) {
          let relatedPersonParams = {};
          if (encounterData.relatedPerson) {
            if (
              data.escortName !== relatedPerson.name &&
              data.escortMobilePhone !== relatedPerson.mobilePhone
            ) {
              relatedPersonParams['name'] = data.escortName;
              relatedPersonParams['mobilePhone'] = data.escortMobilePhone;
              APIsArray.push(
                FHIR('RelatedPerson', 'doWork', {
                  // eslint-disable-next-line no-use-before-define
                  functionName: 'updateRelatedPerson',
                  functionParams: {
                    relatedPersonParams,
                    // eslint-disable-next-line no-use-before-define
                    relatedPersonId: relatedPerson.id,
                  },
                }),
              );
            }
          } else {
            if (data.escortName) {
              relatedPersonParams['name'] = data.escortName;
            }
            if (data.escortMobilePhone) {
              relatedPersonParams['mobilePhone'] = data.escortMobilePhone;
            }
            if (patientData && patientData.id) {
              relatedPersonParams['patient'] = patientData.id;
            }
            APIsArray.push(
              FHIR('RelatedPerson', 'doWork', {
                // eslint-disable-next-line no-use-before-define
                functionName: 'createRelatedPerson',
                functionParams: {
                  relatedPersonParams,
                },
              }),
            );
          }
        }
        if (Object.values(questionnaireResponse).length) {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'patchQuestionnaireResponse',
              questionnaireResponseId: questionnaireResponse.id,
              questionnaireResponseParams: {
                item: [
                  {
                    linkId: '1',
                    text: 'Commitment number',
                    answer: [
                      {
                        valueInteger:
                          data.commitmentAndPaymentReferenceForPaymentCommitment,
                      },
                    ],
                  },
                  {
                    linkId: '2',
                    text: 'Commitment date',
                    answer: [
                      {
                        valueDate: data.commitmentAndPaymentCommitmentDate,
                      },
                    ],
                  },
                  {
                    linkId: '3',
                    text: 'Commitment expiration date',
                    answer: [
                      {
                        valueDate: data.commitmentAndPaymentCommitmentValidity,
                      },
                    ],
                  },
                  {
                    linkId: '4',
                    text: 'Signing doctor',
                    answer: [
                      {
                        valueString: data.commitmentAndPaymentDoctorsName,
                      },
                    ],
                  },
                  {
                    linkId: '5',
                    text: 'doctor license number',
                    answer: [
                      {
                        valueInteger: data.commitmentAndPaymentDoctorsLicense,
                      },
                    ],
                  },
                ],
              },
            }),
          );
        } else {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'createQuestionnaireResponse',
              functionParams: {
                questionnaireResponse: {
                  questionnaire: questionnaireId,
                  status: 'completed',
                  patient: patientData.id,
                  encounter: encounterData.id,
                  authored: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
                  source: patientData.id,
                  item: [
                    {
                      linkId: '1',
                      text: 'Commitment number',
                      answer: [
                        {
                          valueInteger:
                            data.commitmentAndPaymentReferenceForPaymentCommitment,
                        },
                      ],
                    },
                    {
                      linkId: '2',
                      text: 'Commitment date',
                      answer: [
                        {
                          valueDate: data.commitmentAndPaymentCommitmentDate,
                        },
                      ],
                    },
                    {
                      linkId: '3',
                      text: 'Commitment expiration date',
                      answer: [
                        {
                          valueDate:
                            data.commitmentAndPaymentCommitmentValidity,
                        },
                      ],
                    },
                    {
                      linkId: '4',
                      text: 'Signing doctor',
                      answer: [
                        {
                          valueString: data.commitmentAndPaymentDoctorsName,
                        },
                      ],
                    },
                    {
                      linkId: '5',
                      text: 'doctor license number',
                      answer: [
                        {
                          valueInteger: data.commitmentAndPaymentDoctorsLicense,
                        },
                      ],
                    },
                  ],
                },
              },
            }),
          );
        }
        const promises = await Promise.all(APIsArray);
        const encounter = { ...encounterData };
        if (isEscorted) {
          if (!encounter.relatedPerson) {
            const NewRelatedPerson = normalizeFhirRelatedPerson(
              promises[1].data,
            );
            encounter['relatedPerson'] = NewRelatedPerson.id;
          }
        } else {
          delete encounter['relatedPerson'];
        }
        if (isUrgent) {
          encounter['priority'] = 2;
        } else {
          encounter['priority'] = 1;
        }
        if (selectedServicesType.length) {
          encounter.examinationCode = selectedServicesType.map((option) => {
            return option.reasonCode.code;
          });
          encounter.serviceTypeCode = selectedServicesType[0].serviceType.code;
        } else {
          encounter.serviceType = '';
          encounter.examinationCode = '';
        }
        if (encounter.status === 'planned') {
          encounter.status = 'arrived';
        }
        await FHIR('Encounter', 'doWork', {
          functionName: 'updateEncounter',
          functionParams: {
            encounterId: encounter.id,
            encounter: encounter,
          },
        });
        const referral_64Obj = splitBase_64(referralFile_64);
        const documentReferenceReferral = {
          encounter: encounterData.id,
          patient: patientData.id,
          contentType: referral_64Obj.type,
          data: referral_64Obj.data,
          categoryCode: '2',
          url: referralFile.name,
        };

        await FHIR('DocumentReference', 'doWork', {
          documentReference: documentReferenceReferral,
          functionName: 'createDocumentReference',
        });

        const commitment_64Obj = splitBase_64(commitmentFile_64);
        const documentReferenceCommitment = {
          encounter: encounterData.id,
          patient: patientData.id,
          contentType: commitment_64Obj.type,
          data: commitment_64Obj.data,
          categoryCode: '2',
          url: commitmentFile.name,
        };

        await FHIR('DocumentReference', 'doWork', {
          documentReference: documentReferenceCommitment,
          functionName: 'createDocumentReference',
        });

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

          await FHIR('DocumentReference', 'doWork', {
            documentReference: documentReferenceAdditionalDocument,
            functionName: 'createDocumentReference',
          });
        }
        history.push(`${baseRoutePath()}/imaging/patientTracking`);
      }
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
        return selectedServicesType.length > 0;
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
        return Object.values(referralFile).length > 0;
      },
    },
    CommitmentFile: {
      name: 'CommitmentFile',
      linkId: '',
      required: function (data) {
        return Object.values(commitmentFile).length > 0;
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
            cloneState[requiredFields[fieldKey].name] = t('Value is required');
            return cloneState;
          });
          clean = false;
        } else {
          setRequiredErrors((prevState) => {
            const cloneState = { ...prevState };
            cloneState[requiredFields[fieldKey].name] = '';
            return cloneState;
          });
        }
      }
    }
    return clean;
  };

  // Escorted Information
  // Escorted Information - vars
  const [isEscorted, setIsEscorted] = useState(false);
  const [relatedPerson, setRelatedPerson] = useState({});
  const [arrivalWay, setArrivalWay] = useState('');
  // ArrivalWay -functions
  const arrivalWayHandler = (event, way) => {
    setArrivalWay(way);
  };
  // Escorted Information - functions
  const isEscortedSwitchOnChangeHandle = () => {
    setIsEscorted((prevState) => {
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
    triggerValidation(['addressPostalCode', 'POBoxPostalCode']);
    setContactInformationTabValue(newValue);
  };
  // Contact Information - address city - var
  const [addressCity, setAddressCity] = useState({});
  const [addressStreet, setAddressStreet] = useState({});
  // Contact Information - PObox city - var
  const [POBoxCity, setPOBoxCity] = useState({});
  // Contact Information - address - vars
  const [addressStreetNumber, setAddressStreetNumber] = useState('');

  const [addressPostalCode, setAddressPostalCode] = useState('');

  const [POBox, setPOBox] = useState('');

  const [POBoxPostalCode, setPOBoxPostalCode] = useState('');

  const onTextBlur = (value, setState) => {
    // setValue(name, value, true);
    setState(value);
  };
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
  const [referralBlob, setReferralBlob] = useState('');
  const [commitmentBlob, setCommitmentBlob] = useState('');
  const [additionalDocumentBlob, setAdditionalDocumentBlob] = useState('');

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
    event.preventDefault();
    let refId = ref.current.id;
    if (documents.length) {
      if (documents.find((doc) => doc.url.startsWith(refId))) {
        if (refId.startsWith('Referral')) {
          window.open(URL.createObjectURL(referralBlob), referralFile.name);
        } else if (refId.startsWith('Commitment')) {
          window.open(URL.createObjectURL(commitmentBlob), commitmentFile.name);
        } else {
          window.open(
            URL.createObjectURL(additionalDocumentBlob),
            additionalDocumentFile.name,
          );
        }
      } else {
        window.open(
          URL.createObjectURL(ref.current.files[0]),
          ref.current.files[0].name,
        );
      }
    } else {
      window.open(
        URL.createObjectURL(ref.current.files[0]),
        ref.current.files[0].name,
      );
    }
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
      if (patientData.streetName.trim()) {
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
            const relatedPerson = await FHIR('RelatedPerson', 'doWork', {
              functionName: 'getRelatedPerson',
              functionParams: {
                RelatedPersonId: encounterData.relatedPerson,
              },
            });
            const normalizedRelatedPerson = normalizeFhirRelatedPerson(
              relatedPerson.data,
            );

            setIsEscorted(true);
            setRelatedPerson(normalizedRelatedPerson);
            reset({
              escortMobilePhone: normalizedRelatedPerson.mobilePhone || '',
              escortName: normalizedRelatedPerson.name || '',
            });
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
            reset({
              commitmentAndPaymentReferenceForPaymentCommitment:
                normalizedQuestionnaireResponse.items.find(
                  (item) => item.linkId === '1',
                ).answer[0].valueInteger || '',
              commitmentAndPaymentDoctorsName:
                normalizedQuestionnaireResponse.items.find(
                  (item) => item.linkId === '4',
                ).answer[0].valueString || '',
              commitmentAndPaymentDoctorsLicense:
                normalizedQuestionnaireResponse.items.find(
                  (item) => item.linkId === '5',
                ).answer[0].valueInteger || '',
            });
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
      if (encounterData.id && patientData.id) {
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
                const normalizedFhirDocumentReference = normalizeFhirDocumentReference(
                  documentReferenceData.data.entry[documentIndex].resource,
                );
                documentsArray.push(normalizedFhirDocumentReference);
                const base_64 = combineBase_64(
                  normalizedFhirDocumentReference.data,
                  normalizedFhirDocumentReference.contentType,
                );
                const [, SizeInMB] = calculateFileSize(
                  atob(normalizedFhirDocumentReference.data).length,
                  FILES_OBJ.valueInBytes,
                  FILES_OBJ.fix,
                  FILES_OBJ.maxSize,
                );
                let obj = {
                  name: normalizedFhirDocumentReference.url,
                  size: SizeInMB,
                };
                const blob = decodeBase_64IntoBlob(
                  normalizedFhirDocumentReference.data,
                  normalizedFhirDocumentReference.contentType,
                );
                if (
                  normalizedFhirDocumentReference.url.startsWith('Referral')
                ) {
                  setReferralBlob(blob);
                  setReferralFile_64(base_64);
                  setReferralFile(obj);
                  referralRef.current = base_64;
                } else if (
                  normalizedFhirDocumentReference.url.startsWith('Commitment')
                ) {
                  setCommitmentBlob(blob);
                  commitmentRef.current = base_64;
                  setCommitmentFile_64(base_64);
                  setCommitmentFile(obj);
                } else {
                  setAdditionalDocumentBlob(blob);
                  additionalDocumentRef.current = base_64;
                  setAdditionalDocumentFile_64(base_64);
                  setAdditionalDocumentFile(obj);
                }
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
              alignItems={'center'}
              style={{ marginBottom: '50px' }}>
              {parseInt(configuration.clinikal_pa_arrival_way) && (
                <React.Fragment>
                  <span>{t('Arrival way?')}</span>
                  <StyledToggleButtonGroup
                    value={arrivalWay}
                    onChange={arrivalWayHandler}
                    exclusive
                    aria-label='Arrival way'>
                    <StyledToggleButton
                      value='Ambulance'
                      aria-label='ambulance'>
                      {t('Ambulance')}
                    </StyledToggleButton>
                    <StyledToggleButton
                      value='Independently'
                      aria-label='Independently'>
                      {t('Independently')}
                    </StyledToggleButton>
                  </StyledToggleButtonGroup>
                </React.Fragment>
              )}
            </Grid>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <span>
                {parseInt(configuration.clinikal_pa_arrival_way)
                  ? t('Arrival with escort?')
                  : t('Patient arrived with an escort?')}
              </span>
              {/* Escorted Information Switch */}
              <StyledSwitch
                name='isEscorted'
                onChange={isEscortedSwitchOnChangeHandle}
                checked={isEscorted}
                label_1={'No'}
                label_2={'Yes'}
                marginLeft={'40px'}
                marginRight={'40px'}
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
                as={
                  <CustomizedTextField width={'70%'} label={t('Escort name')} />
                }
                name={'escortName'}
                control={control}
                defaultValue={relatedPerson.name || ''}
              />
              {/* Escorted Information cell phone */}
              <Controller
                name={'escortMobilePhone'}
                control={control}
                defaultValue={relatedPerson.mobilePhone || ''}
                as={
                  <CustomizedTextField
                    width={'70%'}
                    label={t('Escort cell phone')}
                  />
                }
                rules={{
                  pattern: israelPhoneNumberRegex(),
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
                    <CustomizedTextField
                      width={'70%'}
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
                <StyledAutoComplete
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
                    <CustomizedTextField
                      width={'70%'}
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
                  defaultValue={addressStreetNumber || patientData.streetNumber}
                  onBlur={([event]) => {
                    onTextBlur(event.target.value, setAddressStreetNumber);
                    return event.target.value;
                  }}
                  as={
                    <CustomizedTextField
                      width={'70%'}
                      id={'addressStreetNumber'}
                      label={t('House number')}
                    />
                  }
                />
                {/* Contact Information - address - postal code */}
                <Controller
                  defaultValue={addressPostalCode || patientData.postalCode}
                  name={'addressPostalCode'}
                  key='addressPostalCode'
                  control={control}
                  onBlur={([event]) => {
                    onTextBlur(event.target.value, setAddressPostalCode);
                    return event.target.value;
                  }}
                  as={
                    <CustomizedTextField
                      width={'70%'}
                      id={'addressPostalCode'}
                      label={t('Postal code')}
                      type='number'
                    />
                  }
                  rules={{ maxLength: { value: 7 }, minLength: { value: 7 } }}
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
                    <CustomizedTextField
                      width={'70%'}
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
                  defaultValue={POBox || patientData.POBox}
                  onBlur={([event]) => {
                    onTextBlur(event.target.value, setPOBox);
                    return event.target.value;
                  }}
                  as={
                    <CustomizedTextField
                      width={'70%'}
                      id={'POBox'}
                      label={t('PO box')}
                    />
                  }
                />
                {/* Contact Information - POBox - postal code */}
                <Controller
                  defaultValue={POBoxPostalCode || patientData.postalCode}
                  name={'POBoxPostalCode'}
                  key='POBoxPostalCode'
                  control={control}
                  onBlur={([event]) => {
                    onTextBlur(event.target.value, setPOBoxPostalCode);
                    return event.target.value;
                  }}
                  as={
                    <CustomizedTextField
                      width={'70%'}
                      id={'POBoxPostalCode'}
                      label={t('Postal code')}
                      InputLabelProps={{
                        shrink: patientData.postalCode && true,
                      }}
                    />
                  }
                  rules={{ maxLength: { value: 7 }, minLength: { value: 7 } }}
                  error={errors.POBoxPostalCode && true}
                  helperText={errors.POBoxPostalCode && 'יש להזין 7 ספרות'}
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
            <StyledAutoComplete
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
                <CustomizedTextField
                  width={'70%'}
                  name='selectTest'
                  inputRef={(e) => {
                    selectTestRef.current = e;
                  }}
                  error={requiredErrors.selectTest ? true : false}
                  helperText={
                    requiredErrors.selectTest &&
                    t(
                      'The visit reason performed during the visit must be selected',
                    )
                  }
                  {...params}
                  label={`${t('Reason for refferal')} *`}
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
                <CustomizedTextField
                  width={'70%'}
                  name={'commitmentAndPaymentHMO'}
                  inputRef={register()}
                  value={HMO.name || ''}
                  label={t('HMO')}
                  id={'commitmentAndPaymentHMO'}
                  disabled
                />
                <CustomizedTextField
                  width={'70%'}
                  name='commitmentAndPaymentReferenceForPaymentCommitment'
                  label={`${t('Reference for payment commitment')} *`}
                  inputRef={register}
                  id={'commitmentAndPaymentReferenceForPaymentCommitment'}
                  type='number'
                  InputLabelProps={{ shrink: true }}
                  error={
                    requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment
                      ? true
                      : false
                  }
                  helperText={
                    requiredErrors.commitmentAndPaymentReferenceForPaymentCommitment
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
                      moment={moment}
                      libInstance={moment}>
                      <CustomizedKeyboardDatePicker
                        disableToolbar
                        autoOk
                        variant='inline'
                        allowKeyboardControl={true}
                        format={formatDate}
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
                      <CustomizedKeyboardDatePicker
                        disableToolbar
                        allowKeyboardControl={true}
                        autoOk
                        variant='inline'
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
                <CustomizedTextField
                  width={'70%'}
                  name='commitmentAndPaymentDoctorsName'
                  label={`${t('Doctors name')} *`}
                  inputRef={register}
                  id={'commitmentAndPaymentDoctorsName'}
                  InputLabelProps={{ shrink: true }}
                  error={
                    requiredErrors.commitmentAndPaymentDoctorsName
                      ? true
                      : false
                  }
                  helperText={
                    requiredErrors.commitmentAndPaymentDoctorsName || ''
                  }
                />
                <CustomizedTextField
                  width={'70%'}
                  label={`${t('Doctors license')} *`}
                  name='commitmentAndPaymentDoctorsLicense'
                  inputRef={register}
                  id={'commitmentAndPaymentDoctorsLicense'}
                  type='number'
                  InputLabelProps={{ shrink: true }}
                  error={
                    requiredErrors.commitmentAndPaymentDoctorsLicense
                      ? true
                      : false
                  }
                  helperText={
                    requiredErrors.commitmentAndPaymentDoctorsLicense || ''
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
                  htmlFor='Referral'>
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
                  id='Referral'
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
                    htmlFor='Referral'
                    label={referralFile.name}
                    size={referralFile.size}
                    onDelete={(event) => {
                      setPopUpReferenceFile('Referral');
                      onDeletePopUp(event);
                    }}
                    onClick={(event) => onClickFileHandler(event, referralRef)}
                  />
                ) : (
                  <label htmlFor='Referral'>
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
                  htmlFor='Commitment'>
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
                  id='Commitment'
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
                    htmlFor='Commitment'
                    label={commitmentFile.name}
                    size={commitmentFile.size}
                    onDelete={(event) => {
                      setPopUpReferenceFile('Commitment');
                      onDeletePopUp(event);
                    }}
                    onClick={(event) =>
                      onClickFileHandler(event, commitmentRef)
                    }
                  />
                ) : (
                  <label htmlFor='Commitment'>
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
                    <CustomizedTextField
                      width={'70%'}
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
                      id='AdditionalDocument'
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
                        htmlFor='AdditionalDocument'
                        label={additionalDocumentFile.name}
                        size={additionalDocumentFile.size}
                        onDelete={(event) => {
                          setPopUpReferenceFile(
                            nameOfAdditionalDocumentFile || 'Document1',
                          );
                          onDeletePopUp(event);
                        }}
                        onClick={(event) =>
                          onClickFileHandler(event, additionalDocumentRef)
                        }
                      />
                    ) : (
                      <label htmlFor='AdditionalDocument'>
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
              <Grid item lg={3} sm={4}>
                <StyledButton
                  color='primary'
                  variant='outlined'
                  type='submit'
                  letterSpacing={'0.1'}>
                  {t('Save & Close')}
                </StyledButton>
              </Grid>
              <Grid item lg={3} sm={4}>
                <StyledButton
                  color='primary'
                  variant='contained'
                  fontWeight={'bold'}
                  onClick={() => {
                    setEncounterAndPatient(encounterData, patientData);
                    history.push(`${baseRoutePath()}/generic/encounterSheet`);
                  }}>
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

export default connect(mapStateToProps, { setEncounterAndPatient })(
  PatientDetailsBlock,
);
