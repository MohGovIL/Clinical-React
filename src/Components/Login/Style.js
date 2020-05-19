import styled from 'styled-components';

const StyledLogin = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  direction: rtl;
`;

export default StyledLogin;

export const StyledDivider = styled.hr`
  width: 80px;
  height: 2px;
  color: #002398;
  background-color: #002398;
`;

export const LoginTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 96px 0 122px 0;
  & .MuiTypography-root {
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 6px;
    color: #002398;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 286px;
  & > .MuiTypography-root {
    font-size: 32px;
    color: #000b40;
  }
`;

export const LoginLogo = styled.img`
  object-fit: contain;
`;
