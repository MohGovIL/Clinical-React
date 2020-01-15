import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const ProviderWrapper = ({children, store}) => (
    <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </Provider>
);

export default ProviderWrapper;
