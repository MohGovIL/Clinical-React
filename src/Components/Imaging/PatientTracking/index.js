import React, { useEffect, useState, useRef } from 'react';
import PatientTrackingStyle, {
  StyledFilterBox,
  TableRowStyle,
  StyledTitle,
} from './Style';
import StatusFilterBox from 'Assets/Elements/StatusFilterBox';
import CustomizedTable from 'Assets/Elements/CustomizedTable';
import { connect } from 'react-redux';
import Header from 'Assets/Elements/Header';
import { useTranslation } from 'react-i18next';
import { getMenu } from 'Utils/Services/API';
import FilterBox from './FilterBox';
import Title from 'Assets/Elements/Title';
import isAllowed from 'Utils/Helpers/isAllowed';
import { getStaticTabsArray } from 'Utils/Helpers/patientTrackingTabs/staticTabsArray';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { basePath } from 'Utils/Helpers/basePath';
import { ApiTokens } from 'Utils/Services/ApiTokens';
import { getToken } from 'Utils/Helpers/getToken';

const PatientTracking = ({ vertical, history, selectFilter, facilityId }) => {
  const { t } = useTranslation();
  // Set the popUp
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const source = useRef(null);

  const [eventId, setEventId] = useState('');

  useEffect(() => {
    try {
      const EventSource = NativeEventSource || EventSourcePolyfill;
      // Checking if the EventSource is available on the user's machine
      if (typeof EventSource !== undefined) {
        // Checking if this is the first render or if the SSE stream is closed.
        // Reason for doing that is to not create a new instance every time and use the open one
        // Because SSE knows how to reconnect automatically when there is an error
        // So I make sure to
        if (
          !source.current ||
          source.current.readyState === source.current.CLOSED
        ) {
          let eventSourceHeaders = {
            headers: {
              Authorization: `${ApiTokens.API.tokenType} ${getToken(
                ApiTokens.API.tokenName,
              )}`,
            },
          };

          source.current = new EventSourcePolyfill(
            `${basePath()}apis/api/sse/patients-tracking/check-refresh/${
              selectFilter.filter_organization || facilityId
            }`,
            eventSourceHeaders,
          );
          // source.current = new EventSourcePolyfill(
          //   `${basePath()}apis/api/sse/patients-tracking/check-refresh/${'ALL'}`,
          //   eventSourceHeaders,
          // );

          source.current.onopen = onOpen;
          source.current.onmessage = onMessage;
          source.current.onerror = onError;
        }
      } else {
        console.log(
          'Error: Server-Sent Events are not supported in your browser',
        );
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      // Clean up function happens when re-render is happening by the dependencies array
      // or when the component gets unmounted
      try {
        if (
          !source.current ||
          source.current.readyState === source.current.OPEN
        ) {
          source.current.close();
          console.log(source.current);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [selectFilter.filter_organization, facilityId]);

  const onError = (event) => {};

  const onMessage = (event) => {
    console.log('msg');
    setEventId(event.lastEventId);
  };

  const onOpen = (event) => {};
  //The tabs of the Status filter box component.
  const [tabs, setTabs] = useState([]);

  //table is an array of 2 arrays inside. First array represents the table headers, the second array represents the table data combined them together so it won't be making double rendering.
  const [[tableHeaders, tableData], setTable] = useState([[], []]);

  //The headers menu items
  const [menuItems, setMenuItems] = useState([]);

  const prevFilterBoxValue = useRef(0);

  useEffect(() => {
    // Checking if this is the first render since this dependencies array
    // in this useEffect is getting set in a child component
    if (!selectFilter.STATUS && !selectFilter.filter_organization) {
      return;
    }
    //Create an array of permitted tabs according to the user role.
    let tabs = getStaticTabsArray();
    for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
      const tab = tabs[tabIndex];
      const mode = isAllowed(tab.id);
      tab.mode = mode;
    }
    const MAX_TABS = tabs.length;
    tabs = tabs.filter((tab) => tab.mode !== 'hide');
    if (MAX_TABS !== tabs.length) {
      tabs.forEach((tab, tabIndex) => {
        tab.tabValue = tabIndex;
      });
    }
    setTabs(tabs);

    //Filter box mechanism for activeTabs
    for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
      console.log('render');
      const tab = tabs[tabIndex];
      if (tab.tabValue === selectFilter.statusFilterBoxValue) {
        tab.activeAction(
          setTable,
          setTabs,
          history,
          selectFilter,
          setIsPopUpOpen,
        );
      } else {
        if (selectFilter.statusFilterBoxValue === prevFilterBoxValue.current) {
          tab.notActiveAction(setTabs, selectFilter);
        }
      }
    }
    prevFilterBoxValue.current = selectFilter.statusFilterBoxValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectFilter.filter_date,
    selectFilter.statusFilterBoxValue,
    selectFilter.filter_service_type,
    selectFilter.filter_organization,
    eventId,
  ]);
  //Gets the menu items
  useEffect(() => {
    (async () => {
      try {
        const menuData = await getMenu(`${vertical}-client`);
        const menuDataClone = menuData.data.map((menuDataItem) => {
          menuDataItem.label = t(menuDataItem.label);
          return menuDataItem;
        });
        setMenuItems(menuDataClone);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onClosePopUpHandler = () => {
    setIsPopUpOpen(false);
  };
  return (
    <React.Fragment>
      <CustomizedPopup
        isOpen={isPopUpOpen}
        onClose={onClosePopUpHandler}
        title={t('System notification')}>
        {t(
          'The patient admission process has been started by another user and is yet to be finished',
        )}
      </CustomizedPopup>
      <Header Items={menuItems} />
      <PatientTrackingStyle>
        <StyledTitle>
          <Title
            fontSize={'28px'}
            color={'#002398'}
            label={'Patient tracking'}
          />
        </StyledTitle>
        <StyledFilterBox>
          <FilterBox />
        </StyledFilterBox>
        <TableRowStyle>
          <StatusFilterBox tabs={tabs} />
          <CustomizedTable tableHeaders={tableHeaders} tableData={tableData} />
        </TableRowStyle>
      </PatientTrackingStyle>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    // fhirDataStatus: state.fhirData.STATUS,
    // appointments: state.fhirData.appointments,
    // patients: state.fhirData.patients,
    vertical: state.settings.clinikal_vertical,
    // userRole: state.settings.user_role,
    selectFilter: state.filters,
    facilityId: state.settings.facility,
  };
};

export default connect(mapStateToProps, null)(PatientTracking);
