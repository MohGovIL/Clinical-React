import React, {useEffect, useState} from 'react';
import StyledFilterBox from "./Style";
import CustomizedSelect from "../../../../Assets/Elements/CustomizedSelect";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import CustomizedTableBadge from "../../../../Assets/Elements/CustomizedTable/CustomizedTableBadge";
import {useTranslation} from "react-i18next";
import {getCities} from "../../../../Utils/Services/FhirAPI";
import {normalizeAppointmentData} from "../../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentData";

const FilterBox = ({statuses}) => {
    const {t} = useTranslation();

    const labelElements = [
        {
            labelName: t("Facility name"),
        },
        {
            labelName: t("Service type"),
        },
    ];

    const [cities, setCities] = useState([]);

    //Gets cities list data
    useEffect(() => {
        (async () => {
            try {
                const {data} = await getCities();
                // const normalizedAppointmentData = normalizeAppointmentData(data.entry);
                // setAppointments(normalizedAppointmentData);
                setCities(data.compose.include[0].concept);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    return (
        <StyledFilterBox>
            <CustomizedDatePicker />
            {labelElements.map((labelElement, labelElementsIndex) =>
                <CustomizedSelect key={labelElementsIndex} background_color={'#eaf7ff'} icon_color={'#076ce9'}
                                  value={'planned'} options={cities}
                                  appointmentId={'1'}
                                  text_color={'#076ce9'}
                                  label={labelElement.labelName}
                />
            )}
        </StyledFilterBox>
    );
};

export default FilterBox;
