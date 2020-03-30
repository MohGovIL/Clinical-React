import Moment from "moment";
import React from 'react';
import {connect} from 'react-redux';
import MomentUtils from "@date-io/moment";
import {StyledDatePicker, StyledKeyboardDatePicker, GlobalStyledDatePicker} from "./Styles";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {IconButton} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import {setFilterDateAction} from "../../../Store/Actions/FilterActions/FilterActions";

import 'moment/locale/en-gb';
import 'moment/locale/he';

/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param dateFormat
 * @param languageDirection
 * @param languageCode
 * @param filterDate
 * @param setFilterDateAction
 * @param props
 * @param isDisabled - bool
 * @returns {*}
 * @constructor
 */

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

    //Can set this values from CustomizedProps
    let DatePickerType = StyledDatePicker;
    let showPrevArrow = true;
    let showNextArrow = true;

    let PickerProps = {
        disableToolbar: true,
        variant: "inline",
        format: "MMMM D, dddd",
        InputProps: {
            disableUnderline: true,
        },
        id: "date-picker-inline",
        value: filterDate,
        onChange: handleDateChange,
        autoOk: true,
        text_color: props.isDisabled ? 'rgba(0, 0, 0, 0.26)' : props.iconColor,
        disabled: props.isDisabled,
        color: null,
    };

    if ('CustomizedProps' in props && typeof props.CustomizedProps !== 'undefined') {
        showPrevArrow = typeof props.CustomizedProps.showPrevArrow !== 'undefined' && props.CustomizedProps.showPrevArrow ? true : false;
        showNextArrow = typeof props.CustomizedProps.showNextArrow !== 'undefined' && props.CustomizedProps.showNextArrow ? true : false;
        DatePickerType = props.CustomizedProps.keyBoardInput ? StyledKeyboardDatePicker : StyledDatePicker;
        if (props.CustomizedProps.keyBoardInput) {
            PickerProps.inputVariant = props.PickerProps.variant;
        }
    }

    if ('PickerProps' in props && typeof props.PickerProps !== 'undefined') {
        PickerProps = props.PickerProps;
    }

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
            <GlobalStyledDatePicker iconColor={props.iconColor} langDirection={languageDirection}/>
            <>
                {showPrevArrow &&
                <IconButton onClick={() => scrollDays('prev')} disabled={props.isDisabled}>
                    <ChevronFirst style={props.iconSize ? {fontSize:  props.iconSize}: {}} htmlColor={props.isDisabled ? 'rgba(0, 0, 0, 0.26)' : props.iconColor}/>
                </IconButton>
                }
                <DatePickerType
                    {...PickerProps}
                />
                {showNextArrow &&
                <IconButton onClick={() => scrollDays('next')} disabled={props.isDisabled}>
                    <ChevronSecond style={props.iconSize ? {fontSize:  props.iconSize}: {}} htmlColor={props.isDisabled ? 'rgba(0, 0, 0, 0.26)' : props.iconColor}/>
                </IconButton>
                }
            </>
        </MuiPickersUtilsProvider>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        dateFormat: state.settings.format_date,
        languageDirection: state.settings.lang_dir,
        languageCode: state.settings.lang_code,
        filterDate: state.filters.filter_date,
        props: ownProps,
    }
};

export default connect(mapStateToProps, {setFilterDateAction})(CustomizedDatePicker);
