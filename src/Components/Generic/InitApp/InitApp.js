import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import VerticalRoute from 'Components/Routes/VerticalRoute';
import GlobalStyle from 'Assets/Themes/GlobalStyle';
import CircularProgress from '@material-ui/core/CircularProgress';
import GenericRoute from 'Components/Routes/GenericRoute';
import { Switch, Route } from 'react-router-dom';
// import PrivateRoute from 'Components/PrivateRoute/PrivateRoute';

const InitApp = ({ lang_id, languageDirection }) => {
  return (
    <React.Fragment>
      <Suspense fallback={<CircularProgress />}>
        <GlobalStyle lang_id={lang_id} language_direction={languageDirection} />
        <Switch>
          {/* TODO not sure if this needs to be a PrivateRoute or not */}
          {/* Since the components that gets rendered are PrivateComponents */}
          <Route exact component={GenericRoute} path={'/generic/:page'} />
          <Route exact component={VerticalRoute} path={'/:subRoute/:page'} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    lang_id: state.settings.lang_id,
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(InitApp);
