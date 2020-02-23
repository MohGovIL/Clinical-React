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
import {store} from "../../../index";
import FilterBox from "./FilterBox";
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
        const appointmentsWithPatients = await getAppointmentsWithPatients('', selectFilter.filter_organization, selectFilter.filter_service_type);
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
        id: 'invited',
        mode:'hide',
        count: 0,
        tabValue: 0,
        activeAction: invitedTabActiveFunction,
        notActiveAction: implementMeNotActive
    },
    {
        tabName: 'Waiting for examination',
        id: 'Waiting_for_examination',
        mode:'hide',
        count: 0,
        tabValue: 1,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive
    },
    {
        tabName: 'Waiting for decoding',
        id: 'Waiting_for_decoding',
        mode:'hide',
        count: 0,
        tabValue: 2,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive
    },
    {
        tabName: 'Finished',
        id: 'finished',
        mode:'hide',
        count: 0,
        tabValue: 3,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive
    }
];

const PatientTracking = ({vertical, status, history, userRole, selectFilter}) => {
    const {t} = useTranslation();

    //The tabs of the Status filter box component.
    const [tabs, setTabs] = useState(allTabs);

    //table is an array of 2 arrays inside. First array represents the table headers, the second array represents the table data combined them together so it won't be making double rendering.
    const [[tableHeaders, tableData], setTable] = useState([[], []]);

    //The headers menu items
    const [menuItems, setMenuItems] = useState([]);

    //Create an array of permitted tabs according to the user role.
    useEffect(() => {
        /*for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            // eslint-disable-next-line no-unused-expressions
            tab.permission.some(role => userRole.includes(role)) ? permittedTabs.push(tab) : null
        }*/
        for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            //set tab acl role.
            isAllowed(tab);
        }
        const permittedTabs =  allTabs.filter((tab, tabIndex) => {
            return tab.mode !== 'hide';
        });
        setTabs(permittedTabs);
    }, []);
    //Filter box mechanism
    useEffect(() => {
        (async () => {
            try {
                for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                    const tab = tabs[tabIndex];
                    if (tab.tabValue === status) {
                        tab.activeAction(setTable, setTabs, history, selectFilter);
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
        appointments: state.fhirData.appointments,
        patients: state.fhirData.patients,
        vertical: state.settings.clinikal_vertical,
        status: state.filters.statusFilterBoxValue,
        userRole: state.settings.user_role,
        selectFilter: state.filters
    };
};

export default connect(mapStateToProps, null)(PatientTracking);
