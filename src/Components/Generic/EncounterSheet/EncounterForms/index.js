import React from 'react';
import StyledPatientFiles from './Style';
import { getForms } from 'Utils/Services/API';
import FormsContainer from './FormsContainer';
import PopUpOnExit from 'Assets/Elements/PopUpOnExit';
import HeaderPatient from 'Assets/Elements/HeaderPatient';
import { useHistory } from 'react-router-dom';
import { devicesValue } from 'Assets/Themes/BreakPoints';
import { useMediaQuery } from '@material-ui/core';
import * as Moment from 'moment';
import { useTranslation } from 'react-i18next';
const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
  prevEncounterId,
  verticalName,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formsPerSheet, setFormsPerSheet] = React.useState();
  const { t } = useTranslation();
  const history = useHistory();

  const isTabletMode = useMediaQuery(
    `(max-width: ${devicesValue.tabletPortrait}px)`,
  );
  const allBreadcrumbs = [
    {
      text: t('Encounter sheet'),
      separator: 'NavigateNextIcon',
      url: '#',
    },
    {
      text: `${patient.firstName} ${patient.lastName} ${
        !isTabletMode ? `${t('Encounter date')}: ` : ''
      } ${Moment(encounter.startTime).format(formatDate)}`,
      separator: false,
      url: '#',
    },
  ];

  const handleCloseClick = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const forms = await getForms(
          encounter.serviceTypeCode,
          encounter.examinationCode,
        );
        setFormsPerSheet(forms);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [encounter.serviceTypeCode, encounter.examinationCode]);
  return (
    <>
      <PopUpOnExit
        isOpen={isOpen}
        exitWithOutSavingFunction={() =>
          history.push(`/${verticalName}/PatientTracking`)
        }
        returnFunction={() => {
          setIsOpen(false);
        }}
      />
      <HeaderPatient
        breadcrumbs={allBreadcrumbs}
        languageDirection={languageDirection}
        onCloseClick={handleCloseClick}
      />
      <StyledPatientFiles>
        {formsPerSheet ? (
          <FormsContainer
            dir={languageDirection}
            tabs={formsPerSheet}
            prevEncounterId={prevEncounterId}
          />
        ) : null}
      </StyledPatientFiles>
    </>
  );
};

export default EncounterForms;
