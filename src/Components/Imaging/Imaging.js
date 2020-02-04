import React, {useEffect, useState} from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../Utils/Services/API";
import {connect} from 'react-redux';
import PatientTracking from "./PatientTracking";


const Imaging = ({clinikalVertical}) => {

    const {t} = useTranslation();

    const [menuItems, setMenuItems] = useState([]);


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


    //TODO
    //In the future there will be a routing for each component
    return (
        <React.Fragment>
            <Header Items={menuItems}/>{/*TODO Change name from Items to tabs or something more meaningful*/}
            <PatientTracking/>
        </React.Fragment>
    );
};
//TODO (clinicalVertical) can also be hard coded to 'imaging' since this is an imaging component the only concern I have is in case of typo error so leave it like that for now
const mapStateToProps = state => {
    return {
        clinikalVertical: state.settings.clinikal_vertical

    }
};

export default connect(mapStateToProps, null)(Imaging);
