import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {getFacility} from '../../Store/Actions/FacilityActions/FacilityActions'
import Header from "../../Assets/Elements/Header/Header";
import HeaderItem from "../../Assets/Elements/Header/HeaderItemWrapper/HeaderItem/HeaderItem";
import Search from "../../Assets/Elements/Search/Search";

const GetData = (props) => {
    useEffect(() => {
        props.getFacility();
    }, []);
    return (
        <React.Fragment>
            <Header>
                <HeaderItem>מעקב מטופלים</HeaderItem>
                <HeaderItem>משימות</HeaderItem>
                <HeaderItem>יומן</HeaderItem>
                <HeaderItem>רשימת מטופלים</HeaderItem>
                <HeaderItem>חיובים ותשלומים</HeaderItem>
                <HeaderItem>דוחות</HeaderItem>
                <Search/>
            </Header>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        facilityData: state.facilityData
    }
};


export default connect(mapStateToProps, {getFacility})(GetData);
