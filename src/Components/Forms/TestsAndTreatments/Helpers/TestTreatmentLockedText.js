import React from 'react';
import {
  StyledInputText,
  StyledLabelText,
} from 'Components/Forms/TestsAndTreatments/Helpers/Style';

const TestTreatmentLockedText = ({ value, label, dontBreakRow, name }) => {
  return (
    <>
      <br />
      <StyledLabelText>{label}</StyledLabelText>
      {dontBreakRow ? ' : ' : <br />}
      <StyledInputText>{value}</StyledInputText>
    </>
  );
};
export default TestTreatmentLockedText;
