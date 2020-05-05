import React from "react";
import Link from "@material-ui/core/Link";
import {StyledIconValueComponent} from "../Style";
import {useTranslation} from "react-i18next";

const LinkComponentWithIcon = ({linkUrl, linkHeader,iconType}) => {
    const {t} = useTranslation();
    return (<Link href="linkUrl">
        <label>{t(linkHeader)}
            <StyledIconValueComponent iconType={iconType?iconType:'arrow_back_ios'}/>
        </label>
    </Link>)
}


export default LinkComponentWithIcon;
