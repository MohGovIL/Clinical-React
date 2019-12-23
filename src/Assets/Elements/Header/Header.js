import React from 'react';
import HeaderWrapper from "./HeaderWrapper/HeaderWrapper";
import HeaderItemWrapper from "./HeaderItemWrapper/HeaderItemWrapper";
import HeaderItem from "./HeaderItemWrapper/HeaderItem/HeaderItem";

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderItemWrapper>
                <HeaderItem active>מעקב מטופלים</HeaderItem>
                <HeaderItem >משימות</HeaderItem>
                <HeaderItem >יומן</HeaderItem>
                <HeaderItem >רשימת מטופלים</HeaderItem>
                <HeaderItem >חיובים ותשלומים</HeaderItem>
                <HeaderItem >דוחות</HeaderItem>
                <HeaderItem >הגדרות</HeaderItem>
            </HeaderItemWrapper>
        </HeaderWrapper>
    );
};

export default Header;
