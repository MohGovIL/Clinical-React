import React from 'react';
import Imaging from 'Components/Imaging/Imaging';
import Emergency from 'Components/Emergency/Emergency';
import { Switch } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import { connect } from 'react-redux';
import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';


const VerticalRoute = ({ isAuth }) => {
  return (
    <Switch>
      <PrivateRoute
        exact
        path={`${baseRoutePath()}/imaging/:page`}
        component={Imaging}
        isAuth={isAuth}
      />
      <PrivateRoute
        exact
        path={`${baseRoutePath()}/emergency/:page`}
        component={Emergency}
        isAuth={isAuth}
       />
    </Switch>
  );
};

const mapStateToProps = (state) => ({ isAuth: state.login.isAuth });

export default connect(mapStateToProps, null)(VerticalRoute);
