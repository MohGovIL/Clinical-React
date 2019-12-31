import React from 'react';
import Style from "./Style";
import HeaderDropdownItem from "./HeaderDropdownItem";


const HeaderDropDownItems = (props) => {
    return (
        <Style>
            {props.Items.map((item, itemIndex) => {
                return <HeaderDropdownItem Item={item} key={itemIndex} />
            })}
        </Style>
    );
};

export default HeaderDropDownItems;
