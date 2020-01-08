import React from 'react';
import Header from "../../Assets/Elements/Header";

const Imaging = () => {
    //Simulate API data
    const simulateAPI = [
        {Label: 'Patient', Link: '/Patient', SubMenu: null},
        {Label: 'Calendar', Link: '/Calendar', SubMenu: null},
        {Label: 'Missions', Link: '/Missions', SubMenu: null},
        {Label: 'Reports', Link: '/Reports', SubMenu: null},
    ];
    return (
        <React.Fragment>
            <Header Items={simulateAPI}/>
        </React.Fragment>
    );
};

export default Imaging;
