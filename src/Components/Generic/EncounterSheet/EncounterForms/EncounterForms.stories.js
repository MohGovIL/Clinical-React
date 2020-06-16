/*
* Created by :  Dror Golan
* Date : 16-06-2020
* Comments :
* * -------------------------EXAMPLE HOW TO CALL POPUP FORM TEMPLATES ---------------------

                  a) so here we have an example how to use PC-562
                  b) the returned value which should be saved in PC-602 is implemented here also
                  c) the popup of 761 logic is here also just
                  d) PC-1159 - will handle default context from main screen

                  *** PC-1169 - create this storybook this is the first example of using mock in order
                            to inject data into the child components.
*
* */
import React from 'react';
import { withKnobs, object, select, text } from '@storybook/addon-knobs';
import ProviderWrapper from '../../../../../.storybook/Provider';
import { store } from 'index';
import { StylesProvider } from '@material-ui/core/styles';
import PopUpFormTemplates from 'Components/Generic/PopupComponents/PopUpFormTemplates';
import StyledPatientFiles from './Style';
// 1. import axios and MockAdapter
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 2. create the mock
const mock = new MockAdapter(axios);
const API_REQUEST =
  '/apis/api/templates/search?service-type=4&reason-code=17,2,5,3,12&form=1&form-field=reccomended_medicine';

export default {
  title: 'EncounterForms',

  decorators: [
    withKnobs,
    (story) => (
      <ProviderWrapper store={store}>
        <StylesProvider injectFirst>{story()}</StylesProvider>
      </ProviderWrapper>
    ),
  ],
  excludeStories: /.*Data$/,
};

export const PopUpFormTemplatesExample = ({ encounter }) => {
  const lang_dir = select(
    'state.settings.lang_dir',
    { rtl: 'rtl', ltr: 'ltr' },
    'rtl',
  );
  const lang_code = text('state.settings.lang_code', 'he');

  store.getState().settings.lang_dir = lang_dir;
  store.getState().settings.lang_code = lang_code;
  mock
    .onGet(API_REQUEST)
    .reply(200, [
      'sdfsdfsfdsfd kfdngjd gjds nfojs fods nfods nfojsfd',
      'sdfkjnosj foi dsoif soif oids fjoisfi jsoifd js',
      'kjdsfois jf jsd jfoids fois fois fois jfsif joi foij ois fdois8ewru80w urfr 98u090gf0ugf',
      '98uy 9uv98g987g9854r6 3btnjt ngf g98b98th bu tnjg9ug9874ewt84358',
      '98gv98gv98ughuth432uthutrhtruhtushduuhsguhsgfd',
    ]);

  const destroy = () => {};
  encounter = {
    id: '20',
    priority: '1',
    status: 'waiting-for-results',
    startTime: '2020-05-17T11:04:00.000Z',
    patient: '13',
    appointment: ['8'],
    serviceProvider: '15',
    serviceType: 'CT',
    examinationCode: ['17', '2', '5', '3', '12'],
    examination: [
      'Blood Vessel',
      'Ankle',
      'Upper Abdomen',
      'Foot',
      'Mammography',
    ],
    serviceTypeCode: '4',
    relatedPerson: '',
    practitioner: '5',
  };

  let formID = 1,
    formFields = 'reccomended_medicine',
    formFieldsTitle = 'Medical problem';

  const [popUpTemplates, setPopUpTemplates] = React.useState(true);
  const [templatesTextReturned, setTemplatesTextReturned] = React.useState('');
  const [defaultContext, setDefaultContext] = React.useState(
    'המטופל ******** קיבל הפניה מבית החולים ********* שם נאסר עליו *********** וגם ***',
  );

  const handlePopupClose = () => {
    if (setPopUpTemplates) {
      setPopUpTemplates(false);
    } else {
      setPopUpTemplates(true);
    }
  };

  return (
    <StyledPatientFiles>
      {templatesTextReturned}
      <PopUpFormTemplates
        setTemplatesTextReturned={setTemplatesTextReturned} //save the text state inside the component
        formID={formID}
        formFields={formFields}
        formFieldsTitle={formFieldsTitle}
        encounter={object('encounter', encounter)} //can be whatever encounter needed
        defaultContext={defaultContext}
        setDefaultContext={setDefaultContext}
        popupOpen={popUpTemplates}
        handlePopupClose={handlePopupClose}
      />
    </StyledPatientFiles>
  );
};
