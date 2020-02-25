import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 13%;
  align-items: flex-start;
  box-shadow: 0 1px 10px 0 rgba(152, 151, 151, 0.3);
  background-color: #ffffff;
  height: calc(100vh - 88px);
  padding: 8px 16px;

  .MuiIconButton-root {
    display: flex;
    border-radius: unset;
    align-self: flex-end;
  }

  .MuiTypography-root {
    display: flex;
    align-self: center;
    font-weight: bold;
    color: #000b40;
  }

  .MuiDivider-root {
    height: 2px;
    width: 100%;
  }

`;

export const StyledRoundAvatar = styled.div`
    display: flex;
    align-self: center;
    border: 3px solid #ff3232;
    padding: 11px;
    border-radius: 72px;
    margin:5px 0 10px 0;

  .MuiAvatar-root {
    width: 72px;
    height: 72px;
  }
`;

export const StyledAgeIdBlock = styled.div`
    display:flex;
    align-items: stretch;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    p.identifier, p.age {
      align-content: center;
      display: flex;
      color: #000b40;
      font-size: 16px;
    }
`;

export const StyledTextInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    justify-content: space-between;

    .MuiInputLabel-root {
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: normal;
      text-align: right;
      color: #1e2132;
    }
    .MuiTextField-root {
      margin-bottom: 24px;
      width: 100%;
      color: #000b40;
    }
`;
