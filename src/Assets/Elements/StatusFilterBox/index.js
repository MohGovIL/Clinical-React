import React, {useState} from 'react';
import StyledAppBar from './Style';
import StatusFilterBoxTabs from "./StatusFilterBoxTabs";
import {devicesValue} from "../../Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from 'react-redux';
import {setStatusFilterBoxIndexAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param tabs - array
 * @param setStatusFilterBoxIndexAction - redux action
 * @param tabsIndex - redux prop
 * @example [{tabName: string, count: Number}]
 * @returns {Component}
 * @constructor
 */
const StatusFilterBox = ({tabs, setStatusFilterBoxIndexAction, tabsIndex}) => {

    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);


    const [tabsValue, setTabsValue] = useState(0);

    const tabsHandler = (tabsIndex) => {
        setStatusFilterBoxIndexAction(tabsIndex)
    };

    return (
        <StyledAppBar>
            <StatusFilterBoxTabs value={tabsIndex} tabs={tabs}
                                 tabsHandler={tabsHandler} orientation={matches ? "vertical" : "horizontal"}/>
        </StyledAppBar>
    );
};

const mapStateToProps = state => {
    return {
        tabsIndex: state.patientTracking.statusFilterBoxIndex
    }
};

export default connect(mapStateToProps, {setStatusFilterBoxIndexAction})(StatusFilterBox);
