import React, {useEffect, useState} from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../Utils/Services/API";
import {getAppointment} from "../../Utils/Services/FhirAPI";
import {connect} from 'react-redux';

const Imaging = ({clinikalVertical}) => {

    const {t} = useTranslation();

    const [menuItems, setMenuItems] = useState([]);

    const [appointments, setAppointments] = useState();

    //Gets the menu items
    useEffect(() => {
        (async () => {
            try{
            const menuData =  await getMenu(`${clinikalVertical}-client`);

            // console.log(data + 'appointment');
            const menuDataClone = menuData.data.map(menuDataItem => {
                menuDataItem.label = t(menuDataItem.label);
                return menuDataItem;
            });
            setMenuItems(menuDataClone);
            const {data} = await getAppointment();
            }catch (err) {console.log(err)}
        })();
    }, [clinikalVertical]);

    return (
        <React.Fragment>
            <Header Items={menuItems}/>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        clinikalVertical: state.settings.clinikal_vertical
    }
};

export default connect(mapStateToProps, null)(Imaging);
