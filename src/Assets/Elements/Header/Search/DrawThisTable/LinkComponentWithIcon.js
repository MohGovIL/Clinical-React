import React from "react";
import Link from "@material-ui/core/Link";
import {StyledIcon, StyledIconText} from "./Style";
import {StyledIconValueComponent} from "../Style";
import {useTranslation} from "react-i18next";

const LinkComponentWithIcon = ({linkUrl, linkHeader}) => {
    const {t} = useTranslation();
    return (<Link href="linkUrl">
        <label>{t(linkHeader)}
            <StyledIconValueComponent iconType='arrow_back_ios'/>
        </label>
    </Link>)
}


export default LinkComponentWithIcon;
