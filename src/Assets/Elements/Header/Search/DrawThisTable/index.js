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
   // debugger;
    const {t} = useTranslation();

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - Date.parse(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function _buildList(patient) {
      //debugger;
        let arr= [];
        let resource = patient.resource;
        /*
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
   */

        if(resource) {
            let normalizedPerson =  normalizeFhirPatient(resource);
            normalizedPerson.ageGenderType = normalizedPerson.gender === 'female' ? 'age{f}'  : 'age{m}';
            return normalizedPerson;
        }
        else{
            return null;
        }
    }


    if(result && result.data && result.data.total>0){
        //debugger;
        let entry = result.data.entry;



            return (

                    entry.map((patient, patientIndex) => {

                    let personSearchArr = _buildList(patient);
                    if(personSearchArr)
                    {
                    return (
                        <StyledExpansionPanel key={patientIndex}>
                        <StyledExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <GenderIcon  alt={'gender icon'} src={personSearchArr.gender === 'male' ? maleIcon : femaleIcon}/>
                        <StyledLabelName>
                            <TitleValueComponent  name= {personSearchArr.firstName} value= {personSearchArr.lastName}/>
                        </StyledLabelName>
                        <StyledLabelTZ>
                        <TitleValueComponent  name= {t(personSearchArr.identifier.type)} value= {personSearchArr.identifier.value}/>
                        </StyledLabelTZ>
                        <StyledLabelPhone>
                        {
                            personSearchArr.mobileCellPhone ?
                                < TitleValueComponent  name = {t('Mobile Phone')}  value = {personSearchArr.mobileCellPhone} /> :
                                personSearchArr.homePhone ? < TitleValueComponent name = {t('Phone number')}   value = {personSearchArr.homePhone} /> : ''
                        }
                        </StyledLabelPhone>
                        <StyledLabelAge>
                            <TitleValueComponent  name= {t(personSearchArr.ageGenderType)} value= {_calculateAge(personSearchArr.birthDate)}/>
                        </StyledLabelAge>

                        </StyledExpansionPanelSummary>
                        <StyledExpansionPanelDetails>
                          דגיייייייייייי
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
