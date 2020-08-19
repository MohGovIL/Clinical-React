import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledSubmitButton = styled(Button)`
  &:hover{
     background-color:  ${(props) =>
       props.backgroundColor ? props.backgroundColor : '#002398'};
 }
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '25px'}; 
  background-color:  ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#002398'};
  margin: ${(props) => props.margin};
   float:  ${(props) => (props.float ? props.textAlign : 'left')};
  .MuiButton-startIcon {
    margin-left: 8px;
  }
  width: ${(props) => (props.width ? props.width : '162px')};
  height: ${(props) => (props.height ? props.height : '50px')};
  opacity:  ${(props) => (props.opacity ? props.opacity : '1')};
  .MuiButton-label{
    width: ${(props) => (props.labelWidth ? props.labelWidth : '98px')};
  height: ${(props) => (props.labelHeight ? props.labelHeight : '22px')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'bold')};
  font-stretch: ${(props) =>
    props.fontStretch ? props.fontStretch : 'normal'};
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : 'normal')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : 'normal')};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : 'normal'};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'center')};
  color: ${(props) => (props.color ? props.color : '#ffffff')};
 
  }

}
`;
