import React, { useEffect } from 'react';
import moment from 'moment';
import EncounterTicket from './EncounterTicket';

import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { StyledAllButton } from './Style';

const Encounters = ({
  prevEncounters,
  patient,
  encounter,
  languageDirection,
  formatDate,
  verticalName,
  handleCreateData,
}) => {
  const currentDate = moment().utc().format('YYYY-MM-DD');
  const { t } = useTranslation();
  let elementsIntContainer = 0;
  const [
    expandedEncountersIsOpen,
    setExpendedEncountersIsOpen,
  ] = React.useState(true);

  const [hide, setHide] = React.useState(false);

  const [expandedTitle, setexpandedTitle] = React.useState(
    'Show all encounters',
  );
  const handleChangeOfelementsContainer = () => {
    if (elementsIntContainer > 3) {
      setHide(true);
    }
  };
  const handleCloseEncountersTickets = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!expandedEncountersIsOpen) {
      setExpendedEncountersIsOpen(true);
      setexpandedTitle('Show all encounters');
      setHide(false);
    } else {
      setExpendedEncountersIsOpen(false);
      setexpandedTitle('Show less encounters');

      setHide(true);
    }
  };

  return (
    <div onChange={handleChangeOfelementsContainer}>
      {prevEncounters.map((prevEncounter, prevEncounterIndex) => {
        return (
          <EncounterTicket
            hide={hide}
            showAlways={elementsIntContainer++ < 3 ? true : false}
            encounterToParse={prevEncounter}
            parseCurrent={
              prevEncounter && prevEncounter.id !== encounter.id ? false : true
            }
            summaryLetter={null}
            encounterSheet={null}
            key={prevEncounterIndex}
            handleCreateData={handleCreateData}
          />
        );
      })}

      <StyledAllButton
        show={prevEncounters.length > 3 ? 'true' : 'false'}
        fullWidth={true}
        onClick={handleCloseEncountersTickets}>
        {t(expandedTitle)}
      </StyledAllButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(Encounters);
