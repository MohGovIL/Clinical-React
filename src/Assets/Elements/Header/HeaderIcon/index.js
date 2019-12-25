import React from 'react';
import Style from "./Style";
import CentralizedDiv from "../../CentralizedDiv";

const HeaderIcon = ({onClick, src, alt, width, height, children}) => {
    return (
        <CentralizedDiv>
            <Style src={src} alt={alt} width={width} height={height} onClick={onClick}/>
            {children}
        </CentralizedDiv>
    );
};

export default HeaderIcon;
