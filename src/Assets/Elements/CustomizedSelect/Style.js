import styled from "styled-components";
import Select from "@material-ui/core/Select";

export default styled(Select)`
  background-color: ${props => props.background_color ? props.background_color : null};
  border-radius: 15px;
  color: ${props => props.text_color ? props.text_color :  null};
  font-weight: bold;
  & .MuiSelect-icon {
    position: relative;
    color: ${props => props.icon_color ? props.icon_color : null}
  }
  ::before{
    border-bottom: none;
  }
`;
