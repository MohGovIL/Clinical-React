import React from 'react';
import Header from "../../Assets/Elements/Header/Header";

const Imaging = () => {
    //Simulate API data
    const simulateAPI = [
        {Title: 'Patient', Link: '/Patient', SubMenu: null},
        {Title: 'Diary', Link: 'Diary', SubMenu: null},
        {Title: 'Missions', Link: '/Missions', SubMenu: null},
        {Title: 'Reports', Link: '/Reports', SubMenu: null},
        {Title: 'System Management', Link: '/System Management', SubMenu: null}
    ];
    return (
        <React.Fragment>
            <Header Items={simulateAPI}/>
        </React.Fragment>
    );
};

export default Imaging;
