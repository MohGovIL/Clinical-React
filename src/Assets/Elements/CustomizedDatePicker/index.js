import "date-fns";
import Moment from "moment";
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import StyledDatePicker from "./Styles";

import MomentUtils from "@date-io/moment";
import 'moment/locale/he';

import Button from "@material-ui/core/Button/Button";
import { makeStyles } from "@material-ui/core";

const customizedDatePickerStyle = makeStyles({
    label : {
        transform: 'rotate(180deg)'
    },
});


const CustomizedDatePicker = ({dateFormat, ...other}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const scrollDays = (direction) => {
        let date = new Date(selectedDate);
        if (direction === 'prev') {
            var futureMoment = Moment(date).subtract(1, 'days');
        }
        if (direction === 'next') {
            var futureMoment = Moment(date).add(1, 'days');
        }
        setSelectedDate(futureMoment);
        console.log("Current date: " + futureMoment.format(dateFormat));
    }

    //need to place in settings
    Moment.updateLocale('he', {
        weekdays: 'יום ראשון_ יום שני_ יום שלישי_ יום רביעי_ יום חמישי_ יום שישי_שבת'.split('_'),
    });

    //if(lang_code == 'he){
    //
    // const classes = customizedDatePickerStyle();
    const classes = customizedDatePickerStyle();
    //}

    return (
            <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
                <Button onClick={() => scrollDays('prev')}> Prev </Button>
                <StyledDatePicker
                    disableToolbar={"true"}
                    variant="inline"
                    format={"MMMM D, dddd"}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    leftArrowButtonProps={{
                        classes: classes
                    }}
                    rightArrowButtonProps={{
                        classes: classes
                    }}
                    autoOk={"true"}
                />
                <Button onClick={() => scrollDays('next')}> Next </Button>
            </MuiPickersUtilsProvider>
    );
};

const mapStateToProps = state => {
    return {
        dateFormat: state.settings.format_date
    }
}

export default connect(mapStateToProps, null)(CustomizedDatePicker);
