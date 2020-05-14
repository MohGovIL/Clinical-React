import React from 'react';
import TitleValueComponent from 'Assets/Elements/Header/Search/DrawThisTable/TitleValueComponent';
import { useTranslation } from 'react-i18next';
import {
  StyledHeaderTableAppointment,
  StyledHrefButton,
  StyledHrefTableButton,
  StyledLabelStatusAppointment,
  StyledLabelTableButton,
  StyledTableTextCell,
} from 'Assets/Elements/Header/Search/DrawThisTable/Style';
import moment from 'moment';
import normalizeFhirAppointment from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import { StyledIconValueComponent } from 'Assets/Elements/Header/Search/Style';

const AppointmentsAndEncountersTables = ({
  patient,
  nextAppointments,
  curEncounters,
  prevEncounters,
  patientTrackingStatuses,
  encounterStatuses,
  authorizationACO,
}) => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const prevEncountersEntry =
    prevEncounters && prevEncounters.data && prevEncounters.data.total > 0
      ? prevEncounters.data.entry[1].resource
      : null;
  // eslint-disable-next-line
  const nextAppointmentsElem =
    nextAppointments && nextAppointments.data && nextAppointments.data.total > 0
      ? nextAppointments.data.entry[1].resource
      : null;
  // eslint-disable-next-line
  const curEncountersElem = curEncounters ? curEncounters : null;
  // eslint-disable-next-line
  const nextAppointmentEntry = nextAppointmentsElem
    ? normalizeFhirAppointment(nextAppointmentsElem)
    : null;
  // eslint-disable-next-line
  const normalizedPrevEncounter = prevEncountersEntry
    ? normalizeFhirEncounter(prevEncountersEntry)
    : null;
  const patientData = patient;
  const curDate = moment().utc().format('DD/MM/YYYY');
  let normalizedCurEncounters = [];
  let normalizedNextAppointments = [];
  let normalizedPrevEncounters = [];
  // eslint-disable-next-line
  const getAppointmentWithTimeOrNot = (nextAppointmentEntry) => {
    let isThisAppToday =
      moment.utc(nextAppointmentEntry.startTime).format('DD/MM/YYYY') ===
      moment().utc().format('DD/MM/YYYY')
        ? true
        : false;
    return isThisAppToday
      ? moment.utc(nextAppointmentEntry.startTime).format('DD/MM/YYYY HH:mm')
      : moment().utc().format('DD/MM/YYYY');
  };
  const [showAllPastEncounter, setShowAllPastEncounter] = React.useState(false);
  let [pastEncounterCounter, setPastEncounterCounter] = React.useState(2);

  const [
    showAllFutureAppointments,
    setShowAllFutureAppointments,
  ] = React.useState(false);
  let [
    futureAppointmentsCounter,
    setFutureAppointmentsCounter,
  ] = React.useState(2);

  const togglePastEncountersTable = () => {
    if (showAllPastEncounter) {
      setShowAllPastEncounter(false);
      setPastEncounterCounter(2);
    } else {
      setShowAllPastEncounter(true);
      setPastEncounterCounter(prevEncounters.data.total);
    }
  };

  const toggleFutureAppointmentsTable = () => {
    if (showAllFutureAppointments) {
      setShowAllFutureAppointments(false);
      setFutureAppointmentsCounter(2);
    } else {
      setShowAllFutureAppointments(true);
      setFutureAppointmentsCounter(nextAppointments.data.total);
    }
  };

  const parseMultipleExaminations = (serviceType, examination) => {
    if (!examination || !examination[0] || examination.lenghth === 0) {
      return t(serviceType);
    }
    let returnThisServiceTypesExaminations = '';
    returnThisServiceTypesExaminations += t(serviceType);
    if (examination.length > 1) {
      returnThisServiceTypesExaminations += '-';
      for (let id = 0; id < examination.length; id++) {
        returnThisServiceTypesExaminations +=
          t(examination[id]) + (id + 1 < examination.length ? ',' : '');
      }
    } else {
      returnThisServiceTypesExaminations += '-' + t(examination[0]);
    }

    return returnThisServiceTypesExaminations;
  };
  /*const handleChartClickOpen = () => {
    //TODO:
  };

  const handleAdmissionClickOpen = () => {
    //TODO:
  };*/

  if (curEncounters && curEncounters.data && curEncounters.data.total > 0) {
    let entry = curEncounters.data.entry;
    // eslint-disable-next-line
    entry.map((response, resourceIndex) => {
      if (
        response &&
        response.resource &&
        response.resource.resourceType === 'Encounter'
      ) {
        let normalizedCurEncounterElem = normalizeFhirEncounter(
          response.resource,
        );
        normalizedCurEncounters.push(normalizedCurEncounterElem);
      }
    });
  }

  if (
    nextAppointments &&
    nextAppointments.data &&
    nextAppointments.data.total > 0
  ) {
    let entry = nextAppointments.data.entry;
    // eslint-disable-next-line
    entry.map((response, resourceIndex) => {
      if (
        response &&
        response.resource &&
        response.resource.resourceType === 'Appointment'
      ) {
        let normalizedNextAppointmentElem = normalizeFhirAppointment(
          response.resource,
        );
        normalizedNextAppointments.push(normalizedNextAppointmentElem);
      }
    });
  }

  if (prevEncounters && prevEncounters.data && prevEncounters.data.total > 0) {
    let entry = prevEncounters.data.entry;
    // eslint-disable-next-line
    entry.map((response, resourceIndex) => {
      if (
        response &&
        response.resource &&
        response.resource.resourceType === 'Encounter'
      ) {
        let normalizedPrevEncounterElem = normalizeFhirEncounter(
          response.resource,
        );
        normalizedPrevEncounters.push(normalizedPrevEncounterElem);
      }
    });
  }

  function handleCreateAppointment(patient) {
    return undefined;
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <br />
        <StyledHeaderTableAppointment>
          {t('Current encounter')}
        </StyledHeaderTableAppointment>
        <ul></ul>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>{t("Encounter's hour")}</TableCell>
                <TableCell align='right'>{t('Lab test type')}</TableCell>
                <TableCell align='center'>{t('Status')}</TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedCurEncounters.length > 0 ? (
                normalizedCurEncounters.map((encounter, encounterID) => {
                  return (
                    <TableRow key={encounterID}>
                      <TableCell align='right' omponent='td' scope='row'>
                        <StyledTableTextCell>
                          {' '}
                          {moment.utc(encounter.startTime).format('HH:mm')}{' '}
                        </StyledTableTextCell>
                      </TableCell>
                      <TableCell align='right'>
                        <StyledTableTextCell
                          title={parseMultipleExaminations(
                            encounter.serviceType,
                            encounter.examination,
                          )}>
                          {parseMultipleExaminations(
                            encounter.serviceType,
                            encounter.examination,
                          )}
                        </StyledTableTextCell>
                      </TableCell>
                      <TableCell align='center'>
                        <StyledLabelStatusAppointment>
                          <TitleValueComponent
                            name={
                              encounterStatuses && encounter
                                ? t(encounterStatuses[encounter.status])
                                : ''
                            }
                          />
                        </StyledLabelStatusAppointment>
                      </TableCell>
                      <TableCell align='right'>
                        <StyledHrefTableButton
                          disabled={
                            authorizationACO.encounterSheet !== 'view' &&
                            authorizationACO.encounterSheet !== 'write'
                          }
                          size={'small'}
                          variant='outlined'
                          color='primary'
                          href='#contained-buttons'>
                          {t('navigate to encounter sheet')}
                        </StyledHrefTableButton>
                      </TableCell>
                      <TableCell align='right'>
                        <StyledHrefTableButton
                          disabled={
                            authorizationACO.patientAdmission !== 'view' &&
                            authorizationACO.patientAdmission !== 'write'
                          }
                          size={'large'}
                          variant='outlined'
                          color='primary'
                          href='#contained-buttons'>
                          {t('Admission form')}
                        </StyledHrefTableButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow key={'encounters_no_past_rows'}>
                  <TableCell
                    colSpan='5'
                    align='center'
                    omponent='td'
                    scope='row'>
                    {t('No data found for display')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
      <React.Fragment>
        <br />
        <StyledHeaderTableAppointment>
          {t('Future appointments')}
          <StyledHrefButton
            disabled={
              authorizationACO.createNewAppointment !== 'view' &&
              authorizationACO.createNewAppointment !== 'write'
            }
            size={'small'}
            variant='contained'
            color='primary'
            href='#contained-buttons'
            onClick={() => handleCreateAppointment(patientData)}>
            {t('Create new appointment')}
          </StyledHrefButton>
        </StyledHeaderTableAppointment>
        <ul></ul>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>{t('Appointment time')}</TableCell>
                <TableCell align='right'>{t('Lab test type')}</TableCell>
                <TableCell align='center'>{t('Status')}</TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedNextAppointments.length > 0 ? (
                // eslint-disable-next-line
                normalizedNextAppointments.map((appointment, appointmentID) => {
                  if (--futureAppointmentsCounter >= 0)
                    return (
                      <TableRow key={appointmentID}>
                        <TableCell align='right' omponent='td' scope='row'>
                          <StyledTableTextCell>
                            {' '}
                            {curDate ===
                            moment
                              .utc(appointment.startTime)
                              .format('DD/MM/YYYY')
                              ? `${t('today')} - ${moment
                                  .utc(appointment.startTime)
                                  .format('HH:mm')}`
                              : moment
                                  .utc(appointment.startTime)
                                  .format('DD/MM/YYYY HH:mm')}{' '}
                          </StyledTableTextCell>
                        </TableCell>
                        <TableCell align='right'>
                          <StyledTableTextCell
                            title={parseMultipleExaminations(
                              appointment.serviceType,
                              appointment.examination,
                            )}></StyledTableTextCell>
                        </TableCell>
                        <TableCell align='center'>
                          <StyledLabelStatusAppointment>
                            <TitleValueComponent
                              name={
                                patientTrackingStatuses && appointment
                                  ? t(
                                      patientTrackingStatuses[
                                        appointment.status
                                      ],
                                    )
                                  : ''
                              }
                            />
                          </StyledLabelStatusAppointment>
                        </TableCell>
                        <TableCell align='right'>
                          <StyledHrefTableButton
                            disabled={
                              authorizationACO.appointmentDetails !== 'view' &&
                              authorizationACO.appointmentDetails !== 'write'
                            }
                            size={'small'}
                            variant='outlined'
                            color='primary'
                            href='#contained-buttons'>
                            {t('Appointment details')}
                          </StyledHrefTableButton>
                        </TableCell>
                        <TableCell align='right'>
                          <StyledHrefTableButton
                            disabled={
                              authorizationACO.cancelAppointment !== 'view' &&
                              authorizationACO.cancelAppointment !== 'write'
                            }
                            size={'large'}
                            variant='outlined'
                            color='primary'
                            href='#contained-buttons'>
                            {t('Cancel appointment')}
                          </StyledHrefTableButton>
                        </TableCell>
                      </TableRow>
                    );
                })
              ) : (
                <TableRow key={'encounters_no_past_rows'}>
                  <TableCell
                    colSpan='6'
                    align='center'
                    omponent='td'
                    scope='row'>
                    {t('No data found for display')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {normalizedNextAppointments.length > 2 ? (
          <StyledLabelTableButton onClick={toggleFutureAppointmentsTable}>
            {t(
              !showAllFutureAppointments
                ? 'Show all appointments'
                : 'Show less appointments',
            )}
            <StyledIconValueComponent
              iconType={
                !showAllFutureAppointments
                  ? 'keyboard_arrow_down'
                  : 'keyboard_arrow_up'
              }
            />
          </StyledLabelTableButton>
        ) : null}
      </React.Fragment>
      <React.Fragment>
        <br />
        <StyledHeaderTableAppointment>
          {t('Previous encounters')}
        </StyledHeaderTableAppointment>
        <ul></ul>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>{t('Date')}</TableCell>
                <TableCell align='right'>{t('Lab test type')}</TableCell>
                <TableCell align='center'>{t('Status')}</TableCell>
                <TableCell align='right'></TableCell>
                <TableCell align='right'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {normalizedPrevEncounters !== null &&
              normalizedPrevEncounters.length > 0 ? (
                // eslint-disable-next-line
                normalizedPrevEncounters.map((encounter, encounterID) => {
                  if (--pastEncounterCounter >= 0) {
                    return (
                      <TableRow key={encounterID}>
                        <TableCell align='right' omponent='td' scope='row'>
                          <StyledTableTextCell>
                            {' '}
                            {moment
                              .utc(encounter.startTime)
                              .format('DD/MM/YYYY')}{' '}
                          </StyledTableTextCell>
                        </TableCell>
                        <TableCell align='right'>
                          <StyledTableTextCell
                            title={parseMultipleExaminations(
                              encounter.serviceType,
                              encounter.examination,
                            )}>
                            {parseMultipleExaminations(
                              encounter.serviceType,
                              encounter.examination,
                            )}
                          </StyledTableTextCell>
                        </TableCell>
                        <TableCell align='center'>
                          <StyledLabelStatusAppointment>
                            <TitleValueComponent
                              name={
                                encounterStatuses && encounter
                                  ? t(encounterStatuses[encounter.status])
                                  : ''
                              }
                            />
                          </StyledLabelStatusAppointment>
                        </TableCell>
                        <TableCell align='right'>
                          <StyledHrefTableButton
                            disabled={
                              authorizationACO.encounterSheet !== 'view' &&
                              authorizationACO.encounterSheet !== 'write'
                            }
                            size={'small'}
                            variant='outlined'
                            color='primary'
                            href='#contained-buttons'>
                            {t('Encounter sheet')}
                          </StyledHrefTableButton>
                        </TableCell>
                        <TableCell align='right'>
                          {encounter.status === 'finished' ? (
                            <StyledHrefTableButton
                              /*disable = {authorizationACO.sendResult !== "view" && authorizationACO.sendResult !== "write" }*/
                              size={'large'}
                              variant='outlined'
                              color='primary'
                              href='#contained-buttons'>
                              {t('Send result')}
                            </StyledHrefTableButton>
                          ) : (
                            ''
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow key={'encounters_no_past_rows'}>
                  <TableCell
                    colSpan='5'
                    align='center'
                    omponent='td'
                    scope='row'>
                    {t('No data found for display')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {normalizedPrevEncounters.length > 2 ? (
          <StyledLabelTableButton onClick={togglePastEncountersTable}>
            {t(
              !showAllPastEncounter
                ? 'Show all encounters'
                : 'Show less encounters',
            )}
            <StyledIconValueComponent
              iconType={
                !showAllPastEncounter
                  ? 'keyboard_arrow_down'
                  : 'keyboard_arrow_up'
              }
            />
          </StyledLabelTableButton>
        ) : null}
      </React.Fragment>
    </React.Fragment>
  );
};

export default AppointmentsAndEncountersTables;
