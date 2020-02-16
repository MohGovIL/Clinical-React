import React, {useEffect, useState} from 'react';
import StyledFilterBox from "./Style";
import CustomizedSelect from "../../../../Assets/Elements/CustomizedSelect";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import {useTranslation} from "react-i18next";
import {getHealhcareService, getOrganization} from "../../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";

import {setFilterDateAction} from "../../../../Store/Actions/SettingsActions/SettingsActions";
import {normalizeOrganizationData, normalizeServiceTypeData} from "../../../../Utils/Helpers/normalizeOrganizationData";

const FilterBox = ({languageDirection, props}) => {
    const {t} = useTranslation();

    const [selectOrganizationValue, setSelectOrganizationValue] = useState(0);
    const [selectServiceTypeValue, setSelectServiceTypeValue] = useState(0);

    const [labelOrganization, setLabelOrganization] = useState([]);
    const [labelServiceType, setLabelServiceType] = useState([]);

    //Gets cities list data
    useEffect(() => {
        (async () => {
            try {
                let array = [{
                    code: 0,
                    name: t("All")
                }];
                const {data} = await getOrganization();
                for (var entry of data.entry) {
                    if (entry.resource !== undefined) {
                        const labelOrganizationData = normalizeOrganizationData(entry.resource);
                        array.push(labelOrganizationData);
                    }
                }
                setLabelOrganization(array);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const organizationOnChangeHandler = (code) => {
        setSelectOrganizationValue(code);
        var data = {};
        if (code > 0) {
            let array = [{
                code: 0,
                name: t("All")
            }];
            (async () => {
                const {data} = await getHealhcareService(code);
                for (var entry of data.entry) {
                    if (entry.resource !== undefined) {
                        const setLabelServiceType = normalizeServiceTypeData(entry.resource);
                        array.push(setLabelServiceType);
                    }
                }
                setLabelServiceType(array);
            })();
        }

        console.log("organizationOnChangeHandler => call()");
    };

    const serviceTypeOnChangeHandler = (code) => {
        setSelectServiceTypeValue(code)
        console.log("serviceTypeOnChangeHandler => call()");
    };

    return (
        <StyledFilterBox>
            <CustomizedDatePicker iconColor={'#076ce9'}/>
            <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                              value={selectOrganizationValue} options={labelOrganization}
                              label={t("Facility name")}
                              onChange={organizationOnChangeHandler}
                              langDirection={languageDirection}
                              code_menu={"organizationName"}
            />
            <CustomizedSelect background_color={'#eaf7ff'} icon_color={'#076ce9'} text_color={'#076ce9'}
                              value={selectServiceTypeValue} options={labelServiceType}
                              label={t("Service type")}
                              onChange={serviceTypeOnChangeHandler}
                              langDirection={languageDirection}
                              code_menu={"serviceType"}
            />
        </StyledFilterBox>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        languageDirection: state.settings.lang_dir,
        props: ownProps,
    }
};
export default connect(mapStateToProps, null)(FilterBox);
