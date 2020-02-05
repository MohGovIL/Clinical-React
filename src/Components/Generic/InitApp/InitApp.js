import React, {Suspense} from 'react';
import {getSettingsAction} from '../../../Store/Actions/SettingsActions/SettingsActions';
import {connect} from 'react-redux';
import VerticalRoute from "../../Routes/VerticalRoute";
import GlobalStyle from "../../../Assets/Themes/GlobalStyle";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {devicesKey, devicesValue} from "../../../Assets/Themes/BreakPoints";

const InitApp = (props) => {

    const theme = createMuiTheme({
        breakpoints: {
            keys: [...devicesKey],
            values: {...devicesValue}
        },
    });

    return (
        <React.Fragment>
            <Suspense fallback={<p>Loading...</p>}>
                <GlobalStyle languageDirection={props.languageDirection}/>
                <ThemeProvider theme={theme}>
                    <VerticalRoute/>
                </ThemeProvider>
            </Suspense>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir
    }
};
export default connect(mapStateToProps, {getSettingsAction})(InitApp);
