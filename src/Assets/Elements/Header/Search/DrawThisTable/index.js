import React, {useState} from "react";
import StyledSearch, {
    StyledExpansionPanel,
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledLabelAge, StyledLabelPhone,
    StyledPaper
} from './Style';
import {useTranslation} from "react-i18next";
import normalizeFhirPatient from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {StyledLabelName, StyledLabelTZ} from "./Style";
import Typography from "@material-ui/core/Typography";
import TitleValueComponent from "./TitleValueComponent";
import GenderIcon from "../../../CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import maleIcon from "../../../../Images/maleIcon.png";
import femaleIcon from "../../../../Images/womanIcon.png";

const DrawThisTable = ({result}) => {
debugger;
    const [expanded, setExpanded] = React.useState('');
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

   // debugger;
    const {t} = useTranslation();

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - Date.parse(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

   /* function _buildList(patient) {
      //debugger;
        let arr= [];
        let resource = patient.resource;
        /!*
           id: patient.id,
           identifier,
           firstName,
           lastName,
           middleName,
           mobileCellPhone,
           homePhone,
           email,
           gender: patient.gender,
           birthDate: patient.birthDate,
           ageGenderType
   *!/
        if(resource) {
            return normalizeFhirPatient(resource);
        }
        else{
            return null;
        }
    }*/

//debugger;
    if(result){
        //debugger;




            return (

                result.map((patient, patientIndex) => {
//debugger;

                    if(patient)
                    {
                    return (
                        <StyledExpansionPanel expanded = {expanded==='panel'+patientIndex} key={patientIndex} onChange={handleChange('panel'+patientIndex)}>
                        <StyledExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <GenderIcon  alt={'gender icon'} src={patient.gender === 'male' ? maleIcon : femaleIcon}/>
                        <StyledLabelName>
                            <TitleValueComponent  name= {patient.firstName} value= {patient.lastName}/>
                        </StyledLabelName>
                        <StyledLabelTZ>
                        <TitleValueComponent  name= {t(patient.identifier.type)} value= {patient.identifier.value}/>
                        </StyledLabelTZ>
                        <StyledLabelPhone>
                        {
                            patient.mobileCellPhone ?
                                < TitleValueComponent  name = {t('Mobile Phone')}  value = {patient.mobileCellPhone} /> :
                                patient.homePhone ? < TitleValueComponent name = {t('Phone number')}   value = {patient.homePhone} /> : ''
                        }
                        </StyledLabelPhone>
                        <StyledLabelAge>
                            <TitleValueComponent  name= {t(patient.ageGenderType)} value= {_calculateAge(patient.birthDate)}/>
                        </StyledLabelAge>

                        </StyledExpansionPanelSummary>
                        <StyledExpansionPanelDetails>
                          <div>To do : appointments box </div>
                        </StyledExpansionPanelDetails>
                        </StyledExpansionPanel>
                    );
                    }
                    else{
                        return null;
                    }

                    })

                );



    }
    else{
        return null;
    }
};

export default DrawThisTable;
