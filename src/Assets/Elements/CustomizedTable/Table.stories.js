import React from 'react';
import CustomizedTable from './index';
import { StylesProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../Themes/GlobalStyle';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Table',
  component: CustomizedTable,
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

export const tableHeadersData = [
  {
    tableHeader: 'Personal information',
  },
  {
    tableHeader: 'Cell phone',
  },
  {
    tableHeader: 'Healthcare service',
  },
  {
    tableHeader: 'Reason for refferal',
  },
  {
    tableHeader: 'Time',
  },
  {
    tableHeader: 'Status',
  },
  {
    tableHeader: 'Messages',
  },
  {
    tableHeader: 'Patient admission',
    hideTableHeader: true,
  },
];

export const appointmentsData = [
  {
    id: 2,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-07T00:00:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 0,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-08T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-09T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-12T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-13T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-15T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-16T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-19T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-20T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-22T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-23T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-26T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-27T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-29T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 1,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-30T12:30:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 7,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-14T08:15:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 6,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-14T11:45:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 8,
    priority: 1,
    status: 'pending',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-15T11:00:00.000Z',
    participants: {
      patient: {
        id: 2,
        identifier: '25432525',
        firstName: 'Idan',
        middleName: '',
        lastName: 'Gigi',
        gender: 'male',
        birthDate: '2008-01-08',
      },
    },
  },
  {
    id: 3,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-21T10:15:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 3,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-27T10:15:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 4,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-28T09:15:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
  {
    id: 5,
    priority: 1,
    status: 'noshow',
    healthCareService: 'Cardiology',
    examination: 'ביקור שגרתי - רופא',
    time: '2020-01-28T12:00:00.000Z',
    participants: {
      patient: {
        id: 1,
        identifier: '23423423542',
        firstName: 'Yosi',
        middleName: 'the lion',
        lastName: 'Levi',
        mobileCellPhone: '0544808806',
        homePhone: '036495774',
        email: 'eyalvo@matrix.co.il',
        gender: 'female',
        birthDate: '2007-01-01',
      },
    },
  },
];

export const optionsData = [
  {
    code: 'pending',
    display: 'Pending',
  },
  {
    code: 'booked',
    display: 'Booked',
  },
  {
    code: 'arrived',
    display: 'Arrived',
  },
  {
    code: 'cancelled',
    display: 'Cancelled',
  },
  {
    code: 'noshow',
    display: 'No Show',
  },
  {
    code: 'waitlist',
    display: 'Waitlisted',
  },
];

export const table = () => {
  return (
    <CustomizedTable
      tableData={object('appointments', [...appointmentsData])}
      tableHeaders={object('tableHeaders', [...tableHeadersData])}
      options={object('Statuses', [...optionsData])}
    />
  );
};
