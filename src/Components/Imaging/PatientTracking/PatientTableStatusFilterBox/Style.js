import styled from "styled-components";
import {devicesValue} from "../../../../Assets/Themes/BreakPoints";

export default styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: ${devicesValue.desktop}px){
    flex-direction: row;
  }
`;
