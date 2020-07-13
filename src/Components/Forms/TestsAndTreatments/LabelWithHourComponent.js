import React from 'react';
import { StyledLabelWithHourComponent } from 'Components/Forms/TestsAndTreatments/Style';

const LabelWithHourComponent = ({ label, value }) => {
  return (
    <StyledLabelWithHourComponent>
      <label>{label}</label>
      <br />
      <span>{value}</span>
    </StyledLabelWithHourComponent>
  );
};

export default LabelWithHourComponent;
