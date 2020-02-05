import React, {useState} from 'react';
import StyledAppBar from './Style';
import StatusFilterBoxTabs from "./StatusFilterBoxTabs";
import {devicesValue} from "../../Themes/BreakPoints";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from 'react-redux';
import {setStatusFilterBoxValueAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param tabs - array
 * @param setStatusFilterBoxIndexAction - redux action
 * @param tabsIndex - redux prop
 * @example [{tabName: string, count: Number}]
 * @returns {Component}
 * @constructor
 */
const StatusFilterBox = ({tabs, setStatusFilterBoxValueAction, tabsValue}) => {

    const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);



    const tabsHandler = tabsValue => {
        setStatusFilterBoxValueAction(tabsValue)
    };

    return (
        <StyledAppBar>
            <StatusFilterBoxTabs value={tabsValue} tabs={tabs}
                                 tabsHandler={tabsHandler} orientation={matches ? "vertical" : "horizontal"}/>
        </StyledAppBar>
    );
};

const mapStateToProps = state => {
    return {
        tabsValue: state.imaging.statusFilterBoxValue
    }
};

export default connect(mapStateToProps, {setStatusFilterBoxValueAction})(StatusFilterBox);
