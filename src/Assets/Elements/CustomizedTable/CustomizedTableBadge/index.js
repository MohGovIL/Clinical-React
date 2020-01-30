import React from 'react';
import StyledBadge from './Style'

const StyledTableBadge = ({badgeContent}) => {
    return (
        <StyledBadge badgeContent={badgeContent}>
            <b>{badgeContent}</b>
        </StyledBadge>
    );
};

export default StyledTableBadge;
