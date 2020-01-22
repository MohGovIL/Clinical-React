import React from 'react';
import StyledAppointmentsStatusFilterBoxTab from './Style';
import Badge from "@material-ui/core/Badge";

const AppointmentsStatusFilterBoxTab = (props) => {
    return (
        <React.Fragment>
            <StyledAppointmentsStatusFilterBoxTab label={props.Label} selected={props.selected}
                                                  onClick={() => props.tabHandler(props.tabIndex)}/>
                                                  <Badge badgeContent={10} color='primary' />
        </React.Fragment>
    );
};

export default AppointmentsStatusFilterBoxTab;
