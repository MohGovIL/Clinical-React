import React, {useEffect, useState} from 'react';
// import AppBar from "@material-ui/core/AppBar";
import StyledAppBar from "./Style";
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const HeaderPatient = (makeBread) => {
    let breadcrumbValues = [];
    const handleClick = () => {
        console.log("i'll be pressed ");
    };

    breadcrumbValues = makeBread.makeBread;

    return (
        <StyledAppBar>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small"/>}>
                {breadcrumbValues.map((option, optionIndex) =>
                    <Link color="inherit" href="#" onClick={handleClick}>{option["text"]}</Link>
                )}
                {/*<Link color="inherit" href="#" onClick={handleClick}>*/}
                {/*    Material-UI*/}
                {/*</Link>*/}
                {/*<Link color="inherit" href="#" onClick={handleClick}>*/}
                {/*    Core*/}
                {/*</Link>*/}
                {/*<Typography color="textPrimary">Breadcrumb</Typography>*/}
            </Breadcrumbs>
        </StyledAppBar>
    );
};
export default HeaderPatient;
