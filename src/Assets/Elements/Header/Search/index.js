import React, {useState,useEffect } from "react";
import StyledSearch, {
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledIconValueComponent,
    StyledPaper,
    StyledPaperBottom, StyledPaperContainer, StyledTriangle
} from './Style';
import SearchInput from "./SearchInput";
import Icon from "./Icon/index";
import search from '../../../Images/search.png';
import {searchPatients} from "../../../../Utils/Services/FhirAPI";
import DrawThisTable from "./DrawThisTable";
import {Paper} from "@material-ui/core";
import IconValueComponent from "./DrawThisTable/IconValueComponent";
import TitleValueComponent from "./DrawThisTable/TitleValueComponent";
import {StyledLabelName, StyledValueComponent} from "./DrawThisTable/Style";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PaperContainerComponent from "./DrawThisTable/PaperContainerComponent";
import CustomizedTableButtonCell from "../../CustomizedTable/CustomizedTableButtonCell";
import StyledButton from "../../CustomizedTable/CustomizedTableButton/Style";
import PopupNewPatient from "../../PopupComponents/PopupNewPatient";




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
    const [result, setResult] = useState({});

    //Create new patient
    const [popupNewPatient, setPopupNewPatient] = useState(false);
    //


    const onChangeHandler = async e => {
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

        if (isNumeric(tValue))
        {
            minSearchParam = 2;
        }
        else{
            minSearchParam = 2;
        }

        if (tValue.length > minSearchParam) {
            (async () => {
                try {
                    const patients = await searchPatients(tValue);
                    if (patients) {
                        //for
                        setResult(patients);
                        setShowResult(true);
                        // setResult(patients);
                    } else {
                        setResult(null);
                        setShowResult(true);
                    }
                } catch (err) {
                    //  setShowResult(false);
                    setResult(null);
                    console.log(err);
                }
            })()
        } else {
            setShowResult(false);
        }


    };

    const onNewPatientButtonClick = () => {
        setPopupNewPatient(true);
    };
    const onCloseNewPatientClick = () => {
        setPopupNewPatient(false);
    };

    return (
        <StyledSearch>
            <SearchInput onChange={onChangeHandler} searchInput={input}/>
            <Icon alt='search icon' img={search}/>
            {showResult === true ?
                <React.Fragment>
                    <StyledTriangle/>
                    <StyledPaper elevation={1} id='results' variant="outlined" square>
                        {result ?
                            <StyledPaperContainer>
                                <PaperContainerComponent result={result} searchParam={input} />
                            </StyledPaperContainer>
                            :
                            <StyledPaperBottom elevation={1} variant="outlined" square>
                                <StyledValueComponent>{t('No result for this search')}</StyledValueComponent>
                            </StyledPaperBottom>
                        }
                        <StyledPaperBottom elevation={1} id='results' variant="outlined" square>
                            <StyledIconValueComponent iconType='add_circle' value='Add New Patient' onClickHandler={onNewPatientButtonClick}/>
                            <PopupNewPatient popupOpen={popupNewPatient} handlePopupClose={onCloseNewPatientClick}/>
                        </StyledPaperBottom>
                    </StyledPaper>
                </React.Fragment>
                : null}


        </StyledSearch>
    );
};

const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir
    }
}


export default connect(mapStateToProps, null)(Search);


