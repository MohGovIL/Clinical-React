import React, {Suspense, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import VerticalRoute from 'Components/Routes/VerticalRoute';
import GlobalStyle from 'Assets/Themes/GlobalStyle';
import CircularProgress from '@material-ui/core/CircularProgress';
import GenericRoute from 'Components/Routes/GenericRoute';
import { Switch, Route } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import Loader from 'Assets/Elements/Loader/loginLoader';
import ToastMessage from "Assets/Elements/ToastMessage";
import { useIdleTimer } from "react-idle-timer";
import PopUpSessionTimeout from "Assets/Elements/PopUpSessionTimeout"
import { restoreSessionAction } from 'Store/Actions/LoginActions/LoginActions';
import * as moment from "moment";
// import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';

const InitApp = ({ lang_id, lang_code, languageDirection, restoreSessionAction}) => {

  const [popupTimeoutIsOpen, setPopupTimeoutIsOpen] = useState(false);

  /*useEffect(() => {
    let interval =  setInterval(() => {
        if (!isIdle()) {
          restoreSessionAction();
        }
    },  1000 * 60 * 120)
    return () => clearInterval(interval)
  }, [])

  const handleOnIdle = event => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
    setPopupTimeoutIsOpen(true);
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
    console.log('time remaining', getElapsedTime())
  }

  const handleOnAction = (e) => {
    console.log('user did something', e)
  }

  const { getRemainingTime, getLastActiveTime, getElapsedTime, isIdle } = useIdleTimer({
    timeout: 1000 * 60 * 1,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 1000
  })*/

  return (
    <React.Fragment>
      <Suspense fallback={<Loader/>}>
        <GlobalStyle
          lang_id={lang_id}
          language_direction={languageDirection}
          lang_code={lang_code}
        />
        <Switch>
          {/* TODO not sure if this needs to be a PrivateRoute or not */}
          {/* Since the components that gets rendered are PrivateComponents */}
          <Route
            exact
            component={GenericRoute}
            path={`${baseRoutePath()}/generic/:page`}
          />
          <Route
            exact
            component={VerticalRoute}
            path={`${baseRoutePath()}/:subRoute/:page`}
          />
        </Switch>
        <PopUpSessionTimeout isOpen={false}/>
      </Suspense>
      <ToastMessage  language_direction={languageDirection}/>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    lang_id: state.settings.lang_id,
    languageDirection: state.settings.lang_dir,
    lang_code: state.settings.lang_code,
  };
};
export default connect(mapStateToProps, { restoreSessionAction })(InitApp);
