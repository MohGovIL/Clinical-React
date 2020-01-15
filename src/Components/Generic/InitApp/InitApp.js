import React, {Suspense} from 'react';
import {getSettingsAction} from '../../../Store/Actions/SettingsActions/SettingsActions';
import {connect} from 'react-redux';
import VerticalRoute from "../../Routes/VerticalRoute";
import GlobalStyle from "../../../Assets/Themes/GlobalStyle";

const InitApp = (props) => {
    return (
        <React.Fragment>
            <Suspense fallback={<p>Loading...</p>}>
                <GlobalStyle lang_id={props.lang_id}/>
                <VerticalRoute clinikal_vertical={props.clinikal_vertical}/>
            </Suspense>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        status: state.settings.STATUS,
        clinikal_vertical: state.settings.clinikal_vertical,
        lang_id: state.settings.lang_id

    }
};
export default connect(mapStateToProps, {getSettingsAction})(InitApp);
