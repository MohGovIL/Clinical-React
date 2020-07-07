import React, { Component, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { StyledTabContainer } from './Style';
import { useTranslation } from 'react-i18next';
import LazyLoadComponentsToArray from '../../../../Utils/Helpers/lazyLoadComponentsToArray';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
          {/*<Typography>{children}</Typography>*/}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
/*[{"component":"MedicalAdmissionForm","form_name":"Medical Admission","order":"1","permission":"write"},{"component":"MedicalAdmissionForm","form_name":"Tests and Treatments","order":"2","permission":"write"},{"component":"MedicalAdmissionForm","form_name":"Diagnosis and Recommendations","order":"3","permission":"write"}]*/

const FormsContainer = ({ tabs }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let formComponents = [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  if (tabs && tabs.data) {
    formComponents = LazyLoadComponentsToArray(tabs.data, formComponents);
  }
  return (
    <StyledTabContainer>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'>
          {tabs.data.map((tab, key) => {
            return (
              <Tab
                key={'tab_' + key}
                label={t(tab.form_name)}
                {...allyProps(tab.order)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} //fix this
        index={value}
        onChangeIndex={handleChangeIndex}>
        {tabs.data.map((tab, key) => {
          let FormComponent = formComponents[tab.component];
          return key === value ? (
            <TabPanel
              key={'tab_panel_' + key}
              value={tab.order}
              index={tab.order}
              dir={theme.direction}>
              <Suspense fallback={<span>Loading...</span>}>
                <FormComponent permission={tab.permission} />
              </Suspense>
            </TabPanel>
          ) : (
            <TabPanel
              key={'tab_panel_' + key}
              value={tab.order}
              index={tab.order}
              dir={theme.direction}
            />
          );
        })}
      </SwipeableViews>
    </StyledTabContainer>
  );
};

export default FormsContainer;
