import React from 'react';
import StyledStatusFilterBoxTab from './Style';
import StyledFilterBoxBadge from "./StyledFilterBoxBadge/Style";
import CustomizedTableBadge from "../../../CustomizedTable/CustomizedTableBadge";
//TODO fix the flex layout so the items inside (Label and badge) look the same way they are in Zeplin aligned right
    const StatusFilterBoxTab = ({label, selected, tabValue, tabHandler, count}) => {
    const badge = <StyledFilterBoxBadge badgeContent={count} color={'primary'} selected={selected} />;

    return (
        <StyledStatusFilterBoxTab label={label} icon={badge} selected={selected}
                                              onClick={() => tabHandler(tabValue)}
                                              wrapped={true}>
            <CustomizedTableBadge badgeContent={10} />
        </StyledStatusFilterBoxTab>
    );
};

export default StatusFilterBoxTab;
