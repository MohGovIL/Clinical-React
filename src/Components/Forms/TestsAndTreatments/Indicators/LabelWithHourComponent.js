/**
 * @author Dror Golan drorgo@matrix.co.il
 * @returns UI DRAW OF LabelWithHourComponent
 */

import React from 'react';
import { StyledLabelWithHourComponent } from 'Components/Forms/TestsAndTreatments/Style';

/**
 *
 * @param label
 * @param value
 * @returns {*}
 * @constructor
 */
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
