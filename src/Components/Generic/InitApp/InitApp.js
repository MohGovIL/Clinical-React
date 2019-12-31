import React, {Suspense} from 'react';
import {getSettingsAction} from '../../../Store/Actions/SettingsActions/SettingsActions';
import {connect} from 'react-redux';
import VerticalRoute from "../../Routes/VerticalRoute";

const InitApp = (props) => {
    return (
        <React.Fragment>
            <Suspense fallback={<p>Loading...</p>}>
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
