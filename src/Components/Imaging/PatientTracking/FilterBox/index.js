import React, {useEffect, useState} from 'react';
import StyledFilterBox from "./Style";
import CustomizedSelect from "../../../../Assets/Elements/CustomizedSelect";
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import {useTranslation} from "react-i18next";
import {getHealhcareService, getOrganization} from "../../../../Utils/Services/FhirAPI";
import ExpandMore from "@material-ui/icons/ExpandMore";

const FilterBox = ({statuses}) => {
    const {t} = useTranslation();

    const labelElements = [
        {
            labelName: t("Facility name"),
            code: 'organizationName',
        },
        {
            labelName: t("Service type"),
            code: 'serviceType',
        },
    ];

    const labelOrganization = [
        {
            code: 0,
            display: t('all'),
        },
        {
            code: 3,
            display: 'מרפאת תל אביב'
        },
        {
            code: 4,
            display: 'מרפאת חיפה'
        }
    ];

    const [cities, setCities] = useState([]);

    //Gets cities list data
    useEffect(() => {
        (async () => {
            try {
                const {data} = await getOrganization();
                // const normalizedAppointmentData = normalizeAppointmentData(data.entry);
                // setAppointments(normalizedAppointmentData);
                // setCities(labelOrganization);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const [organization, setOrganization] = useState(0);

    const organizationOnChangeHandler = (code) => {
        setOrganization(code.target.value);

        const {data} = getHealhcareService(code.target.value);
        console.log("organizationOnChangeHandler => call()");
    };

    const serviceTypeOnChangeHandler = () => {
        console.log("serviceTypeOnChangeHandler => call()");
    };

    return (
        <StyledFilterBox>
            <CustomizedDatePicker iconColor={'#076ce9'}/>

            {labelElements.map((labelElement, labelElementsIndex) =>
                <CustomizedSelect key={labelElementsIndex} background_color={'#eaf7ff'} icon_color={'#076ce9'}
                                  value={organization} options={labelElement.code === 'organizationName' ? labelOrganization : [] }
                                  appointmentId={'1'}
                                  text_color={'#076ce9'}
                                  label={labelElement.labelName}
                                  onChange={labelElement.code === 'organizationName' ? organizationOnChangeHandler : serviceTypeOnChangeHandler }

                />
            )}
        </StyledFilterBox>
    );
};

export default FilterBox;
