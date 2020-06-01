import styled from 'styled-components';

export const StyledForm = styled.div`
  justify-content: space-between;

  .MuiFilledInput-root {
    background-color: rgba(248, 250, 255, 1);
    min-width: 240px;
    max-width: 240px;
    border-radius: 10px 10px 0 0;
  }

  .MuiInputLabel-formControl {
    left: unset;
    color: #000b40;
    font-size: 16px;
    direction: ${(props) =>
      props.languageDirection === 'rtl' ? 'ltr' : 'rtl'};
  }

  .MuiInputLabel-formControl .MuiInputLabel-asterisk {
    color: #076ce9;
  }

  .MuiInputLabel-shrink .MuiInputLabel-asterisk {
    color: #1e2132;
  }

  .MuiInputLabel-shrink {
    color: #1e2132;
    opacity: 60%;
    right: 0;
    margin-right: 2px;
    transform-origin: top right;
  }

  .MuiInputLabel-filled {
    line-height: 1.38;
    letter-spacing: normal;
    text-align: right;
    color: #1e2132;
    margin-right: 20px;
  }

  .MuiSelect-iconFilled {
    position: unset;
    margin-left: 17px;
    right: 10px;
    pointer-events: bounding-box;
  }

  .MuiFormControl-root {
    margin: 0 0 46px 0;
  }

  .MuiFormHelperText-root {
    position: absolute;
    top: 56px;
  }

  .MuiInputLabel-root {
  }

  .MuiSelect-filled.MuiSelect-filled,
  .MuiSelect-select.MuiSelect-select {
    padding-right: 12px;
  }
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledColumnFirst = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding: 56px 49px 0 12px;
  width: 45%;
`;

export const StyledColumnSecond = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding: 56px 12px 0 49px;
  width: 45%;
`;

export const StyledRowEmail = styled.div`
  flex-direction: row;
  padding: 0 49px 0 49px;

  .MuiInputBase-root {
    min-width: 504px;
  }
`;
