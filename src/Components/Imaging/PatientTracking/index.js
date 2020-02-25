import React, {useEffect, useState} from 'react';
import PatientTrackingStyle, {StyledFilterBox, TableRowStyle} from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getValueSet} from "../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";
import {setAppointmentsWithPatientsAction} from "../../../Store/Actions/FhirActions/fhirActions";
import Header from "../../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../../Utils/Services/API";
import setPatientDataInvitedTableRows from "../../../Utils/Helpers/setPatientDataInvitedTableRows";
import {getAppointmentsWithPatients} from "../../../Utils/Services/FhirAPI";
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointmentsWithPatients";
import {getEncountersWithPatients} from "../../../Utils/Services/FhirAPI";
import {store} from "../../../index";
import FilterBox from "./FilterBox";
import normalizeFhirValueSet from "../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";
import Title from "../../../Assets/Elements/Title";
import isAllowed from "../../../Utils/Helpers/isAllowed";


const implementMeActive = () => {
    console.log('Implement me active :D')
};

const implementMeNotActive = () => {
    console.log('Implement me not active :D')
};

//Using normal function not arrow just to get the Object as this inside the function do that kind of function for each of the tabs,
const invitedTabActiveFunction = async function (setTable, setTabs, history, selectFilter) {
    try {
        const appointmentsWithPatients = await getAppointmentsWithPatients(false, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.filter_service_type);
        const [patients, appointments] = normalizeFhirAppointmentsWithPatients(appointmentsWithPatients.data.entry);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = appointmentsWithPatients.data.total;
            return prevTabsClone;
        });
        const {data: {expansion: {contains}}} = await getValueSet('patient_tracking_statuses');
        let options = [];
        for(let status of contains){
            options.push(normalizeFhirValueSet(status));
        }
        const table = setPatientDataInvitedTableRows(patients, appointments, options, history);
        setTable(table);

        store.dispatch(setAppointmentsWithPatientsAction(patients, appointments));
    } catch (err) {
        console.log(err);
    }
};
//TODO
// this function will be generic for all the NotActive tabs and will be handled with Promise.all[] and check if prevState
// of the tabs is the same in all of the response
const invitedTabNotActiveFunction = async function (setTabs, selectFilter) {
    try{
        const appointmentsWithPatientsSummaryCount = await getAppointmentsWithPatients(true, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.serviceType);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = appointmentsWithPatientsSummaryCount.data.total
            return prevTabsClone;
        });
    }catch (err) {
        console.log(err);
    }
};

const waitingForExaminationTabActiveFunction = async function () {
    try {
        const encounterWithPatients = await getEncountersWithPatients();
        console.log(encounterWithPatients);

    } catch (err) {
        console.log(err);
    }
    //Call a normalizer for encounter patient
};


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
                notActiveAction: implementMeNotActive
            },
            {
                tabName: 'Waiting for decoding',
                id: 'waiting_for_decoding',
                mode: 'hide',
                count: 0,
                tabValue: 2,
                activeAction: implementMeActive,
                notActiveAction: implementMeNotActive
            },
            {
                tabName: 'Finished',
                id: 'finished',
                mode: 'hide',
                count: 0,
                tabValue: 3,
                activeAction: implementMeActive,
                notActiveAction: implementMeNotActive
            }
        ];
        for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            isAllowed(tab);
        }
        allTabs = allTabs.filter((tab) => tab.mode !== 'hide');
        setTabs(allTabs);
    }, []);
    //Filter box mechanism
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
