import React, {useEffect, useState} from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../Utils/Services/API";
import {getAppointment} from "../../Utils/Services/FhirAPI";
import {connect} from 'react-redux';
import PatientTracking from "./PatientTracking";


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
                normalizeAppointmentData(data.entry);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const normalizeAppointmentData = (appointmentsData) => {
        const appointmentsArray = [];
        const patientsObj = {};
        //Looping over the appointments data and store all the Patients in an array like a dictionary for O(1)
        for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
            const entry = appointmentsData[entryIndex].resource;
            if (entry.resourceType === 'Patient') {
                const patientsObjItem = {
                    id: entry.id,
                    identifier: entry.identifier[0].value,
                    firstName: entry.name[0].given[0],
                    middleName: entry.name[0].given[1],
                    lastName: entry.name[0].family,
                    telecom: [entry.telecom],
                    gender: entry.gender,
                    birthDate: entry.birthDate,
                };
                patientsObj[`${entry.id}`] = {patientsObjItem};
            }
        }
        for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
            const entry = appointmentsData[entryIndex].resource;
            if (entry.resourceType === 'Appointment') {
                const patientInAppointment = entry.participant.find(actorObj => actorObj.actor.reference.includes('Patient'));
                const healthCareService = entry.participant.find(actorObj => !actorObj.actor.reference.includes('Patient'));
                const appointmentsArrayItem = {
                    status: entry.status,
                    healthCareService: healthCareService.actor.display,
                    examination: entry.serviceType[0].text,
                    time: entry.start,
                    participants: {...patientsObj[patientInAppointment.actor.reference.split("/")[1]]}
                };
                appointmentsArray.push(appointmentsArrayItem);
            }
        }
        console.log(appointmentsArray);
        setAppointments(appointmentsArray);
    };

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
