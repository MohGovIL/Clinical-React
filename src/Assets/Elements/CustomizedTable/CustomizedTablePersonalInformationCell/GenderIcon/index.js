import styled from "styled-components";

const GenderIcon = styled.img`
  object-fit: contain;
  width: 35px;
  height: 35px;
  margin-left: 16px;
  margin-right: 16px;
  border: ${props => props.priority > 0 ? 'solid 1.5px #ff3232': null};
  border-radius: 50%;
`;

export default GenderIcon;
