import React from 'react';
import TitleValueComponent from './TitleValueComponent';
import { useTranslation } from 'react-i18next';
import {
  StyledBox,
  StyledLabelAppointment,
  StyledLabelStatusAppointment,
  StyledLinkWithIconComponent,
} from './Style';
import moment from 'moment';
import normalizeFhirAppointment from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import LinkComponentWithIcon from './LinkComponentWithIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const AppointmentsPerPatient = ({
  nextAppointment,
  curEncounter,
  prevEncounter,
  patientTrackingStatuses,
  encounterStatuses,
  gotToPatientAdmission,
}) => {
  const { t } = useTranslation();

  const prevEncounterEntry =
    prevEncounter && prevEncounter.data && prevEncounter.data.total > 0
      ? prevEncounter.data.entry[1].resource
      : null;
  const nextAppointmentElem =
    nextAppointment && nextAppointment.data && nextAppointment.data.total > 0
      ? nextAppointment.data.entry[1].resource
      : null;
  const nextAppointmentEntry = nextAppointmentElem
    ? normalizeFhirAppointment(nextAppointmentElem)
    : null;
  const normalizedPrevEncounter = prevEncounterEntry
    ? normalizeFhirEncounter(prevEncounterEntry)
    : null;
  let normalizedCurEncounters = [];
  const getAppointmentWithTimeOrNot = (nextAppointmentEntry) => {
    let isThisAppToday =
      moment.utc(nextAppointmentEntry.startTime).format('DD/MM/YYYY') ===
      moment().utc().format('DD/MM/YYYY')
        ? true
        : false;
    return isThisAppToday
      ? `${t('Today')} ${moment
          .utc(nextAppointmentEntry.startTime)
          .format('HH:mm')}`
      : moment.utc(nextAppointmentEntry.startTime).format('DD/MM/YYYY');
  };
  if (curEncounter.data && curEncounter.data.total > 0) {
    let entry = curEncounter.data.entry;
    // eslint-disable-next-line
    entry.map((response, resourceIndex) => {
      if (
        response &&
        response.resource &&
        response.resource.resourceType === 'Encounter'
      ) {
        let normalizedCurEncounter = normalizeFhirEncounter(response.resource);
        normalizedCurEncounters.push(normalizedCurEncounter);
      }
    });
  }

  return (
    <React.Fragment>
      <StyledBox>
        <List>
          {normalizedCurEncounters.length > 0
            ? normalizedCurEncounters.map((encounter, encounterID) => {
                return (
                  <ListItem key={encounterID + '_normalizedCurEncounters'}>
                    <StyledLabelAppointment>
                      <TitleValueComponent
                        name={t('Current encounter')}
                        value={moment
                          .utc(encounter.startTime)
                          .format('DD/MM/YYYY')}
                        seperator={true}
                      />
                    </StyledLabelAppointment>

                    <StyledLabelAppointment>
                      <TitleValueComponent name={t(encounter.serviceType)} />
                    </StyledLabelAppointment>

                    <StyledLabelStatusAppointment>
                      <TitleValueComponent
                        name={
                          encounterStatuses && encounter
                            ? t(encounterStatuses[encounter.status])
                            : ''
                        } /*t(normalizedPrevEncounter.status.charAt(0).toUpperCase() + normalizedPrevEncounter.status.slice(1))}*/
                      />
                    </StyledLabelStatusAppointment>

                    <StyledLinkWithIconComponent>
                      <LinkComponentWithIcon
                        linkHeader={t('navigate to encounter sheet')}
                        linkUrl={'#'}
                      />
                    </StyledLinkWithIconComponent>
                  </ListItem>
                );
              })
            : null}
          {nextAppointmentEntry ? (
            <ListItem key={nextAppointmentEntry.id + '_nextAppointmentEntry'}>
              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t('Next appointment')}
                  //Check if it is today if so show hour also ...
                  //Else Show the future date of the appointment
                  value={getAppointmentWithTimeOrNot(nextAppointmentEntry)}
                  seperator={true}
                />
              </StyledLabelAppointment>

              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t(nextAppointmentEntry.serviceType)}
                />
              </StyledLabelAppointment>

              <StyledLabelStatusAppointment>
                <TitleValueComponent
                  name={
                    patientTrackingStatuses && nextAppointmentEntry
                      ? t(patientTrackingStatuses[nextAppointmentEntry.status])
                      : ''
                  }
                />
              </StyledLabelStatusAppointment>

              <StyledLinkWithIconComponent>
                <LinkComponentWithIcon
                  linkHeader={t('Navigate to appointment details')}
                  linkUrl={'#'}
                />
              </StyledLinkWithIconComponent>
            </ListItem>
          ) : (
            <ListItem key={'nextAppointmentEntry_2'}>
              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t('Next appointment')}
                  value={t('Non existence')}
                  seperator={true}
                />
              </StyledLabelAppointment>
            </ListItem>
          )}
          {normalizedPrevEncounter !== null ? (
            <ListItem
              key={normalizedPrevEncounter.id + '_normalizedPrevEncounter'}>
              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t('Previous encounter')}
                  value={moment
                    .utc(normalizedPrevEncounter.startTime)
                    .format('DD/MM/YYYY')}
                  seperator={true}
                />
              </StyledLabelAppointment>

              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t(normalizedPrevEncounter.serviceType)}
                />
              </StyledLabelAppointment>

              <StyledLabelStatusAppointment>
                <TitleValueComponent
                  name={
                    encounterStatuses && normalizedPrevEncounter
                      ? t(encounterStatuses[normalizedPrevEncounter.status])
                      : ''
                  }
                />
              </StyledLabelStatusAppointment>

              <StyledLinkWithIconComponent>
                <LinkComponentWithIcon
                  linkHeader={t('navigate to encounter sheet')}
                  linkUrl={'#'}
                />
              </StyledLinkWithIconComponent>
            </ListItem>
          ) : (
            <ListItem key={'normalizedPrevEncounter_3'}>
              <StyledLabelAppointment>
                <TitleValueComponent
                  name={t('Previous encounter')}
                  value={t('Non existence')}
                  seperator={true}
                />
              </StyledLabelAppointment>
            </ListItem>
          )}
        </List>
      </StyledBox>
    </React.Fragment>
  );
};

export default AppointmentsPerPatient;
