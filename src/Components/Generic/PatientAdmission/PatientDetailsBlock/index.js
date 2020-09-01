import React, { useEffect, useState } from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import normalizeFhirRelatedPerson from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirRelatedPerson';
import { splitBase_64 } from 'Utils/Helpers/splitBase_64';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import {
  StyledButton,
  StyledForm,
  StyledFormGroup,
  StyledPatientDetails,
} from './Style';
import { useTranslation } from 'react-i18next';
import EscortPatient from './EscortPatient';
import ContactInformation from './ContactInformation';
import VisitDetails from './VisitDetails';
import Payment from './Payment';
import Documents from './Documents';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { FHIR } from 'Utils/Services/FHIR';
import { store } from 'index';
// import { DevTool } from 'react-hook-form-devtools';

const PatientDetailsBlock = ({
  patientData,
  edit_mode,
  encounterData,
  formatDate,
  setIsDirty,
  configuration,
}) => {
  const { t } = useTranslation();
  let history = useHistory();
  const methods = useForm({
    mode: 'onBlur',
    submitFocusError: true,
  });
  const { handleSubmit, formState } = methods;
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
    arrivalWay: '',
  });
  const onSubmit = async (data) => {
    try {
      const clear = isRequiredValidation(data);
      if (clear) {
        const APIsArray = [];
        //Updating patient
        let patientPatchParams = {};
        if (data.contactInformationTabValue === 0) {
          if (data.addressCity) {
            patientPatchParams['city'] = data.addressCity;
          }
          if (data.addressStreet && data.addressStreet.trim()) {
            patientPatchParams['streetName'] = data.addressStreet;
          }
          if (data.addressStreetNumber && data.addressStreetNumber.trim()) {
            patientPatchParams['streetNumber'] = data.addressStreetNumber;
          }
          if (data.addressPostalCode) {
            patientPatchParams['postalCode'] = data.addressPostalCode;
          }
        } else {
          if (data.POBoxCity) {
            patientPatchParams['city'] = data.POBoxCity;
          }
          if (data.POBox) {
            patientPatchParams['POBox'] = data.POBox;
          }
          if (data.POBoxPostalCode) {
            patientPatchParams['postalCode'] = data.POBoxPostalCode;
          }
        }
        if (Object.keys(patientPatchParams).length) {
          APIsArray.push(
            FHIR('Patient', 'doWork', {
              functionName: 'patchPatient',
              functionParams: { patientPatchParams, patientId: patientData.id },
            }),
          );
        }

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
                  valueString: data.paymentAmount,
                },
              ],
            },
            {
              linkId: '7',
              text: 'Payment method',
              answer: [
                {
                  valueString: data.paymentMethod,
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
        if (data.questionnaireResponse) {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'patchQuestionnaireResponse',
              questionnaireResponseId: data.questionnaireResponse,
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
                  questionnaire: data.questionnaireId,
                  status: 'completed',
                  patient: patientData.id,
                  encounter: encounterData.id,
                  author: store.getState().login.userID,
                  authored: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
                  source: patientData.id,
                  item,
                },
              },
            }),
          );
        }
        //Updating/Creating relatedPerson
        if (data.isEscorted) {
          let relatedPersonParams = {};
          if (encounterData.relatedPerson) {
            if (data.escortName) relatedPersonParams['name'] = data.escortName;
            if (data.escortMobilePhone)
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
        const promises = await Promise.all(APIsArray);
        const encounter = { ...encounterData };
        encounter.examinationCode = data.examinationCode;
        encounter.serviceTypeCode = data.serviceTypeCode;
        if (configuration.clinikal_pa_arrival_way === '1') {
          encounter['extensionArrivalWay'] = data.arrivalWay;
        }
        if (data.reasonForReferralDetails) {
          encounter['extensionReasonCodeDetails'] =
            data.reasonForReferralDetails;
        }
        if (data.isEscorted) {
          if (!encounter.relatedPerson) {
            const NewRelatedPerson = normalizeFhirRelatedPerson(
              promises[APIsArray.length - 1].data,
            );
            encounter['relatedPerson'] = NewRelatedPerson.id;
          }
        } else {
          delete encounter['relatedPerson'];
        }
        if (data.isUrgent) {
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
        // TODO: Check if the document came from the server or not if it did don't send it
        if (data.Referral) {
          const referral_64Obj = splitBase_64(data.Referral.base_64);
          const documentReferenceReferral = {
            encounter: encounterData.id,
            patient: patientData.id,
            contentType: referral_64Obj.type,
            data: referral_64Obj.data,
            categoryCode: '2',
            url: data.Referral.name,
          };

          await FHIR('DocumentReference', 'doWork', {
            documentReference: documentReferenceReferral,
            functionName: 'createDocumentReference',
          });
        }

        if (
          configuration.clinikal_pa_commitment_form === '1' &&
          data.Commitment
        ) {
          const commitment_64Obj = splitBase_64(data.Commitment.base_64);
          const documentReferenceCommitment = {
            encounter: encounterData.id,
            patient: patientData.id,
            contentType: commitment_64Obj.type,
            data: commitment_64Obj.data,
            categoryCode: '2',
            url: data.Commitment.name,
          };

          await FHIR('DocumentReference', 'doWork', {
            documentReference: documentReferenceCommitment,
            functionName: 'createDocumentReference',
          });
        }
        if (
          data.additionalDocumentFile_64 &&
          data.additionalDocumentFile_64.length
        ) {
          const additional_64Obj = splitBase_64(
            data.additionalDocumentFile_64.base_64,
          );
          const documentReferenceAdditionalDocument = {
            encounter: encounterData.id,
            patient: patientData.id,
            contentType: additional_64Obj.type,
            data: additional_64Obj.data,
            categoryCode: '2',
            url: data.additionalDocumentFile_64.name,
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
    arrivalWay: {
      name: 'arrivalWay',
      required: function (data) {
        return data[this.name];
      },
    },
    selectTest: {
      name: 'selectTest',
      required: function (data) {
        return data.examinationCode && data.examinationCode.length > 0;
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
  };

  const isRequiredValidation = (data) => {
    console.log(data);
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
  return (
    <React.Fragment>
      <StyledPatientDetails edit={edit_mode}>
        <FormContext
          {...methods}
          requiredErrors={requiredErrors}
          permission={'write'}
          isCommitmentForm={configuration.clinikal_pa_commitment_form}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
              disableHeaders={false}
              disableButtonIsUrgent={false}
            />
            <Payment
              pid={patientData.id}
              eid={encounterData.id}
              formatDate={formatDate}
              managingOrganization={patientData.managingOrganization}
            />
            <Documents eid={encounterData.id} pid={patientData.id} />
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
