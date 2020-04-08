import styled from "styled-components";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

export const StyledMuiDialogTitle = styled(MuiDialogTitle)`
  background-color: #ddecff !important;

 .MuiTypography-root {
   color: #000b40;
  }

 .MuiIconButton-root {
   left: ${props => props.language_direction === "rtl" ? "0px" : null};
   right: ${props => props.language_direction === "ltr" ? "0px" : null};
   top: 8px;
   position: absolute;
 }

 .MuiSvgIcon-root {
   fill: #000d37;
 }

`;

export const StyledDialogActions = styled(DialogActions)`
    justify-content: center;
    align-items: center;
    padding: 32px 0 32px 0;
    .MuiButton-root{
      margin: 0 16px 0 16px;
    }
`;
