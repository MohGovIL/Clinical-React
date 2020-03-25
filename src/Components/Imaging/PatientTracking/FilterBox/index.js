import React, {useEffect, useState} from 'react';
import StyledFilterBox, {StyledCustomizedSelect} from "./Style";
import {connect} from "react-redux";
import CustomizedSelect from "../../../../Assets/Elements/CustomizedSelect";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import {useTranslation} from "react-i18next";
import {getHealhcareService, getOrganization} from "../../../../Utils/Services/FhirAPI";
import {normalizeHealthCareServiceValueData, normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import ListItemText from "@material-ui/core/ListItemText";
import errorHandler from "../../../../Utils/Helpers/errorHandler";
import {
    setFilterOrganizationAction,
    setFilterServiceTypeAction
} from "../../../../Store/Actions/FilterActions/FilterActions";

/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param languageDirection
 * @param facility
 * @param props
 * @returns {*}
 * @constructor
 */

const FilterBox = ({languageDirection, facility, selectFilterOrganization, selectFilterServiceType, setFilterOrganizationAction, setFilterServiceTypeAction, tabValue}) => {
    const {t} = useTranslation();

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("All")
        }]
    };

    const [optionsOrganization, setLabelOrganization] = useState([]);
    const [optionsServiceType, setLabelServiceType] = useState([]);

    //Gets organizations list data
    useEffect(() => {
        (async () => {
            try {
                //Array for list options with default element (All).
                let array = emptyArrayAll();
                //Nested destructuring from Promise. ES6 new syntax.
                const {data: {entry: dataOrganization}} = await getOrganization();

                for (let entry of dataOrganization) {
                    if (entry.resource !== undefined) {
                        const labelOrganizationData = normalizeValueData(entry.resource);
                        array.push(labelOrganizationData);
                    }
                }
                setLabelOrganization(array);
            } catch (err) {
                console.log(err);
            }
        })()
    }, []);

    //Auto set current facility
    useEffect(() => {
        if (facility !== 0 && selectFilterOrganization === 0) {
         organizationOnChangeHandler(facility);
        }
    }, []);

    const organizationOnChangeHandler = (code) => {
        setFilterOrganizationAction(code);
        if (code > 0) {
            //Array for list options with default element (All).
            let array = emptyArrayAll();

            (async () => {
                try {
                //Nested destructuring from Promise. ES6 new syntax.
                const {data: {entry: dataServiceType}} = await getHealhcareService(code);

                for (let entry of dataServiceType) {
                    if (entry.resource !== undefined) {
                        const setLabelServiceType = normalizeHealthCareServiceValueData(entry.resource);
                        array.push(setLabelServiceType);
                    }
                }
                setFilterServiceTypeAction(0);
                setLabelServiceType(array);
                }
                catch (err) {
                    errorHandler(err);
                }
            })();
        } else {
            setFilterServiceTypeAction(0);
            setLabelServiceType(emptyArrayAll());
        }
    };

    const serviceTypeOnChangeHandler = (code) => {
        setFilterServiceTypeAction(code);
    };

    return (
        <StyledFilterBox>
            <CustomizedDatePicker iconColor={'#076ce9'} isDisabled={tabValue === 2}/>
            <StyledCustomizedSelect>
                <ListItemText>{t("Facility name")}</ListItemText>
                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                                  defaultValue={selectFilterOrganization} options={optionsOrganization}
                                  onChange={organizationOnChangeHandler}
                                  langDirection={languageDirection}
                />
            </StyledCustomizedSelect>
            <StyledCustomizedSelect>
                <ListItemText>{t("Service type")}</ListItemText>
                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                                  defaultValue={selectFilterServiceType} options={optionsServiceType}
                                  onChange={serviceTypeOnChangeHandler}
                                  langDirection={languageDirection}
                />
            </StyledCustomizedSelect>
        </StyledFilterBox>
    );
};

const mapStateToProps = (state) => {
    return {
        languageDirection: state.settings.lang_dir,
        facility: parseInt(state.settings.facility),
        selectFilterOrganization: state.filters.filter_organization,
        selectFilterServiceType: state.filters.filter_service_type,
        tabValue: state.filters.statusFilterBoxValue
    }
};

export default connect(mapStateToProps, {setFilterOrganizationAction, setFilterServiceTypeAction})(FilterBox);
