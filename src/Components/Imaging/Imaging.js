import React, {useEffect, useState} from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../Utils/Services/API";
import {getAppointment} from "../../Utils/Services/FhirAPI";
import {connect} from 'react-redux';
import PatientTracking from "./PatientTracking";
import {normalizeAppointmentData} from "../../Utils/Helpers/normalizeFhirAppointmentData";


const Imaging = ({clinikalVertical}) => {

    const {t} = useTranslation();

    const [menuItems, setMenuItems] = useState([]);

    const [appointments, setAppointments] = useState([]);

    //Gets the menu items
    useEffect(() => {
        (async () => {
            try {
                const menuData = await getMenu(`${clinikalVertical}-client`);
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

    //Gets Appointment data
    useEffect(() => {
        (async () => {
            try {
                const {data} = await getAppointment();
                const normalizedAppointmentData = normalizeAppointmentData(data.entry);
                setAppointments(normalizedAppointmentData);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);



    //TODO
    //In the future there will be a routing for each component
    return (
        <React.Fragment>
            <Header Items={menuItems}/>{/*TODO Change name from Items to tabs or something more meaningful*/}
            <PatientTracking appointments={appointments} />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        clinikalVertical: state.settings.clinikal_vertical
    }
};

export default connect(mapStateToProps, null)(Imaging);
