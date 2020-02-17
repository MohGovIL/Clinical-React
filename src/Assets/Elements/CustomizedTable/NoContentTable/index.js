import React from 'react';
import StyledNoContentTable from './Style';
import NoContentTablePic from '../../../Images/NoContentTable.png';
import {StyledSpan, Styledh1} from './Style';
const NoContentTable = () => {
    return (
        <StyledNoContentTable>
            <img alt={'No Content'} src={NoContentTablePic}/>
            <Styledh1>אין מוזמנים ליום זה</Styledh1>
            <StyledSpan>עודכן בשעה: 11:45</StyledSpan>
        </StyledNoContentTable>
    );
};

export default NoContentTable;
