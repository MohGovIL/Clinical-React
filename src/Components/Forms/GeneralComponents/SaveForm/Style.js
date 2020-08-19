import styled from 'styled-components';

const StyledFormSave = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
`;

export default StyledFormSave;

export const CenterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
