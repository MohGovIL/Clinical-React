import styled from "styled-components";

const GenderIcon = styled.img`
  object-fit: contain;
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 16px;
  border: ${props => props.priority > 0 ? 'solid 1.5px #ff3232': null};
  border-radius: 50%;
`;

export default GenderIcon;
