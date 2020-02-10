import Moment, {lang} from "moment";
import React, {useState} from 'react';
import {connect} from 'react-redux';
import MomentUtils from "@date-io/moment";

import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import {makeStyles, IconButton} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

import 'moment/locale/en-gb';
import 'moment/locale/he';
import 'moment/locale/ru';
import mergeProps from "react-redux/lib/connect/mergeProps";



const customizedDatePickerStyle = makeStyles({
    label: {
        transform: props => `rotate( ${props.languageDirection === 'rtl' ? '180deg' : '0def'} )`,
        color: props => `${props.props.icon_color}`,
    }
});

const CustomizedDatePicker = ({dateFormat, languageDirection, languageCode, props}) => {
console.log("-==========-");
console.log(props);
console.log("-==========-");
    languageCode = (languageCode === "en" ? "en-gb" : languageCode);
    Moment.locale(languageCode);

    if (languageCode === 'he') {
        Moment.updateLocale('he', {
            weekdays: 'יום ראשון_ יום שני_ יום שלישי_ יום רביעי_ יום חמישי_ יום שישי_שבת'.split('_'),
        });
    }

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

    const classes = customizedDatePickerStyle({languageDirection, props});

    const ChevronFirst = languageDirection === 'rtl' ? ChevronRight: ChevronLeft;
    const ChevronSecond = languageDirection === 'rtl' ? ChevronLeft : ChevronRight;

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
            <IconButton onClick={() => scrollDays('prev')}>
                <ChevronFirst htmlColor={props.icon_color} />
            </IconButton>
            <DatePicker
                disableToolbar
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
                autoOk
                // showTabs="true"
                // showTodayButton
                // okLabel={""}
                // cancelLabel={""}
                /*DialogProps={{
                    root: {},
                    style: {
                        zIndex: "0 !important",
                    },
                }}*/
            />
            <IconButton onClick={() => scrollDays('next')}>
                <ChevronSecond htmlColor={props.icon_color} />
            </IconButton>
        </MuiPickersUtilsProvider>
    );
};

const mapStateToProps = (state, props) => {
    return {
        dateFormat: state.settings.format_date,
        languageDirection: state.settings.lang_dir,
        languageCode: state.settings.lang_code,
        props: props,
    }
}

export default connect(mapStateToProps,null)(CustomizedDatePicker);
