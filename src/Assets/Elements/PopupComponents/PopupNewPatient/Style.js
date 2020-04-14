import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;

  .MuiFilledInput-root {
       background-color: rgba(248, 250, 255, 1);
       min-width: 240px;
       border-radius: 10px 10px 0 0;
   }

    .MuiInputLabel-formControl {
      right: ${props => props.languageDirection === "rtl" ? '0' : 'unset'};
      left: unset;
      line-height: 1.38;
      letter-spacing: normal;
      text-align: right;
      color: #1e2132;
      opacity: 60%;
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
`;

export const StyledColumnFirst = styled.div`
    display: flex;
    flex-direction: column;
    padding: 56px 49px 46px 12px;
    //width: 45%;
`;

export const StyledColumnSecond = styled.div`
    display: flex;
    flex-direction: column;
    padding: 56px 12px 46px 49px;
    //width: 45%;
`;
