import React from 'react';
import StyledStatusFilterBoxTab from './Style';
import StyledFilterBoxBadge from "./StyledFilterBoxBadge/Style";

const StatusFilterBoxTab = ({label, selected, tabIndex, tabHandler, count}) => {
    const badge = <StyledFilterBoxBadge badgeContent={count} color={'primary'} selected={selected} />;

    return (
        <StyledStatusFilterBoxTab label={label} icon={badge} selected={selected}
                                              onClick={() => tabHandler(tabIndex)}
                                              wrapped={true}>
        </StyledStatusFilterBoxTab>
    );
};

export default StatusFilterBoxTab;
