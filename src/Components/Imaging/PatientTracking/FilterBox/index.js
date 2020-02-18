import React, {useEffect, useState} from 'react';
import StyledFilterBox, {StyledCustomizedSelect} from "./Style";
import CustomizedSelect from "../../../../Assets/Elements/CustomizedSelect";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import {useTranslation} from "react-i18next";
import {getHealhcareService, getOrganization} from "../../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";
import {normalizeOrganizationData, normalizeServiceTypeData} from "../../../../Utils/Helpers/normalizeOrganizationData";
import ListItemText from "@material-ui/core/ListItemText";

/**
 * @author Yuiry Gershem yuriyge@matrix.co.il
 * @param languageDirection
 * @param facility
 * @param props
 * @returns {*}
 * @constructor
 */

const FilterBox = ({languageDirection, facility, props}) => {
    const {t} = useTranslation();

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("All")
        }]
    };

    const [selectOrganizationValue, setSelectOrganizationValue] = useState(0);
    const [selectServiceTypeValue, setSelectServiceTypeValue] = useState(0);

    const [labelOrganization, setLabelOrganization] = useState([]);
    const [labelServiceType, setLabelServiceType] = useState([]);

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
                        const labelOrganizationData = normalizeOrganizationData(entry.resource);
                        array.push(labelOrganizationData);
                    }
                }
                setLabelOrganization(array);
            } catch (err) {
                console.log(err);
            }
        })()
    }, []);

    useEffect(() => {
        if (facility !== 0) {
            organizationOnChangeHandler(facility);
        }
    }, []);

    const organizationOnChangeHandler = (code) => {
        setSelectOrganizationValue(code);
        if (code > 0) {
            //Array for list options with default element (All).
            let array = emptyArrayAll();

            (async () => {
                //Nested destructuring from Promise. ES6 new syntax.
                const {data: {entry: dataServiceType}} = await getHealhcareService(code);

                for (let entry of dataServiceType) {
                    if (entry.resource !== undefined) {
                        const setLabelServiceType = normalizeServiceTypeData(entry.resource);
                        array.push(setLabelServiceType);
                    }
                }
                setSelectServiceTypeValue(0);
                setLabelServiceType(array);
            })();
        } else {
            setSelectServiceTypeValue(0);
            setLabelServiceType(emptyArrayAll());
        }
        // console.log("organizationOnChangeHandler => call()");
    };

    const serviceTypeOnChangeHandler = (code) => {
        setSelectServiceTypeValue(code);
        // console.log("serviceTypeOnChangeHandler => call()");
    };

    return (
        <StyledFilterBox>
            <CustomizedDatePicker iconColor={'#076ce9'}/>
            <StyledCustomizedSelect>
                <ListItemText>{t("Facility name")}</ListItemText>
                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                                  value={selectOrganizationValue} options={labelOrganization}
                                  onChange={organizationOnChangeHandler}
                                  langDirection={languageDirection}
                                  code_menu={"organizationName"}
                />
            </StyledCustomizedSelect>
            <StyledCustomizedSelect>
                <ListItemText>{t("Service type")}</ListItemText>
                <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                                  value={selectServiceTypeValue} options={labelServiceType}
                                  onChange={serviceTypeOnChangeHandler}
                                  langDirection={languageDirection}
                                  code_menu={"serviceType"}
                />
            </StyledCustomizedSelect>
        </StyledFilterBox>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        languageDirection: state.settings.lang_dir,
        facility: parseInt(state.settings.facility),
        props: ownProps,
    }
};
export default connect(mapStateToProps, null)(FilterBox);
