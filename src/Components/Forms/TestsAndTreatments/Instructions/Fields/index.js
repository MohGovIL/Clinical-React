/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose Fields -  The main component which will hold and render EM Test and Treatment instruction form fields.
 * The fields are :
                                TestTreatment
                                TestTreatmentInstructions
                                TestTreatmentRefferal
                                TestTreatmentRemark
                                TestTreatmentStatus
                                TestTreatmentType
 * @returns Fields of the main form Component.
 */

import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TestTreatment from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatment';
import TestTreatmentInstructions from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatmentInstructions';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledConstantHeaders,
  StyledIconedButton,
  StyledInstructions,
  StyledTreatmentInstructionsButton,
  StyledTypographyHour,
  StyledTypographyName,
} from 'Components/Forms/TestsAndTreatments/Style';
import TestTreatmentType from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatmentType';
import * as moment from 'moment';
import { connect } from 'react-redux';
import normalizeFhirUser from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import PLUS from 'Assets/Images/plus.png';
import { useTranslation } from 'react-i18next';
import TestTreatmentReferral from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatmentRefferal';
import TestTreatMentStatus from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatmentStatus';
import TestTreatmentRemark from 'Components/Forms/TestsAndTreatments/Instructions/TestTreatmentRemark';
import denormalizeFhirServiceRequest from '../../../../../Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirServiceRequest';
import normalizeFhirServiceRequest from '../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirServiceRequest';

/**
 *
 * @param encounter
 * @param currentUser
 * @param handlePopUpProps
 * @param requiredErrors
 * @param setRequiredErrors
 * @returns {*}
 * @constructor
 */
const Fields = ({
  serviceRequests,
  encounter,
  currentUser,
  handlePopUpProps,
  requiredErrors,
  setRequiredErrors,
}) => {
  const { control, watch } = useFormContext();
  const { fields, insert, prepend, append, remove } = useFieldArray({
    control,
    name: 'Instruction',
  });
  useEffect(() => {
    (async () => {
      if (
        serviceRequests &&
        serviceRequests !== '' &&
        serviceRequests.total > 0
      ) {
        let fieldsArray = [];
        await serviceRequests.entry.map((value, index) => {
          if (
            value &&
            value.resource &&
            value.resource.resourceType &&
            value.resource.resourceType === 'ServiceRequest'
          ) {
            const serviceReq = normalizeFhirServiceRequest(value.resource);
            fieldsArray.push(createDataFromRecord({ serviceReq }));

            /*
          insert(parseInt(0, 10), {
            test_treatment: serviceReq.instructionCode,
            test_treatment_type: serviceReq.orderDetailCode,
            instructions: serviceReq.patientInstruction,
            test_treatment_status:
              serviceReq.status === 'active' ? 'not_done' : 'done',
            test_treatment_remark: serviceReq.note,
          });*/
          }
        });
        const fieldsArrayTemp = await Promise.all(fieldsArray);
        append(fieldsArrayTemp);
      }
    })();
  }, [serviceRequests]);

  const createDataFromRecord = async ({ serviceReq }) => {
    serviceReq = {
      performer_or_requester:
        serviceReq.status === 'active'
          ? serviceReq.requester
          : serviceReq.performer,
      test_treatment: serviceReq.instructionCode,
      test_treatment_type: serviceReq.orderDetailCode,
      instructions: serviceReq.patientInstruction,
      test_treatment_status:
        serviceReq.status === 'active' ? 'not_done' : 'done',
      test_treatment_remark: serviceReq.note,
    };
    return serviceReq;
  };
  const appendInsertData = async ({ serviceReq }) => {
    if (!serviceReq) {
      serviceReq = {};
      serviceReq.instructionCode = '';
      serviceReq.orderDetailCode = '';
      serviceReq.patientInstruction = '';
      serviceReq.status = 'not_done';
      serviceReq.note = '';
    }
    if (fields.length > 0) {
      await insert(parseInt(0, 10), {
        performer_or_requester:
          serviceReq.status === 'active'
            ? serviceReq.requester
            : serviceReq.performer,
        test_treatment: serviceReq.instructionCode,
        test_treatment_type: serviceReq.orderDetailCode,
        instructions: serviceReq.patientInstruction,
        test_treatment_status:
          serviceReq.status === 'active' ? 'not_done' : 'done',
        test_treatment_remark: serviceReq.note,
      });
    } else {
      await append({
        performer_or_requester:
          serviceReq.status === 'active'
            ? serviceReq.requester
            : serviceReq.performer,
        test_treatment: serviceReq.instructionCode,
        test_treatment_type: serviceReq.orderDetailCode,
        instructions: serviceReq.patientInstruction,
        test_treatment_status:
          serviceReq.status === 'active' ? 'not_done' : 'done',
        test_treatment_remark: serviceReq.note,
      });
    }
  };
  let user = normalizeFhirUser(currentUser);
  const edit = true;

  const addNewInstruction = async () => {
    //prepend has a bug in hookform soI used it like this :

    //1) set the errors in a new error array of errors
    setRequiredErrors((prevState) => {
      const cloneState = [...prevState];
      cloneState.unshift({
        test_treatment_type: '',
      });
      return cloneState;
    });

    //2) if it is the first record do append otherwise do insert this is basically prepend
    if (fields.length > 0) {
      await insert(parseInt(0, 10), {
        performer_or_requester: '',
        test_treatment: '',
        test_treatment_type: '',
        instructions: '',
        test_treatment_status: false,
        test_treatment_remark: '',
      });
    } else {
      await append({
        performer_or_requester: '',
        test_treatment: '',
        test_treatment_type: '',
        instructions: '',
        test_treatment_status: false,
        test_treatment_remark: '',
      });
    }
    //3)render all the elements to the screen  with watch
    watch();
  };
  const { t } = useTranslation();
  return (
    <>
      <StyledConstantHeaders>
        {t('Instructions for treatment')}
      </StyledConstantHeaders>
      <StyledTreatmentInstructionsButton onClick={addNewInstruction}>
        <img alt='plus icon' src={PLUS} />
        {t('Instructions for treatment')}
      </StyledTreatmentInstructionsButton>
      <hr />
      <StyledInstructions id='newRefInstructions'>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <StyledCardRoot>
                <StyledCardDetails>
                  <StyledCardContent>
                    <StyledTypographyName component='h5' variant='h5'>
                      {edit ? user.name.toString() : ''}
                    </StyledTypographyName>
                    <StyledTypographyHour variant='subtitle1' color='primary'>
                      {' '}
                      {edit
                        ? moment
                            .utc(encounter.extensionStatusUpdateDate)
                            .format('LT')
                        : ''}{' '}
                    </StyledTypographyHour>
                  </StyledCardContent>
                  <StyledCardName></StyledCardName>
                </StyledCardDetails>

                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <TestTreatment index={index} item={item} />
                  </Grid>
                  <Grid item xs={3}>
                    <TestTreatmentType
                      requiredErrors={requiredErrors}
                      index={index}
                      item={item}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={2}>
                    <TestTreatmentReferral index={index} item={item} />
                  </Grid>

                  <TestTreatmentInstructions
                    index={index}
                    item={item}
                    handlePopUpProps={handlePopUpProps}
                  />

                  <Grid item xs={12}>
                    <TestTreatMentStatus
                      requiredErrors={requiredErrors}
                      index={index}
                      item={item}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TestTreatmentRemark index={index} item={item} />
                  </Grid>
                </Grid>
              </StyledCardRoot>
            </div>
          );
        })}
      </StyledInstructions>
    </>
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
export default connect(mapStateToProps, null)(Fields);
