import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from 'Store/Actions/LoginActions/LoginActions';
import bg from 'Assets/Images/bg.svg';
import loginLogo from 'Assets/Images/symbol-logo.svg';
import StyledTextField from 'Assets/Elements/StyledTextField';
import { useTranslation } from 'react-i18next';
import CustomizedTableButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';
import StyledLogin, {
  LoginForm,
  LoginTitle,
  LoginLogo,
  StyledDivider,
} from './Style';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import LoginBG from './LoginBG';
const Login = ({ loginAction, history }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      userName: '',
      password: '',
    },
    submitFocusError: true,
  });
  const { t } = useTranslation();

  const onSubmit = (data) => {
    loginAction(data.userName, data.password, history);
  };

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
        <StyledTextField
          name='userName'
          label={t('* שם המשתמש')}
          error={errors.userName ? true : false}
          helperText={errors.userName && 'יש להזין ערך בשדה'}
          fullWidth
          // inputProps={{ pattern: '[A-Za-z]' }}
          inputRef={register({
            required: true,
          })}
        />
        <StyledTextField
          name='password'
          label={t('* סיסמה')}
          type={'password'}
          error={errors.password ? true : false}
          helperText={errors.password && 'יש להזין ערך בשדה'}
          fullWidth
          inputRef={register({
            required: true,
          })}
        />
        <CustomizedTableButton
          label={t('כניסה למערכת')}
          variant={'contained'}
          color={'primary'}
          other={{
            fullWidth: true,
            type: 'submit',
          }}
        />
      </LoginForm>
    </StyledLogin>
  );
};

export default connect(null, { loginAction })(Login);
