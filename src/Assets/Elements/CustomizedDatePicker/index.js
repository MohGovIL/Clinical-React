import "date-fns";
import Moment from "moment";
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core";
// import 'moment/locale/he';

const customizedDatePickerStyle = makeStyles({
    label: {
        transform: props => `rotate( ${props.languageDirection === 'rtl' ? '180deg' : '0def'} )`,
    }
});

const CustomizedDatePicker = ({dateFormat, languageDirection, languageCode}) => {
    // languageCode = 'en-gb';

    import(`moment/locale/${languageCode}.js`).then(component => {
        Moment.locale(languageCode);
        if (languageCode === 'he') {
            Moment.updateLocale('he', {
                weekdays: 'יום ראשון_ יום שני_ יום שלישי_ יום רביעי_ יום חמישי_ יום שישי_שבת'.split('_'),
            });
        }
    }).catch(err => {
        console.log("CustomizedDatePicker: error: " + err);
    });

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

    const classes = customizedDatePickerStyle({languageDirection});

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
            <Button onClick={() => scrollDays('prev')}> Prev </Button>
            <DatePicker
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
        dateFormat: state.settings.format_date,
        languageDirection: state.settings.lang_dir,
        languageCode: state.settings.lang_code,
    }
}

export default connect(mapStateToProps, null)(CustomizedDatePicker);
