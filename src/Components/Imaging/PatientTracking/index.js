import React, {useEffect, useState} from 'react';
import PatientTrackingStyle, {StyledFilterBox, TableRowStyle} from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {connect} from "react-redux";
import Header from "../../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../../Utils/Services/API";
import FilterBox from "./FilterBox";
import Title from "../../../Assets/Elements/Title";
import isAllowed from "../../../Utils/Helpers/isAllowed";
import {finishedTabActiveFunction, finishedTabNotActiveFunction} from "../../../Utils/Helpers/patientTrackingTabs/setPatientDataFinishedTableRows";
import {invitedTabActiveFunction, invitedTabNotActiveFunction} from "../../../Utils/Helpers/patientTrackingTabs/setPatientDataInvitedTableRows";
import {waitingForExaminationTabActiveFunction, waitingForExaminationTabNotActiveFunction} from "../../../Utils/Helpers/patientTrackingTabs/setPatientDataWaitingForExaminationTableRows";
import {waitingForResultsTabActiveFunction, waitingForResultsTabNotActiveFunction} from "../../../Utils/Helpers/patientTrackingTabs/setPatientWaitingForResultsTableRows";


const PatientTracking = ({vertical, history, selectFilter}) => {
    const {t} = useTranslation();

    //The tabs of the Status filter box component.
    const [tabs, setTabs] = useState([]);

    //table is an array of 2 arrays inside. First array represents the table headers, the second array represents the table data combined them together so it won't be making double rendering.
    const [[tableHeaders, tableData], setTable] = useState([[], []]);

    //The headers menu items
    const [menuItems, setMenuItems] = useState([]);

    //Create an array of permitted tabs according to the user role.
    useEffect(() => {
        let allTabs = [
            // Do not change the tabValue if want to change the order just change their place in the array,
            // because there are functionality that depends on the tabValue because it (the tabs) needs to be customized
            // meaning sometimes you have to show them and sometimes you need to add more tabs in between.
            {
                tabName: 'Invited',
                id: 'invited',
                mode: 'hide',
                count: 0,
                tabValue: 0,
                activeAction: invitedTabActiveFunction,
                notActiveAction: invitedTabNotActiveFunction,
            },
            {
                tabName: 'Waiting for examination',
                id: 'waiting_for_examination',
                mode: 'hide',
                count: 0,
                tabValue: 1,
                activeAction: waitingForExaminationTabActiveFunction,
                notActiveAction: waitingForExaminationTabNotActiveFunction
            },
            {
                tabName: 'Waiting for decoding',
                id: 'waiting_for_decoding',
                mode: 'hide',
                count: 0,
                tabValue: 2,
                activeAction: waitingForResultsTabActiveFunction,
                notActiveAction: waitingForResultsTabNotActiveFunction
            },
            {
                tabName: 'Finished',
                id: 'finished',
                mode: 'hide',
                count: 0,
                tabValue: 3,
                activeAction: finishedTabActiveFunction,
                notActiveAction: finishedTabNotActiveFunction
            }
        ];
        for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            isAllowed(tab);
        }
        allTabs = allTabs.filter((tab) => tab.mode !== 'hide');
        setTabs(allTabs);
    }, []);
    //Filter box mechanism for activeTabs
    useEffect(() => {
        for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
            const tab = tabs[tabIndex];
            if (tab.tabValue === selectFilter.statusFilterBoxValue) {
                tab.activeAction(setTable, setTabs, history, selectFilter);
            } else {
                //TODO make this call in a different useEffect because when statusFiltterBoxValue changes
                // there is no need to call `tab.activeAction` only call `tab.notActiveAction`
                tab.notActiveAction(setTabs, selectFilter);
            }
        }
    }, [selectFilter.filter_date, selectFilter.statusFilterBoxValue, selectFilter.filter_service_type, selectFilter.filter_organization]);
    //Gets the menu items
    useEffect(() => {
        (async () => {
            try {
                const menuData = await getMenu(`${vertical}-client`);
                const menuDataClone = menuData.data.map(menuDataItem => {
                    menuDataItem.label = t(menuDataItem.label);
                    return menuDataItem;
                });
                setMenuItems(menuDataClone);
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);

    return (
        <React.Fragment>
            <Header Items={menuItems}/>
            <PatientTrackingStyle>
                <Title label={'Patient tracking'}/>
                <StyledFilterBox>
                    <FilterBox/>
                </StyledFilterBox>
                <TableRowStyle>
                    <StatusFilterBox tabs={tabs}/>
                    <CustomizedTable tableHeaders={tableHeaders} tableData={tableData}/>
                </TableRowStyle>
            </PatientTrackingStyle>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        fhirDataStatus: state.fhirData.STATUS,
        appointments: state.fhirData.appointments,
        patients: state.fhirData.patients,
        vertical: state.settings.clinikal_vertical,
        userRole: state.settings.user_role,
        selectFilter: state.filters
    };
};

export default connect(mapStateToProps, null)(PatientTracking);
