import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loginAction } from 'Store/Actions/LoginActions/LoginActions';
import bg from 'Assets/Images/bg.svg';
import loginLogo from 'Assets/Images/logo.svg';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { useTranslation } from 'react-i18next';
import CustomizedTableButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';
import StyledLogin, {
  LoginForm,
  LoginTitle,
  LoginLogo,
  StyledDivider,
  StyledErrorChip,
} from './Style';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import LoginBG from './LoginBG';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { loginInstance } from 'Utils/Services/AxiosLoginInstance';

const Login = ({ loginAction, history, status }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      userName: '',
      password: '',
    },
    submitFocusError: true,
  });
  const { t } = useTranslation();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
      const userObj = {
        application_type: 'private',
        redirect_uris: [`${window.location.protocol}//${window.location.hostname}`],
        client_name:'clinikal app',
        token_endpoint_auth_method: 'client_secret_post',
        contacts: ["me@example.org", "them@example.org"]
      };

      const response = loginInstance({'Content-Type': 'application/json'}).post('oauth2/default/registration', userObj);
      response.then((response) => {
        if (response.data.client_id) {
          setClientId(response.data.client_id);
          setButtonDisabled(false);
        }
      })

  }, []);

  const onSubmit = (data) => {
    console.log(clientId)
    loginAction(clientId,data.userName, data.password, history);
  };

  const handleOnDelete = () => {
    setCloneStatus('');
  };

  const [cloneStatus, setCloneStatus] = useState('');

  useEffect(() => {
    setCloneStatus(status);
  }, [status]);



  useEffect(() => {}, [status]);
  return (
    <StyledLogin>
      <LoginBG src={bg} />
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <LoginTitle>
          <LoginLogo src={loginLogo} />
          <Typography variant={'h5'} align={'center'}>
            קליניקל
          </Typography>
        </LoginTitle>
        <Typography variant={'h4'} align={'center'}>
          כניסה למערכת
        </Typography>
        <StyledDivider />
        {cloneStatus === 'LOGIN_FAILED' && (
          <StyledErrorChip
            label='שם המשתמש ו/או הסיסמה שהוזנו אינם תקינים'
            onDelete={handleOnDelete}
          />
        )}
        <CustomizedTextField
          name='userName'
          label={t('* שם המשתמש')}
          error={errors.userName ? true : false}
          helperText={errors.userName && errors.userName.message}
          fullWidth
          lang_dir={'rtl'}
          InputProps={{
            autoComplete: 'off',
            endAdornment: (errors.userName ? true : false) && (
              <InputAdornment position='end'>
                <ErrorOutline color={'error'} />
              </InputAdornment>
            ),
          }}
          inputRef={register({
            required: 'יש להזין ערך בשדה',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'יש להזין רק אותיות באנגלית',
            },
          })}
        />
        <CustomizedTextField
          name='password'
          label={t('* סיסמה')}
          type={'password'}
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
          fullWidth
          lang_dir={'rtl'}
          inputRef={register({
            required: 'יש להזין ערך בשדה',
          })}
          InputProps={{
            autoComplete: 'off',
            endAdornment: (errors.password ? true : false) && (
              <InputAdornment position='end'>
                <ErrorOutline color={'error'} />
              </InputAdornment>
            ),
          }}
        />
        <CustomizedTableButton
          label={t('כניסה למערכת')}
          backGroundColor={'#002398'}
          variant={'contained'}
          color={'primary'}
          fontWeight={'bold'}
          mode={buttonDisabled ? 'view': 'clicked' }
          other={{
            fullWidth: true,
            type: 'submit',
          }}
        />
      </LoginForm>
    </StyledLogin>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.login.STATUS,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);
