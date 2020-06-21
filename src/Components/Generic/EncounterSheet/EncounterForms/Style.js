import styled from 'styled-components';

const StyledPatientFiles = styled.div`
  display: flex;
  flex-basis: 54%;
  max-width: 54%;
  margin: 120px 0 0 32px;
  height: calc(100vh - 88px - 32px - 32px);
  max-height: calc(100vh - 88px - 32px - 32px);
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
`;

export default StyledPatientFiles;

export const StyledTabContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  header {
    background-color: #ffffff;
  }
`;
