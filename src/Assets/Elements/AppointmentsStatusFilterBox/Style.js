import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";

export default styled(AppBar)`
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: ${props => props.desktop ? 'column' : 'row'};
  & .MuiTabs-indicator {

  }
`;
