import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export const StyledConstantTextField = styled(TextField)`
  width: 104px;
  height: 56px;
  border-radius: 10px;
  background-color: #f8faff;
  margin: 2% 16px;

  .MuiInputLabel-formControl {
    color: #000b40;
    width: 86px;
    height: 22px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
  }
  input {
    text-align: center;
  }
`;

export const StyledConstantHeaders = styled.label`
  width: 135px;
  height: 30px;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;
export const StyledLabelWithHourComponent = styled.div`
  label {
    width: 54px;
    height: 40px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
  span {
    width: 37px;
    height: 18px;
    font-size: 13px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    text-align: center;
    color: #076ce9;
  }
`;
