import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
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
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentsWithPatients";
import {store} from "../../../index";

const implementMeActive = () => {
    console.log('Implement me active :D')
};

const implementMeNotActive = () => {
    console.log('Implement me not active :D')
};

//Using normal function not arrow just to get the Object as this inside the function do that kind of function for each of the tabs,
const invitedTabActiveFunction = async function (setTable, setTabs, history) {
    try {
        const appointmentsWithPatients = await getAppointmentsWithPatients();
        const [patients, appointments] = normalizeFhirAppointmentsWithPatients(appointmentsWithPatients.data.entry);
        //TODO
        //When there will be actual API for list make the api call here and pass it as options.
        const options = [
            {
                display: 'hey',
                code: 1,
            }
        ];
        const table = setPatientDataInvitedTableRows(patients, appointments, options, history);
        setTable(table);
        setTabs(prevState => {
                const prevStateClone = [...prevState];
                prevStateClone[this.tabValue].count = appointmentsWithPatients.data.total;
                return [
                    ...prevStateClone
                ]
            }
        );
        store.dispatch(setAppointmentsWithPatientsAction(patients, appointments));
    } catch (err) {
        console.log(err);
    }
};

const allTabs = [
    {
        tabName: 'Invited',
        count: 0,
        tabValue: 0,
        activeAction: invitedTabActiveFunction,
        notActiveAction: implementMeNotActive,
        permission: ['admin'],
    },
    {
        tabName: 'Waiting for examination',
        count: 0,
        tabValue: 1,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['admin']
    },
    {
        tabName: 'Waiting for decoding',
        count: 0,
        tabValue: 2,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['p']
    },
    {
        tabName: 'Finished',
        count: 0,
        tabValue: 3,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['admin']
    }
];

const PatientTracking = ({vertical, status, history, userRole}) => {
    const {t} = useTranslation();

    //The tabs of the Status filter box component.
    const [tabs, setTabs] = useState(allTabs);

    //table is an array of 2 arrays inside. First array represents the table headers, the second array represents the table data combined them together so it won't be making double rendering.
    const [[tableHeaders, tableData], setTable] = useState([[], []]);

    //The headers menu items
    const [menuItems, setMenuItems] = useState([]);

    //Create an array of permitted tabs according to the user role.
    useEffect(() => {
        const permittedTabs = [];
        for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            // eslint-disable-next-line no-unused-expressions
            tab.permission.some(role => userRole.includes(role)) ? permittedTabs.push(tab) : null
        }
        setTabs(permittedTabs);
    }, [userRole]);
    //Filter box mechanism
    useEffect(() => {
        (async () => {
            try {
                for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                    const tab = tabs[tabIndex];
                    if (tab.tabValue === status) {
                        tab.activeAction(setTable, setTabs, history);
                    } else {
                        tab.notActiveAction();
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [status]);
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
                <StatusFilterBox tabs={tabs}/>
                <CustomizedTable tableHeaders={tableHeaders} tableData={tableData}/>
            </PatientTrackingStyle>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        // patientsData: state.imaging.patientsData,
        appointments: state.fhirData.appointments,
        patients: state.fhirData.patients,
        vertical: state.settings.clinikal_vertical,
        status: state.filters.statusFilterBoxValue,
        userRole: state.settings.user_role
    };
};

export default connect(mapStateToProps, null)(PatientTracking);
