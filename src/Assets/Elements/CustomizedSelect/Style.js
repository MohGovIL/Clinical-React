import styled from "styled-components";
import Select from "@material-ui/core/Select";

export default styled(Select)`
  background-color: ${props => props.background_color ? props.background_color : null};
  border-radius: 15px;
  width: 100%;
  & .MuiSelect-icon {
    position: relative;
    color: ${props => props.icon_color ? props.icon_color : null}
  }
  ::before{
    border-bottom: none;
  }
`;
