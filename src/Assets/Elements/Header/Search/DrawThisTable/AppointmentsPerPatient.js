import React from 'react';


const  AppointmentsPerPatient  =  ({nextAppointment,prevEncounter}) => {
debugger;



        return (
            <React.Fragment>
                {nextAppointment && nextAppointment.data && nextAppointment.data.total > 0 ? JSON.stringify(nextAppointment.data):''}
                {prevEncounter && prevEncounter.data && prevEncounter.data.total >0 ? JSON.stringify(prevEncounter.data) :''}
            </React.Fragment>
        );

};


export default AppointmentsPerPatient;
