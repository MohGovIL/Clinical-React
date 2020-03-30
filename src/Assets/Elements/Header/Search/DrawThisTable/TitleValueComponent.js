import React, {useEffect, useRef} from "react";
import {StyledEmptyDiv} from "./Style";

const TitleValueComponent = ({name, value, searchParam, seperator}) => {
    const handleChange = event => {
        highlight(event);
    };
    const isNumeric = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    let spanRef = useRef(null);
    let divRef = useRef(null);
    useEffect(() => {

        highlight(spanRef, 'span');
        highlight(divRef, 'div');

    });
    const highlight = (ref, type) => {

        if (searchParam) {

            let innerText = ref && ref.current  ? ref.current.innerText : "";
            let searchTrimmed = searchParam.trim();
            let index = innerText.indexOf(searchTrimmed);
            let innerHTMLNew = "";
            if (index > 0) {

                if (isNumeric(searchParam)) {

                    innerHTMLNew =
                        `<${type} style=' '>${innerText.substr(index + searchTrimmed.length)}</${type}><${type} style='font-weight: bold;'>${innerText.substr(index, searchTrimmed.length)}</${type}><${type} style='margin-left:0; '>${innerText.substr(0, index)}</${type}>`;


                } else {

                    innerHTMLNew =
                        `<${type} style='margin-left:0;'>${innerText.substr(0, index)}</${type}><${type} style=' font-weight: bold;'>${innerText.substr(index, searchTrimmed.length)}</${type}><${type} style=''>${innerText.substr(index + searchTrimmed.length)}</${type}>`;

                }
                if (ref.current.parentElement) {
                    ref.current.outerHTML = innerHTMLNew;
                }
            } else {
                if (index === 0) {
                    if (isNumeric(searchParam)) {
                        innerHTMLNew = `<${type} style=' '>  ${innerText.substr(index + searchTrimmed.length)}</${type}><${type} style=' font-weight: bold;'>  ${innerText.substr(0, searchTrimmed.length)}</${type}>`;

                    } else {
                        innerHTMLNew = `<${type} style='margin-left:0; font-weight: bold;'>  ${innerText.substr(0, searchTrimmed.length)}  </${type}><${type} style=' '>  ${innerText.substr(index + searchTrimmed.length)}  </${type}>`;
                    }

                    if (ref.current.parentElement) {
                        ref.current.outerHTML = innerHTMLNew;
                    }
                }
            }
        }
    }


    function handleEmptyDiv(divRef, value) {
       return  value && value !== "" ? <div ref={divRef}>{value}</div> :<StyledEmptyDiv/>;
    }

    return (
        <React.Fragment>
            <span ref={spanRef}>{name}</span>
            {seperator ? <label> - </label> : ""}
            {handleEmptyDiv(divRef,value)}
        </React.Fragment>
    );

};


export default TitleValueComponent;
