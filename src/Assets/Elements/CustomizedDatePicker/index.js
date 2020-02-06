import "date-fns";
import Moment from "moment";
import React, {useState} from 'react';
import {connect} from 'react-redux';
import StyledFilterBox from "../../../Components/Imaging/PatientTracking/FilterBox/Style";
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import MomentUtils from "@date-io/moment";
import 'moment/locale/he';

import Button from "@material-ui/core/Button/Button";

const CustomizedDatePicker = ({dateFormat}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);

    };
    const handleMonthChange = month => {
        console.log("just do it");
        console.log(month);
        console.log("just do it");
    }

    const openPicker = () => {
        console.log("date is: " + selectedDate);
    }

    const [isOpen, setIsOpen] = useState(false);

    //need to place in settings
    Moment.updateLocale('he', {
        weekdays : 'יום ראשון_ יום שני_ יום שלישי_ יום רביעי_ יום חמישי_ יום שישי_שבת'.split('_'),
    });

    return (
            <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
                <Button onClick={() => openPicker()}> Prev </Button>
                <DatePicker
                    disableToolbar={"true"}
                    variant="inline"
                    format={"MMMM D, dddd"}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <Button onClick={() => setIsOpen(true)}> Next </Button>
            </MuiPickersUtilsProvider>
    );
};
const mapStateToProps = state => {
    return {
        dateFormat: state.settings.format_date
    }
}

export default connect(mapStateToProps, null)(CustomizedDatePicker);
