import styled from "styled-components";
import Badge from "@material-ui/core/Badge";

const StyledFilterBoxBadge =  styled(Badge)`
    margin: 0 !important;
   & .MuiBadge-colorPrimary{
    background-color: ${props => !props.selected ? '#f5f5f5' : null };
    color: ${props => !props.selected ? '#020e38' : null };
   }

   & .MuiBadge-anchorOriginTopRightRectangle {
    position: relative;
    display: flex;
    transform: translate(-25%, 0);
   }
`;

export default StyledFilterBoxBadge;
