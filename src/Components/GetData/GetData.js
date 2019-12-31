import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {getFacility} from '../../Store/Actions/FacilityActions/FacilityActions'

const GetData = (props) => {
    useEffect(() => {
        props.getFacility();
    }, []);
    return (
        <React.Fragment>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        facilityData: state.facilityData
    }
};


export default connect(mapStateToProps, {getFacility})(GetData);
