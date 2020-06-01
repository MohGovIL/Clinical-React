import React from 'react';
import EncounterTicket from 'Components/Generic/EncounterSheet/PatientBackground/EncounterTicket';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StyledAllButton } from 'Components/Generic/EncounterSheet/PatientBackground/Style';

const Encounters = ({
  prevEncounters,
  encounter,
  languageDirection,
  handleCreateData,
}) => {
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
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(Encounters);
