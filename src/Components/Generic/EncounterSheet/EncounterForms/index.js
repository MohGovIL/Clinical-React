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

  const handleGetFormsDataFirst = async () => {
    const forms = await getForms(
      encounter.serviceTypeCode,
      encounter.examinationCode,
    );
    setFormsPerSheet(forms);
  };

  React.useEffect(() => {
    if (!formsPerSheet) handleGetFormsDataFirst();
  });

  return (
    <StyledPatientFiles dir={languageDirection}>
      {formsPerSheet ? (
        <FormsContainer dir={languageDirection} tabs={formsPerSheet} />
      ) : null}
    </StyledPatientFiles>
  );
};

export default EncounterForms;
