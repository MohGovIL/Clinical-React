import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {getFacility} from '../../Store/Actions/FacilityActions/FacilityActions'
import Index from "../../Assets/Elements/Header";
import Style from "../../Assets/Elements/Header/NavigationItems/NavigationItem/Style";
import Index from "../../Assets/Elements/Search";

const GetData = (props) => {
    useEffect(() => {
        props.getFacility();
    }, []);
    return (
        <React.Fragment>
            <Index>
                <Style>מעקב מטופלים</Style>
                <Style>משימות</Style>
                <Style>יומן</Style>
                <Style>רשימת מטופלים</Style>
                <Style>חיובים ותשלומים</Style>
                <Style>דוחות</Style>
                <Index/>
            </Index>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        facilityData: state.facilityData
    }
};


export default connect(mapStateToProps, {getFacility})(GetData);
