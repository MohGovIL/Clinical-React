import React from 'react';
import Routes from "../Routes/Routes";
import GlobalStyle from "../../Assets/Elements/GlobalStyle";

const App = () => {

    return (
        <React.Fragment>
            <GlobalStyle rtl/>
            <Routes/>
        </React.Fragment>
    )
};

export default App;
