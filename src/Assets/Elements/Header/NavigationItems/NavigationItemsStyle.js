import styled from "styled-components";
import {device} from "../../MediaQueries";

const NavigationItemsStyle = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  & div {
    padding-right: 30px;
    padding-left: 30px
  }
  @media ${device.tablet}{
    display: none;
  }
`;

export default NavigationItemsStyle;
