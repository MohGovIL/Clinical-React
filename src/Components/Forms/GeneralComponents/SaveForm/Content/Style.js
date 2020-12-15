import styled from 'styled-components';
import Title from 'Assets/Elements/Title';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledSubHeader = styled(Title)`
  width: 346px;
  height: 22px;

  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;

export const StyledHeader = styled(Title)`
  width: 347px;
  height: 33px;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #000b40;
`;
export default StyledContent;
