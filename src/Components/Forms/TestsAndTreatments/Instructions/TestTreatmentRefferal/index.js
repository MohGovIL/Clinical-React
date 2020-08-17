/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentReferral - A button ,
 *                                  will create a referral x-ray photography (pdf).
 * @returns UI Field of the main form.
 */
import PDF from 'Assets/Images/pdf.png';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyledHiddenDiv,
  StyledIconedButton,
} from 'Components/Forms/TestsAndTreatments/Style';
import { Controller, useFormContext } from 'react-hook-form';
import { connect } from 'react-redux';
import openDocumentInANewWindow from 'Utils/Helpers/openDocumentInANewWindow';
import { store } from 'index';
import { createLetter } from 'Utils/Services/API';
import { decodeBase_64IntoBlob } from '../../../../../Utils/Helpers/decodeBase_64IntoBlob';
import Grid from '@material-ui/core/Grid';

/**
 *
 * @param index
 * @returns UI Field of the main form.
 */

const TestTreatmentReferral = ({
  index,
  item,
  encounter,
  languageDirection,
  patient,
  currentUser,
}) => {
  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });
  const { t } = useTranslation();

  const test_treatment =
    (Instruction && Instruction[index] && Instruction[index].test_treatment) ||
    item.test_treatment;

  const reason_referance_doc_id =
    (Instruction &&
      Instruction[index] &&
      Instruction[index].reason_referance_doc_id) ||
    item.reason_referance_doc_id;
  const getLetterIfExists = async () => {
    try {
      const { Instruction } = getValues({ nest: true });
      let facility = store.getState().settings.facility;
      let owner = currentUser && currentUser.id;

      const xRayDoc = await createLetter({
        letter_type: 'x_ray',
        encounter: encounter && encounter.id,
        patient: patient && patient.id,
        owner: owner,
        facility: facility,
        id: Instruction[index].reason_referance_doc_id,
      });

      if (xRayDoc.status === 200) {
        let xRayDocData = xRayDoc.data;
        setValue(
          `Instruction[${index}].reason_referance_doc_id`,
          xRayDocData.id,
        );
        openDocumentInANewWindow({
          data: xRayDocData.base64_data,
          contentType: 'application/pdf',
          name: `x_ray_patient_${patient}.pdf`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createLetterIfExists = () => {
    alert('createLetterIfExists');
    /*setValue(`Instruction[${index}].reason_referance_doc_id`,xRayDoc)*/
  };
  useEffect(() => {}, [test_treatment]);
  return (
    test_treatment === 'x_ray' && (
      <StyledHiddenDiv dontDisplay={item.locked}>
        <Controller
          hidden
          name={`Instruction[${index}].reason_referance_doc_id`}
          defaultValue={reason_referance_doc_id}
          as={<input />}
        />

        <StyledIconedButton
          onClick={
            !(item.reason_referance_doc_id && encounter.status === 'completed')
              ? getLetterIfExists
              : createLetterIfExists
          }
          /* name={`Instruction[${index}].test_treatment_referral`}*/
        >
          <div>
            <img src={PDF} />
          </div>
          <p>{t('Referral for x-ray')}</p>
        </StyledIconedButton>
      </StyledHiddenDiv>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(TestTreatmentReferral);
