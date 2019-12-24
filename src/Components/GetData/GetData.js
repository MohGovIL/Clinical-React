import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {getFacility} from '../../Store/Actions/FacilityActions/FacilityActions'
import Header from "../../Assets/Elements/Header/Header";
import NavigationItemStyle from "../../Assets/Elements/Header/NavigationItems/NavigationItem/NavigationItemStyle";
import Search from "../../Assets/Elements/Search/Search";

const GetData = (props) => {
    useEffect(() => {
        props.getFacility();
    }, []);
    return (
        <React.Fragment>
            <Header>
                <NavigationItemStyle>מעקב מטופלים</NavigationItemStyle>
                <NavigationItemStyle>משימות</NavigationItemStyle>
                <NavigationItemStyle>יומן</NavigationItemStyle>
                <NavigationItemStyle>רשימת מטופלים</NavigationItemStyle>
                <NavigationItemStyle>חיובים ותשלומים</NavigationItemStyle>
                <NavigationItemStyle>דוחות</NavigationItemStyle>
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
