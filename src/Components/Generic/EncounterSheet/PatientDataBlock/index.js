import React from 'react';
import StyledPatientDataBlock from './Style';
import AvatarIdBlock from '../../../../Assets/Elements/AvatarIdBlock';
import { StyledDiv } from '../../../Imaging/PatientAdmission/PatientDataBlock/Style';

const PatientDataBlock = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  return (
    <StyledPatientDataBlock>
      <AvatarIdBlock
        edit_mode={0}
        showEditButton={false}
        priority={encounter.priority}
        patientData={patient}
        showDivider
      />
    </StyledPatientDataBlock>
  );
};

export default PatientDataBlock;
