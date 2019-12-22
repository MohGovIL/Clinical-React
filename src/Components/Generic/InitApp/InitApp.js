import React, {Suspense} from 'react';
import Loader from "../../../Assets/Elements/Loader/Loader";
import {getSettingsAction} from '../../../Store/Actions/SettingsActions/SettingsActions';
import {connect} from 'react-redux';
import GlobalStyle from "../../../Assets/Elements/GlobalStyle";
import VerticalRoute from "../../Routes/VerticalRoute";

const InitApp = (props) => {
    return (
        <React.Fragment>
            <GlobalStyle/>
            <Suspense fallback={<Loader/>}>
                <VerticalRoute verticalName={props.clinikal_vertical}/>
            </Suspense>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        status: state.settings.STATUS,
        clinikal_vertical: state.settings.clinikal_vertical
    }
};
export default connect(mapStateToProps, {getSettingsAction})(InitApp);
