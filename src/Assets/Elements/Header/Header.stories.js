import React from 'react';
import Header from './index';
import ProviderWrapper from '../../../../.storybook/Provider';
import { store } from '../../../index';
import { StylesProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../Themes/GlobalStyle';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withStorySource } from '@storybook/addon-storysource';

export default {
  title: 'Header',
  component: Header,
  decorators: [
    withKnobs,
    (story) => (
      <StylesProvider injectFirst>
        <GlobalStyle lang_id={'7'} />
        {story()}
      </StylesProvider>
    ),
  ],
  excludeStories: /.*Data$/,
};

export const itemsDefaultData = [
  {
    label: 'Patients',
    menu_id: 'patients',
    url: '/PatientTraking',
  },
  {
    label: 'Calendar',
    menu_id: 'calendar',
    url: '/Calendar',
  },
  {
    label: 'Tasks',
    menu_id: 'tasks',
    url: '/Tasks',
  },
];

export const normalHeader = () => {
  return (
    <ProviderWrapper store={store}>
      <Header Items={object('HeaderItems', [...itemsDefaultData])} />
    </ProviderWrapper>
  );
};
