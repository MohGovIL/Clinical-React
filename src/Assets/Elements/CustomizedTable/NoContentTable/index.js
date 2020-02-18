import React from 'react';
import StyledNoContentTable from './Style';
import NoContentTablePic from '../../../Images/NoContentTable.png';
import {Styledh1} from './Style';
const NoContentTable = () => {
    return (
        <StyledNoContentTable>
            <img alt={'No Content'} src={NoContentTablePic}/>
            <Styledh1>אין מוזמנים ליום זה</Styledh1>
        </StyledNoContentTable>
    );
};

export default NoContentTable;
