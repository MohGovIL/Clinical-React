import React, {useState} from "react";
import StyledSearch, {
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledIconValueComponent,
    StyledPaper,
    StyledPaperBottom
} from './Style';
import SearchInput from "./SearchInput";
import Icon from "./Icon/index";
import search from '../../../Images/search.png';
import {searchPatients} from "../../../../Utils/Services/FhirAPI";
import  DrawThisTable from "./DrawThisTable";
import {Paper} from "@material-ui/core";
import IconValueComponent from "./DrawThisTable/IconValueComponent";




const Search = props => {



    const [input, setInput] = useState('');
    const [showResult,setShowResult] =useState(false);
    const [result,setResult] =useState({});
    const onChangeHandler = async  e =>{
        const target = e.target;
        setInput(target.value);
        if(target.value.length > 2) {
            try {
                const patients = await searchPatients(target.value);
                if(patients && patients.data && patients.data.total>0){
                    //debugger;
                    setShowResult(true);
                    //for
                    setResult(patients);
                }
                else{
                    setShowResult(false);
                }
            }
            catch(err){
              //  setShowResult(false);
                setResult(null);
                console.log(err);
            }
        }
        else{
            setShowResult(false);
        }




    };
    return(
        <StyledSearch>
            <SearchInput onChange={onChangeHandler} searchInput={input}/>
            <Icon alt='search icon' img={search}/>
            { showResult === true ?
              <StyledPaper  elevation={6} id='results' variant="outlined" square >
                <DrawThisTable result={result}/>
                <StyledPaperBottom  elevation={6} id='results' variant="outlined" square >
                    <StyledIconValueComponent iconType='add_circle' value='Add New Patient' />
                </StyledPaperBottom>
              </StyledPaper>
             : null }


        </StyledSearch>
    );
};

export default Search;



