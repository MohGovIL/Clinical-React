import React from 'react';
import Routes from "../Routes/Routes";
import {StylesProvider} from '@material-ui/core/styles'

const App = () => {

    return (
        <React.Fragment>
            <StylesProvider injectFirst>
                <Routes/>
            </StylesProvider>
        </React.Fragment>
    )
};

export default App;
