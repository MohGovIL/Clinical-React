import React, {useState, useEffect} from "react";
import StyledSearch, {
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledIconValueComponent,
    StyledPaper,
    StyledPaperBottom, StyledPaperContainer, StyledTriangle, WrapperSearchPaper
} from './Style';
import SearchInput from "./SearchInput";
import Icon from "./Icon/index";
import search from 'Assets/Images/search.png';
import {searchPatients} from "Utils/Services/FhirAPI";
import DrawThisTable from "./DrawThisTable";
import {ClickAwayListener, Paper} from "@material-ui/core";
import IconValueComponent from "./DrawThisTable/IconValueComponent";
import TitleValueComponent from "./DrawThisTable/TitleValueComponent";
import {StyledExpansionPanel, StyledLabelName, StyledValueComponent} from "./DrawThisTable/Style";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PaperContainerComponent from "./DrawThisTable/PaperContainerComponent";
import CustomizedTableButtonCell from "Assets/Elements/CustomizedTable/CustomizedTableButtonCell";
import StyledButton from "Assets/Elements/CustomizedTable/CustomizedTableButton/Style";
import {FHIR} from "Utils/Services/FHIR";


const Search = ({languageDirection}) => {


    const isNumeric = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    String.prototype.trimRight = function (charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return this.replace(new RegExp("[" + charlist + "]+$"), "");
    };

    String.prototype.trimLeft = function (charlist) {
        if (charlist === undefined)
            charlist = "\s";

        return this.replace(new RegExp("^[" + charlist + "]+"), "");
    };
    const {t} = useTranslation();
    const [input, setInput] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isClickedAway, setIsClickedAway] = useState(false);
    const [result, setResult] = useState({});

    const onFocusHandler = async e =>{
        if (e.target.value.length > 2) {
           e.target.value+=" ";
            e.target.value = e.target.value.trim();
        }
    }
    const onChangeHandler = async e => {

        setIsClickedAway(false);
        const target = e.target;
        let tValue = target.value;
        let minSearchParam = 2;

        setResult(null);
        //setShowResult(false);
        setInput(target.value);

        if (languageDirection === 'ltr') {
            tValue = tValue.trimRight(" ");
        } else {
            tValue = tValue.trimLeft(" ");
        }

        if (isNumeric(tValue)) {
            minSearchParam = 2;
        } else {
            minSearchParam = 2;
        }

        if (tValue.length > minSearchParam) {
            (() => {
                try {
                    //In this example I am calling FHIR without await cause I am making logic inside the search patient.
                    //for that I need to do then function on the resolved data .
                    FHIR('Patient', 'doWork', {
                        "functionName": 'searchPatients',
                        'functionParams': {searchValue: tValue}
                    }).then(patients => {
                        if (patients) {
                            //for
                            setResult(patients);
                            setShowResult(true);
                            // setResult(patients);
                        } else {
                            setResult(null);
                            setShowResult(true);
                        }
                    });
                } catch (err) {
                    //  setShowResult(false);
                    setResult([]);
                    console.log(err);
                }
                setResult(null);
                setShowResult(true);
            })()
        } else {
            setShowResult(false);
        }


    };
    const handleOnClickAway = () => {

        setIsClickedAway(true);
    }

    return (
        <React.Fragment>
            {showResult === true && !isClickedAway ?


                <ClickAwayListener onClickAway={handleOnClickAway}>

                    <WrapperSearchPaper>
                        <StyledTriangle/>
                        <StyledPaper elevation={1} id='results' variant="outlined" square>
                            {result ?
                                <StyledPaperContainer>
                                    <PaperContainerComponent result={result} searchParam={input}/>
                                </StyledPaperContainer>
                                :
                                <StyledPaperBottom elevation={1} variant="outlined" square>
                                    <StyledValueComponent>{t('No result for this search')}</StyledValueComponent>
                                </StyledPaperBottom>
                            }
                            <StyledPaperBottom elevation={1} id='results' variant="outlined" square>
                                <StyledIconValueComponent iconType='add_circle' value='Add New Patient'/>
                            </StyledPaperBottom>
                        </StyledPaper>
                    </WrapperSearchPaper>
                </ClickAwayListener>


                : null}

        <StyledSearch>
            <SearchInput onChange={onChangeHandler} searchInput={input}/>
            <Icon alt='search icon' img={search}/>
        </StyledSearch>



        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir
    }
}


export default connect(mapStateToProps, null)(Search);


