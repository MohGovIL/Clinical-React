import React from 'react';
import StatusFilterBox from './index';
import { StylesProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../Themes/GlobalStyle';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'StatusFilterBox',
  component: StatusFilterBox,
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

const tabsData = [
  {
    tabName: 'Invited',
    count: 10,
  },
  {
    tabName: 'Waiting for examination',
    count: 10,
  },
  {
    tabName: 'Waiting for decoding',
    count: 10,
  },
  {
    tabName: 'Finished',
    count: 10,
  },
];

export const normalStatusFilterBox = () => {
  return <StatusFilterBox tabs={object('tabs', [...tabsData])} />;
};
