import Moment from "moment";
import React from 'react';
import {connect} from 'react-redux';
import MomentUtils from "@date-io/moment";
import {StyledDatePicker, GlobalStyledDatePicker} from "./Styles";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {IconButton} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";

import 'moment/locale/en-gb';
import 'moment/locale/he';
import {setFilterDateAction} from "../../../Store/Actions/SettingsActions/SettingsActions";

const CustomizedDatePicker = ({dateFormat, languageDirection, languageCode, filterDate, setFilterDateAction, props}) => {
    languageCode = (languageCode === "en" ? "en-gb" : languageCode);

    Moment.locale(languageCode);

    if (languageCode === 'he') {
        Moment.updateLocale('he', {
            weekdays: 'יום ראשון_ יום שני_ יום שלישי_ יום רביעי_ יום חמישי_ יום שישי_שבת'.split('_'),
            weekdaysShort: 'א_ב_ג_ד_ה_ו_ש'.split('_'),
        });
    }

    const handleDateChange = date => {
        setFilterDateAction(date);
    };

    const scrollDays = (direction) => {
        let futureMoment;

        if (direction === 'prev') {
            futureMoment = Moment(filterDate).subtract(1, 'days');
        }
        if (direction === 'next') {
            futureMoment = Moment(filterDate).add(1, 'days');
        }
        setFilterDateAction(futureMoment);
    };

    const ChevronFirst = languageDirection === 'rtl' ? ChevronRight : ChevronLeft;
    const ChevronSecond = languageDirection === 'rtl' ? ChevronLeft : ChevronRight;

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
            <GlobalStyledDatePicker iconColor={props.iconColor} langDirection={languageDirection}/>
            <IconButton onClick={() => scrollDays('prev')}>
                <ChevronFirst htmlColor={props.iconColor}/>
            </IconButton>
            <StyledDatePicker
                disableToolbar
                variant="inline"
                format={"MMMM D, dddd"}
                InputProps={{
                    disableUnderline: true,
                }}
                id="date-picker-inline"
                value={filterDate}
                onChange={handleDateChange}
                autoOk
                text_color={props.iconColor}
            />
            <IconButton onClick={() => scrollDays('next')}>
                <ChevronSecond htmlColor={props.iconColor}/>
            </IconButton>
        </MuiPickersUtilsProvider>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        dateFormat: state.settings.format_date,
        languageDirection: state.settings.lang_dir,
        languageCode: state.settings.lang_code,
        filterDate: state.settings.filter_date,
        props: ownProps,
    }
}

export default connect(mapStateToProps, {setFilterDateAction})(CustomizedDatePicker);
