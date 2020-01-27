import React from 'react';
import StyledHeaderDropDown from './Style';
import HeaderDropDownItem from "./HeaderDropDownItems";
import Divider from "@material-ui/core/Divider";

const HeaderDropDown = (props) => {

    return (
        <StyledHeaderDropDown isOpen={props.isOpen}>
            {props.Items.map((item, itemIndex) => {
                return (
                    <React.Fragment key={itemIndex}>
                        <HeaderDropDownItem Label={item.Label} Function={item.func} />
                        {props.Items.length - 1 === itemIndex ? null : <Divider/>}
                    </React.Fragment>
                )
            })}
        </StyledHeaderDropDown>
    );
};

export default HeaderDropDown;
