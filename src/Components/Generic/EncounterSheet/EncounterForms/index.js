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

  const onChangeAllergyButton = () => {
    setListAllergyNew([
      {id: '2', title: 'allergy N:' + Math.random().toString().substr(2,5)},
      {id: '3', title: 'allergy MN:' + Math.random().toString().substr(2,5)},
    ]);

    setListMedicalProblemNew([
      {id: '4', title: 'flu a: ' + Math.random().toString().substr(2,5)},
      {id: '5', title: 'flu b: ' + Math.random().toString().substr(2,5)},
    ]);
  };
  useEffect(() => {
      changeMedicalProblem(listAllergyNew, listMedicalProblemNew);
  }, [listAllergyNew, listMedicalProblemNew]);

  return <StyledPatientFiles>
    <Button onClick={onChangeAllergyButton}>demo Change Allergy and Medical Problem</Button>

  </StyledPatientFiles>;
};

export default EncounterForms;
