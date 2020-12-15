import React, { useState } from 'react';
import StyledSearch, {
  StyledIconValueComponent,
  StyledPaper,
  StyledPaperBottom,
  StyledPaperContainer,
  StyledTriangle,
  WrapperSearchPaper,
} from './Style';
import SearchInput from './SearchInput';
import Icon from './Icon/index';
import search from 'Assets/Images/search.png';
// eslint-disable-next-line
import { searchPatients } from 'Utils/Services/FhirAPI';
import { ClickAwayListener } from '@material-ui/core';
import { StyledValueComponent } from './DrawThisTable/Style';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PaperContainerComponent from './DrawThisTable/PaperContainerComponent';
import { FHIR } from 'Utils/Services/FHIR';
import PopupCreateNewPatient from 'Components/Generic/PopupComponents/PopupCreateNewPatient';
import isAllowed from 'Utils/Helpers/isAllowed';

const Search = ({ languageDirection }) => {
  const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  // eslint-disable-next-line
  String.prototype.trimRight = function (charlist) {
    if (charlist === undefined) charlist = 's';

    return this.replace(new RegExp('[' + charlist + ']+$'), '');
  };
  // eslint-disable-next-line
  String.prototype.trimLeft = function (charlist) {
    if (charlist === undefined) charlist = 's';

    return this.replace(new RegExp('^[' + charlist + ']+'), '');
  };
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isClickedAway, setIsClickedAway] = useState(false);
  const [result, setResult] = useState({});
  const [
    popupApppointmentsAndEncounters,
    setPopupApppointmentsAndEncounters,
  ] = useState(false);

  //Create new patient
  const [popupNewPatient, setPopupNewPatient] = useState(false);
  // eslint-disable-next-line
  const onFocusHandler = async (e) => {
    if (e.target.value.length > 2) {
      e.target.value += ' ';
      e.target.value = e.target.value.trim();
    }
  };
  const onChangeHandler = async (e) => {
    setIsClickedAway(false);

    const target = e.target;

    let tValue = target.value;

    let minSearchParam = 2;

    setResult(null);

    setInput(target.value);

    if (languageDirection === 'ltr') {
      tValue = tValue.trimRight(' ');
    } else {
      tValue = tValue.trimLeft(' ');
    }

    if (isNumeric(tValue)) {
      minSearchParam = 2;
    } else {
      minSearchParam = 2;
    }

    if (tValue.length > minSearchParam) {
      (() => {
        try {
          //In this example I am calling FHIR without await cause I am making logic inside the search patient.
          //for that I need to do then function on the resolved data .
          FHIR('Patient', 'doWork', {
            functionName: 'searchPatients',
            functionParams: { searchValue: tValue },
          }).then((patients) => {
            if (patients) {
              //for
              setResult(patients);
              setShowResult(true);
            } else {
              setResult(null);
              setShowResult(true);
            }
          });
        } catch (err) {
          //  setShowResult(false);
          setResult([]);
          console.log(err);
        }
        setResult(null);
        setShowResult(true);
      })();
    } else {
      setShowResult(false);
    }
  };

  const onNewPatientButtonClick = (event) => {
    setPopupNewPatient(true);
  };
  const onCloseNewPatientClick = (event) => {
    setPopupNewPatient(false);
  };
  // returns true if the element or one of its parents has the class classname
  function hasSomeParentTheClass(element, classname) {
    //some of the material ui path elements has no class ???
    if (!element) return false;
    if (
      //some of the material ui path elements has no class ???
      element.tagName.toLowerCase() === 'svg' ||
      element.tagName.toLowerCase() === 'path'
    ) {
      return true;
    }
    //this is happening on clicking outside the popup or outside the search elemnt
    if (element.tagName.toLowerCase() === 'body') {
      return false;
    }
    if (element.className && element.className.indexOf(classname) >= 0)
      return true;
    return (
      element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
    );
  }
  const handleOnClickAway = (event) => {
    if (popupNewPatient || popupApppointmentsAndEncounters) {
      //if popupNePatientisOpen - there is an issue with material ui when clicking on TextField
      //it is clicking on the Body - https://stackoverflow.com/questions/58686204/cant-get-event-target-value-using-select-item-from-material-ui-autocomplete-with
      return;
    }
    //since this event is triggering after the popupisclosed to preven closing of the main search screen we need to
    //block the close of the main search screen
    //for that I have checked the event from where it was triggering . this is very strange event that checks a target that has been
    //closed already .
    let className = event.target.className.toString(); //MuiDialog-container'

    let thisIsApopUp =
      className.replace(/[\n\t]/g, ' ').indexOf('MuiDialog-container') > -1;
    //In  basic popup where material ui has no bugs we need not to check these elements
    let arrToCheck = [
      'MuiDialogContent-root',
      'MuiPopover-paper',
      'MuiSelect-root',
    ];
    let thisIsElementInsidepopUp = false;

    for (let i = 0; i < arrToCheck.length; i++) {
      //since material ui has bugs on the target that we clicked on we need to check
      //recursively the head of the tree element where the click initieated.
      if (hasSomeParentTheClass(event.target, arrToCheck[i]))
        thisIsElementInsidepopUp = true;
    }

    if (thisIsApopUp || thisIsElementInsidepopUp) {
      setIsClickedAway(false);
    } else {
      setIsClickedAway(true);
    }
  };
  const authorizationACO = {
    appointmentsAndEncounters: isAllowed('appointments_and_encounters'),
    addNewPatient: isAllowed('add_patient'),
    appointmentDetails: isAllowed('appointment_details'),
    calendar: isAllowed('calendar'),
    encounterSheet: isAllowed('encounter_sheet'),
    patientAdmission: isAllowed('patient_admission'),
    searchPatient: isAllowed('search_patient'),
    cancelAppointment: isAllowed('appointment_details'),
    createNewAppointment: isAllowed('appointment_details'),
    summaryLetter: isAllowed('summary_letter'),
  };
  //Appointments And Encounters - PC-262
  return (
    <React.Fragment>
      {showResult === true &&
      !isClickedAway &&
      (authorizationACO.searchPatient === 'view' ||
        authorizationACO.searchPatient === 'write') ? (
        <ClickAwayListener
          key={'ClickAwayListener_' + input}
          onClickAway={handleOnClickAway}>
          <WrapperSearchPaper
            key={'WrapperSearchPaper_' + input}
            direction={languageDirection}>
            <StyledTriangle key={'StyledTriangle_' + input} />
            <StyledPaper
              key={'bottom_links_' + input}
              elevation={1}
              id='results'
              variant='outlined'
              square>
              {result ? (
                <StyledPaperContainer key={'StyledPaperContainer' + input}>
                  <PaperContainerComponent
                    authorizationACO={authorizationACO}
                    key={'paper_container_component_' + input}
                    result={result}
                    searchParam={input}
                    setPopupApppointmentsAndEncounters={
                      setPopupApppointmentsAndEncounters
                    }
                  />
                </StyledPaperContainer>
              ) : (
                <StyledPaperBottom
                  key={'paper_container_component_' + input}
                  elevation={1}
                  variant='outlined'
                  square>
                  <StyledValueComponent key={'StyledValueComponent_' + input}>
                    {t('No result for this search')}
                  </StyledValueComponent>
                </StyledPaperBottom>
              )}
              {authorizationACO.addNewPatient === 'view' ||
              authorizationACO.addNewPatient === 'write' ? (
                <StyledPaperBottom
                  key={'styled_paper_bottom_' + input}
                  elevation={1}
                  id='results'
                  variant='outlined'
                  square>
                  <StyledIconValueComponent
                    key={'add_circle_' + input}
                    iconType='add_circle'
                    value='Add New Patient'
                    onClickHandler={onNewPatientButtonClick}
                  />
                  <PopupCreateNewPatient
                    authorizationACO={authorizationACO}
                    key={'popup_new_' + input}
                    popupOpen={popupNewPatient}
                    handlePopupClose={onCloseNewPatientClick}
                  />
                </StyledPaperBottom>
              ) : null}
            </StyledPaper>
          </WrapperSearchPaper>
        </ClickAwayListener>
      ) : null}

      <StyledSearch languageDirection={languageDirection}>
        <SearchInput onChange={onChangeHandler} searchInput={input} />
        <Icon alt='search icon' img={search} />
      </StyledSearch>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
  };
};

export default connect(mapStateToProps, null)(Search);
