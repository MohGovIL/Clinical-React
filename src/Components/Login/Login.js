import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginAction } from 'Store/Actions/LoginActions/LoginActions';
// import LoginBox from './LoginBox/LoginBox';

import StyledTextField from 'Assets/Elements/StyledTextField';
import { useTranslation } from 'react-i18next';
import CustomizedTableButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';

const Login = (props) => {
  const { t } = useTranslation();

  const [userState, userSetState] = useState({ userName: '', password: '' });

  const userNameHandler = (e) => {
    userSetState({ ...userState, userName: e.target.value });
  };

  const passwordHandler = (e) => {
    userSetState({ ...userState, password: e.target.value });
  };

  const loginHandler = () => {
    props.loginAction(userState.userName, userState.password, props.history);
  };

  return (
    <React.Fragment>
      {/* <LoginBox
        userName={userState.userName}
        password={userState.password}
        userNameHandler={userNameHandler}
        passwordHandler={passwordHandler}
        login={loginHandler}
        status={props.status}
      /> */}
      <StyledTextField
        label={t('User name')}
        error={false}
        helperText={false}
      />
      <StyledTextField
        label={t('Password')}
        type={'password'}
        error={false}
        helperText={false}
      />
      <CustomizedTableButton
        label={t('Login')}
        variant={'contained'}
        color={'Primary'}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.login.isAuth,
    status: state.login.STATUS,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
