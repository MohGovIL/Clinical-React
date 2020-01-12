import React, {useEffect, useState} from 'react';
import Header from "../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../Utils/Services/API";

const Imaging = (props) => {

    const {t} = useTranslation();

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        (async () => {
            const menuData =  await getMenu(`${props.clinikal_vertical}-client`);
            const menuDataClone = menuData.data.map(menuDataItem => {
                menuDataItem.label = t(menuDataItem.label);
                return menuDataItem;
            });
            setMenuItems(menuDataClone);
        })();
    }, [props.clinikal_vertical]);


    return (
        <React.Fragment>
            <Header Items={menuItems}/>
        </React.Fragment>
    );
};

export default Imaging;
