import React, { useEffect, useState } from 'react';
import StyledPatientFiles from './Style';
import { Button } from '@material-ui/core';

const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
  changeMedicalProblem,
}) => {
  const [listAllergyNew, setListAllergyNew] = useState([]);
  const [listMedicalProblemNew, setListMedicalProblemNew] = useState([]);
  const [listMedicationStatementNew, setListMedicationStatementNew] = useState([]);

  /*
  This function "onChangeAllergyButton" is an on-click event handler for a button in view.
  The handler calls several useState() to set the values that are passed \
  to the callback function "changeMedicalProblem". Which in turn makes changes to the middle component:
   (allergies, background diseases, medications).
  */
  const onChangeAllergyButton = () => {
    setListAllergyNew([
      {id: '2', title: 'allergy N:' + Math.random().toString().substr(2,5)},
      {id: '3', title: 'allergy MN:' + Math.random().toString().substr(2,5)},
    ]);

    setListMedicalProblemNew([
      {id: '4', title: 'flu a: ' + Math.random().toString().substr(2,5)},
      {id: '5', title: 'flu b: ' + Math.random().toString().substr(2,5)},
    ]);

    setListMedicationStatementNew([
      {id: '6', title: 'medical a: ' + Math.random().toString().substr(2,5)},
      {id: '7', title: 'medical b: ' + Math.random().toString().substr(2,5)},
    ]);
  };
  useEffect(() => {
      changeMedicalProblem(listAllergyNew, listMedicalProblemNew, listMedicationStatementNew);
  }, [listAllergyNew, listMedicalProblemNew, listMedicationStatementNew]);

  return <StyledPatientFiles>
    {/*<Button onClick={onChangeAllergyButton}>demo Change Allergy and Medical Problem and medication</Button>*/}

  </StyledPatientFiles>;
};

export default EncounterForms;
