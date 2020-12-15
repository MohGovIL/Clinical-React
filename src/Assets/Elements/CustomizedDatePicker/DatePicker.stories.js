import React from 'react';
import CustomizedDatePicker from './index';
import { StylesProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../Themes/GlobalStyle';
import {
  withKnobs,
  object,
  boolean,
  select,
  text,
} from '@storybook/addon-knobs';
import { store } from '../../../index';
import ProviderWrapper from '../../../../.storybook/Provider';

export default {
  title: 'DatePicker',
  component: CustomizedDatePicker,
  decorators: [
    withKnobs,
    (story) => (
      <ProviderWrapper store={store}>
        <StylesProvider injectFirst>
          <GlobalStyle lang_id={'7'} />
          {story()}
        </StylesProvider>
      </ProviderWrapper>
    ),
  ],
  excludeStories: /.*Data$/,
};

export const normalDatePicker = () => {
  const lang_dir = select(
    'state.settings.lang_dir',
    { rtl: 'rtl', ltr: 'ltr' },
    'rtl',
  );
  const lang_code = text('state.settings.lang_code', 'he');

  store.getState().settings.lang_dir = lang_dir;
  store.getState().settings.lang_code = lang_code;
  return (
    <CustomizedDatePicker
      {...lang_dir}
      {...lang_code}
      iconColor={object('Icon color', '#076ce9')}
      isDisabled={boolean('isDisabled', false)}
    />
  );
};
