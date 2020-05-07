import React from 'react';
import StyledAppBar from './Style';
import StatusFilterBoxTabs from './StatusFilterBoxTabs';
import { devicesValue } from 'Assets/Themes/BreakPoints';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { setStatusFilterBoxValueAction } from 'Store/Actions/PatientTrackingActions/PatienTrackingActions';

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param tabs - array
 * @param setStatusFilterBoxIndexAction - redux action
 * @returns {Component}
 * @constructor
 */
const StatusFilterBox = ({
  tabs,
  setStatusFilterBoxValueAction,
  selectedTab,
}) => {
  const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);

  const tabsHandler = (tabValue) => {
    setStatusFilterBoxValueAction(tabValue);
  };

  return (
    <StyledAppBar>
      <StatusFilterBoxTabs
        value={selectedTab}
        tabs={tabs}
        tabsHandler={tabsHandler}
        orientation={matches ? 'vertical' : 'horizontal'}
      />
    </StyledAppBar>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedTab: state.filters.statusFilterBoxValue,
  };
};

export default connect(mapStateToProps, { setStatusFilterBoxValueAction })(
  StatusFilterBox,
);
