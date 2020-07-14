import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export default styled(Button)`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) =>
    props.backGroundColor && props.backGroundColor};
  border-radius: 25px;
  border: ${(props) =>
    props.disabled ? 'solid 1px #00000042' : 'solid 1px #002398'};
  .MuiButton-label {
    font-weight: ${(props) => props.fontWeight};
  }
`;
