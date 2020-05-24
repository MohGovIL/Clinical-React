import styled from 'styled-components';

export const StyledAvatarIdBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  .MuiIconButton-root {
    display: flex;
    border-radius: unset;
    align-self: flex-end;
  }

  .MuiTypography-root {
    align-self: center;
    font-weight: bold;
    color: #000b40;
    max-width: 250px;
  }
`;

export const StyledRoundAvatar = styled.div`
  display: flex;
  align-self: center;
  border: ${(props) =>
    props.show_red_circle === true ? '3px solid #ff3232' : null};
  padding: 11px;
  border-radius: 72px;
  margin: 5px 0 10px 0;

  .MuiAvatar-root {
    width: 72px;
    height: 72px;
  }
`;

export const StyledEmptyIconEdit = styled.div`
  padding: 12px;
  height: 24px;
  width: 24px;
`;

export const StyledAgeIdBlock = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 16px 0 16px 0;

  span {
    align-content: center;
    display: flex;
    color: #000b40;
    font-size: 16px;
  }
`;
