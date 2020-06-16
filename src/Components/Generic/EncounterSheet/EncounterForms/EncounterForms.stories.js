/*
/!*
-------------------------EXAMPLE HOW TO CALL POPUP FORM TEMPLATES ---------------------
STILL REMAINING - PC-562,PC-602, PC-761 .
                  I have made changes In order to foresee what should be happen in those tasks.
                  a) so here we have an example how to use PC-562
                  b) the returned value which should be saved in PC-602 is implemented here also
                  c) the popup of 761 logic is here also just
*!/

import React from 'react';
import StyledPatientFiles from './Style';
import PopUpFormTemplates from '../../PopupComponents/PopUpFormTemplates';
import { connect } from 'react-redux';

const EncounterForms = ({ encounter }) => {
  let formID = 1,
    formFields = 'reccomended_medicine',
    formFieldsTitle = 'Medical problem';

  const [popUpTemplates, setPopUpTemplates] = React.useState(true);
  const [templatesTextReturned, setTemplatesTextReturned] = React.useState('');

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
        encounter={encounter} //can be whatever encounter needed
        defaultContext={'hfsidf hufuds fusd fusdhfusfd usdiufshdfushdfus'}
        popupOpen={popUpTemplates}
        handlePopupClose={handlePopupClose}></PopUpFormTemplates>
    </StyledPatientFiles>
  );
};

const mapStateToProps = (state) => {
  return {
    encounter: state.active.activeEncounter,
    patient: state.active.activePatient,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(EncounterForms);*/

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ProviderWrapper from '../../../../../.storybook/Provider';
import { store } from '../../../../index';
import { StylesProvider } from '@material-ui/core/styles';

import PopUpFormTemplates from '../../PopupComponents/PopUpFormTemplates';

import StyledPatientFiles from './Style';

import { connect } from 'react-redux';

export default {
  title: 'Forms',
  decorators: [
    withKnobs,
    (story) => (
      <ProviderWrapper store={store}>
        <StylesProvider injectFirst>{story()}</StylesProvider>
      </ProviderWrapper>
    ),
  ],
};

export const EncounterForms = ({ encounter }) => {
  const destroy = () => {};
  encounter = {
    resourceType: 'Bundle',
    type: 'searchset',
    timestamp: '2020-06-16T07:04:44.000Z',
    total: 1,
    entry: [
      {
        response: {
          status: '200',
          outcome: { resourceType: 'OperationOutcome' },
        },
      },
      {
        resource: {
          id: '20',
          resourceType: 'Encounter',
          status: 'waiting-for-results',
          serviceType: { coding: [{ code: '4' }], text: 'CT' },
          priority: { coding: [{ code: '1' }] },
          subject: { reference: 'Patient/13' },
          participant: [{ individual: { reference: 'Practitioner/5' } }],
          appointment: [{ reference: 'Appointment/8' }],
          period: { start: '2020-05-17T11:04:00.000Z' },
          reasonCode: [
            { coding: [{ code: '17' }], text: 'Blood Vessel' },
            { coding: [{ code: '2' }], text: 'Ankle' },
            { coding: [{ code: '5' }], text: 'Upper Abdomen' },
            { coding: [{ code: '3' }], text: 'Foot' },
            { coding: [{ code: '12' }], text: 'Mammography' },
          ],
          serviceProvider: { reference: 'Organization/15' },
        },
        search: { mode: 'match' },
      },
    ],
  };

  let formID = 1,
    formFields = 'reccomended_medicine',
    formFieldsTitle = 'Medical problem';

  const [popUpTemplates, setPopUpTemplates] = React.useState(true);
  const [templatesTextReturned, setTemplatesTextReturned] = React.useState('');
  const [defaultContext, setDefaultContext] = React.useState(
    'המטופל _______ קיבל הפניה מבית החולים _____ שם נאסר עליו ______________',
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
        encounter={encounter} //can be whatever encounter needed
        defaultContext={defaultContext}
        setDefaultContext={setDefaultContext}
        popupOpen={popUpTemplates}
        handlePopupClose={handlePopupClose}
      />
    </StyledPatientFiles>
  );
};
