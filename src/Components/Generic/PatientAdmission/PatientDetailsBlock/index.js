// Other
import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import { israelPhoneNumberRegex } from 'Utils/Helpers/validation/patterns';
import { Controller, useForm, FormContext } from 'react-hook-form';
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
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import { checkCurrencyFormat } from 'Utils/Helpers/checkCurrencyFormat';
import { formatToCurrency } from 'Utils/Helpers/formatToCurrency';

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
import TabPanel from './TabPanel';
import EscortPatient from './EscortPatient';
import ContactInformation from './ContactInformation';
import VisitDetails from './VisitDetails';
import Payment from './Payment';
import Documents from './Documents';
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

// APIs
import { getCities, getStreets } from 'Utils/Services/API';
import moment from 'moment';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirDocumentReference from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';

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
  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });
  const {
    control,
    handleSubmit,
    errors,
    setValue,
    register,
    formState,
    reset,
    triggerValidation,
  } = methods;
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
      if (true) {
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
        if (data.isEscorted) {
          let relatedPersonParams = {};
          if (encounterData.relatedPerson) {
            relatedPersonParams['name'] = data.escortName;
            relatedPersonParams['mobilePhone'] = data.escortMobilePhone;
            APIsArray.push(
              FHIR('RelatedPerson', 'doWork', {
                functionName: 'updateRelatedPerson',
                functionParams: {
                  relatedPersonParams,
                  relatedPersonId: encounterData.relatedPerson,
                },
              }),
            );
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
                functionName: 'createRelatedPerson',
                functionParams: {
                  relatedPersonParams,
                },
              }),
            );
          }
        }
        let item = [];
        if (configuration.clinikal_pa_commitment_form === '1') {
          item = [
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
          ];
        } else {
          item = [
            {
              linkId: '6',
              text: 'Payment amount',
              answer: [
                {
                  valueString: paymentAmount,
                },
              ],
            },
            {
              linkId: '7',
              text: 'Payment method',
              answer: [
                {
                  valueString: paymentMethod,
                },
              ],
            },
            {
              linkId: '8',
              text: 'Receipt number',
              answer: [
                {
                  valueString: data.receiptNumber,
                },
              ],
            },
          ];
        }
        if (Object.values(questionnaireResponse).length) {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'patchQuestionnaireResponse',
              questionnaireResponseId: questionnaireResponse.id,
              questionnaireResponseParams: {
                item,
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
                  item,
                },
              },
            }),
          );
        }
        const promises = await Promise.all(APIsArray);
        const encounter = { ...encounterData };
        encounter.examinationCode = selectedServicesType.map((option) => {
          return option.reasonCode.code;
        });
        encounter.serviceTypeCode = selectedServicesType[0].serviceType.code;
        if (configuration.clinikal_pa_arrival_way === '1') {
          encounter['extensionArrivalWay'] = data.arrivalWay;
        }
        if (data.reasonForReferralDetails) {
          encounter['extensionReasonCodeDetails'] =
            data.reasonForReferralDetails;
        }
        if (data.ControllerisEscorted) {
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
        if (encounter.status === 'planned') {
          encounter.status = configuration.clinikal_pa_next_enc_status;
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
        if (configuration.clinikal_pa_commitment_form === '1') {
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
        }
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
        let answer;
        if (configuration.clinikal_pa_commitment_form === '1') {
          answer = !requiredFields[fieldKey].required(data);
        } else {
          if (
            !requiredFields[fieldKey].name
              .toLowerCase()
              .startsWith('commitment')
          ) {
            answer = !requiredFields[fieldKey].required(data);
          }
        }
        if (answer) {
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
  // paymentMethods
  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentMethodHandler = (event, method) => {
    setPaymentMethod(method);
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
  ] = useState(
    configuration.clinikal_pa_commitment_form === '1' ? 'HMO' : 'Private',
  );

  const [paymentAmount, setPaymentAmount] = useState('0');

  const onChangePaymentAmountHandler = (event) => {
    if (checkCurrencyFormat(event.target.value))
      setPaymentAmount(event.target.value);
  };

  const onBlurPaymentAmountHandler = (event) => {
    const format = formatToCurrency(event.target.value);
    setValue('privateAmountPayment', format);
    setPaymentAmount(formatToCurrency(format));
  };

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
        <FormContext {...methods} requiredErrors>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            {/* Patient Details */}
            <EscortPatient
              relatedPersonId={encounterData.relatedPerson}
              isArrivalWay={configuration.clinikal_pa_arrival_way}
              encounterArrivalWay={encounterData.extensionArrivalWay}
            />
            <ContactInformation
              city={patientData.city}
              patientPOBox={patientData.POBox}
              postalCode={patientData.postalCode}
              streetName={patientData.streetName}
              streetNumber={patientData.streetNumber}
            />
            <VisitDetails
              reasonCodeDetails={encounterData.extensionReasonCodeDetails}
              examination={encounterData.examination}
              examinationCode={encounterData.examinationCode}
              serviceType={encounterData.serviceType}
              serviceTypeCode={encounterData.serviceTypeCode}
              priority={encounterData.priority}
            />
            <Payment
              pid={patientData.id}
              eid={encounterData.id}
              isCommitmentForm={configuration.clinikal_pa_commitment_form}
              formatDate={formatDate}
              managingOrganization={patientData.managingOrganization}
            />
            <Documents
              eid={encounterData.id}
              handlePopUpClose={handlePopUpClose}
              isCommitmentForm={configuration.clinikal_pa_commitment_form}
              pid={patientData.id}
              popUpReferenceFile={popUpReferenceFile}
              setIsPopUpOpen={setIsPopUpOpen}
              setPopUpReferenceFile={setPopUpReferenceFile}
            />
            <StyledFormGroup>
              <Grid container direction='row' justify='flex-end'>
                <Grid item lg={3} sm={4}>
                  <StyledButton
                    color='primary'
                    variant='contained'
                    type='submit'
                    letterSpacing={'0.1'}>
                    {t('Save & Close')}
                  </StyledButton>
                </Grid>
                {/* <Grid item lg={3} sm={4}>
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
              </Grid> */}
              </Grid>
            </StyledFormGroup>
          </StyledForm>
        </FormContext>
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
