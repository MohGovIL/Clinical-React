import React from 'react';
import CustomizedSelect from './index';
import { StylesProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../Themes/GlobalStyle';
import { withKnobs, object, select, color } from '@storybook/addon-knobs';
import { store } from 'index';

export default {
  title: 'SelectBox',
  component: CustomizedSelect,
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



export const normalSelect = () => {
  const lang_dir = select(
    'state.settings.lang_dir',
    { rtl: 'rtl', ltr: 'ltr' },
    'rtl',
  );

  const selectMode = select(
    'mode',
    {
      view: 'view',
      write: 'write',
    },
    'write',
  );
  store.getState().settings.lang_dir = lang_dir;
  const statusesData = [
    {
      code: 'pending',
      name: 'Pending',
    },
    {
      code: 'booked',
      name: 'Booked',
    },
    {
      code: 'arrived',
      name: 'Arrived',
    },
    {
      code: 'cancelled',
      name: 'Cancelled',
    },
    {
      code: 'noshow',
      name: 'No Show',
    },
    {
      code: 'waitlist',
      name: 'Waitlisted',
    },
  ];
  const onChange = (code) => {
    return true;
  }

  return (
    <React.Fragment>
      <GlobalStyle language_direction={lang_dir} />
      <CustomizedSelect
        options={object('statuses', [...statusesData])}
        defaultValue={statusesData[0].code}
        onChange={onChange}
        icon_color={color('Icon color', '#076ce9')}
        background_color={color('Background color', '#eaf7ff')}
        langDirection={lang_dir}
        text_color={color('Text color', '#076ce9')}
        mode={selectMode}
      />
    </React.Fragment>
  );
};
