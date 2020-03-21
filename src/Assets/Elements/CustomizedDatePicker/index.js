import Moment from "moment";
import React from 'react';
import {connect} from 'react-redux';
import MomentUtils from "@date-io/moment";
import {StyledDatePicker, GlobalStyledDatePicker} from "./Styles";
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

    if ('PickerProps' in props && typeof props.PickerProps !== 'undefined') {
        showPrevArrow = typeof props.PickerProps.showPrevArrow !== 'undefined' && props.PickerProps.showPrevArrow ? true : false;
        showNextArrow = typeof props.PickerProps.showNextArrow !== 'undefined' && props.PickerProps.showNextArrow ? true : false;

        PickerProps.id = typeof props.PickerProps.id !== 'undefined' && props.PickerProps.id ? props.PickerProps.id : PickerProps.id;
        PickerProps.disableToolbar = typeof props.PickerProps.disableToolbar !== 'undefined' ? props.PickerProps.disableToolbar : PickerProps.disableToolbar;
        PickerProps.format = typeof props.PickerProps.format !== 'undefined' && props.PickerProps.format ? props.PickerProps.format : PickerProps.format;
        PickerProps.required = typeof props.PickerProps.required !== 'undefined' && props.PickerProps.required ? props.PickerProps.required : false;
        PickerProps.label = typeof props.PickerProps.label !== 'undefined' && props.PickerProps.label ? props.PickerProps.label : null;
        PickerProps.value = typeof props.PickerProps.value !== 'undefined' && props.PickerProps.value ? props.PickerProps.value : filterDate;
        PickerProps.name = typeof props.PickerProps.name !== 'undefined' && props.PickerProps.name ? props.PickerProps.name : null;
        PickerProps.color = typeof props.PickerProps.color !== 'undefined' && props.PickerProps.color ? props.PickerProps.color : null;
        PickerProps.onChange = typeof props.PickerProps.onChange !== 'undefined' && props.PickerProps.onChange ? props.PickerProps.onChange : PickerProps.onChange;
        //PickerProps.variant = typeof props.PickerProps.variant !== 'undefined' && props.PickerProps.variant ?  props.PickerProps.variant :  PickerProps.variant;

        console.log("-----------------");
        console.log(PickerProps);
        console.log("-----------------");
    }

    // console.log("=========CustomizedDatePicker===========");
    // console.log(props);
    // console.log("=========CustomizedDatePicker===========");

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
            <GlobalStyledDatePicker iconColor={props.iconColor} langDirection={languageDirection}/>
            <>
                {showPrevArrow &&
                <IconButton onClick={() => scrollDays('prev')} disabled={props.isDisabled}>
                    <ChevronFirst htmlColor={props.isDisabled ? 'rgba(0, 0, 0, 0.26)' : props.iconColor}/>
                </IconButton>
                }
                <StyledDatePicker
                    {...PickerProps}
                />
                {showNextArrow &&
                <IconButton onClick={() => scrollDays('next')} disabled={props.isDisabled}>
                    <ChevronSecond htmlColor={props.isDisabled ? 'rgba(0, 0, 0, 0.26)' : props.iconColor}/>
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
