import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import VerticalRoute from "../../Routes/VerticalRoute";
import GlobalStyle from "../../../Assets/Themes/GlobalStyle";
import CircularProgress from "@material-ui/core/CircularProgress";

const InitApp = ({lang_id,languageDirection}) => {


    return (
        <React.Fragment>
            <Suspense fallback={<CircularProgress />}>
                <GlobalStyle lang_id={lang_id} language_direction={languageDirection}/>
                <VerticalRoute/>
            </Suspense>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        lang_id: state.settings.lang_id,
        languageDirection: state.settings.lang_dir
    }
};
export default connect(mapStateToProps, null)(InitApp);
