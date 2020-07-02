import styled from 'styled-components';
import InputMask from 'react-input-mask';
export const StyledMaskedInput = styled(InputMask)`
  text-align: center;
  input {
    text-align: center;
  }
  .MuiInputLabel-shrink {
    transform: translate(37.5px, 5.5px) scale(0.75);
    transform-origin: top left;
  }
`;
