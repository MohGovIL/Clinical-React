import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

const StyledPatientBackground = styled.div`
  display: flex;
  flex-basis: 25%;
  max-width: 25%;
  margin: 120px 38px 32px 38px;
  height: calc(100vh - 88px - 32px - 32px);
  max-height: calc(100vh - 88px - 32px - 32px);
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #fafbff;
  overflow-y: auto;
`;

export default StyledPatientBackground;

export const StyledEncountersTicketsCurrent = styled(Paper)`
  width: 430px;
  height: 100px;
  border-radius: 10px;
  box-shadow: 0 -4px 25px 6px rgba(151, 151, 152, 0.09);
  background-color: #ffffff;
  margin: 6% 2.5%;
`;
export const StyledEncountersTicketsOther = styled(Paper)`
  width: 430px;
  height: 100px;
  margin: 6% 2.5%;
  background: transparent;
`;

export const StyledCurrentExaminationHeader = styled.div`
  display: flex;
  margin: 20px 23px;
  width: 100%;
  div {
    width: 30%;
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: normal;
    -moz-letter-spacing: normal;
    -ms-letter-spacing: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
  span {
    width: 60%;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    -webkit-letter-spacing: normal;
    -moz-letter-spacing: normal;
    -ms-letter-spacing: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
    margin-left: 10%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const StyledIconContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 33%;
`;
export const StyledCameraIcon = styled.div`
 /* ${(props) => console.log(props)};*/
  cursor: ${(props) => (props.canClickEncounter ? 'pointer' : 'not-allowed')};

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin: -3px 9px;
  }
  span {
    width: 34px;
    height: 18px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
`;

export const StyledMedicalFileIcon = styled.div`
  /*${(props) => console.log(props)};*/
  cursor: ${(props) => (props.canClickMedical ? 'pointer' : 'not-allowed')};

  img {
    width: 12px;
    height: 14px;
    object-fit: contain;
    margin: -1px 9px;
  }
  span {
    width: 71px;
    height: 18px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
  }
`;
export const StyledHeader = styled.div`
  margin-top: 4%;
  display: flex;
  div {
    top: 48px;
    width: 106px;
    height: 30px;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: #000b40;
    margin-right: 10%;
    margin-left: 38%;
  }
`;
export const StyledEitanButton = styled(Button)`
  width: 113px;
  height: 32px;
  border-radius: 25px;
  color: #002398;
  span {
    width: 78px;
    height: 20px;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #002398;
  }
`;

export const StyledEncountersContainer = styled.div``;
export const StyledFadeElement = styled(Fade)``;
export const StyledEncounterTicket = styled.div`
  display: ${(props) =>
    props.style.visibility === 'hidden' ? 'none' : 'block'};
`;

export const StyledAllButton = styled(Button)`
  display: ${(props) => (props.show === 'true' ? 'block' : 'block')};
`;
