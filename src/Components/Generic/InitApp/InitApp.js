import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import VerticalRoute from "../../Routes/VerticalRoute";
import GlobalStyle from "../../../Assets/Themes/GlobalStyle";

const InitApp = (props) => {


    return (
        <React.Fragment>
            <Suspense fallback={<p>Loading...</p>}>
                <GlobalStyle lang_id={props.lang_id}/>
                <VerticalRoute/>
            </Suspense>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        lang_id: state.settings.lang_id
    }
};
export default connect(mapStateToProps, null)(InitApp);
