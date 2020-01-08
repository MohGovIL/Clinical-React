import React from "react";
import Header from "./index";
import {connect} from "react-redux";
import {logoutAction} from "../../../Store/Actions/LoginActions/LoginActions";

export default { title: 'Header' }

export const normalHeader = () => {
    return connect(null, {logoutAction})(<Header />);
};
