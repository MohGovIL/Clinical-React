import React, { useEffect, useState } from 'react';
import StyledPatientFiles from './Style';
import { getForms } from 'Utils/Services/API';
import FormsContainer from './FormsContainer';

const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  const [formsPerSheet, setFormsPerSheet] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const forms = await getForms(
        encounter.serviceTypeCode,
        encounter.examinationCode,
      );
      setFormsPerSheet(forms);
    })();
  }, [encounter.serviceTypeCode, encounter.examinationCode]);

  return (
    <StyledPatientFiles>
      {formsPerSheet ? (
        <FormsContainer dir={languageDirection} tabs={formsPerSheet} />
      ) : null}
    </StyledPatientFiles>
  );
};

export default EncounterForms;
