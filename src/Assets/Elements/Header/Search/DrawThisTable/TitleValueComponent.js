import React, { useEffect, useRef } from 'react';

const TitleValueComponent = ({ name, value, searchParam, seperator }) => {
  const isNumeric = (n) => {
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
      let innerText = ref && ref.current ? ref.current.innerText.trim() : '';
      let searchTrimmed = searchParam.trim();
      let index = innerText.trim().indexOf(searchTrimmed);
      let innerHTMLNew = '';
      if (index > 0) {
        if (isNumeric(searchParam)) {
          innerHTMLNew = ` <${type}  dir = "ltr"  style=' '>${innerText.substr(
            index + searchTrimmed.length,
          )}</${type}><${type}  dir = "ltr"  style='font-weight: bold;'>${innerText.substr(
            index,
            searchTrimmed.length,
          )}</${type}><${type}  dir = "ltr"  style='margin-left:0; '>${innerText.substr(
            0,
            index,
          )}</${type}>`;
        } else {
          innerHTMLNew = ` <${type}   style='margin-left:0px;'>${innerText.substr(
            0,
            index,
          )}</${type}><${type}   style=' font-weight: bold;'>${innerText.substr(
            index,
            searchTrimmed.length,
          )}</${type}><${type}   style=''>${innerText.substr(
            index + searchTrimmed.length,
          )}</${type}>`;
        }
        if (ref.current.parentElement) {
          ref.current.outerHTML = innerHTMLNew;
        }
      } else {
        if (index === 0) {
          if (isNumeric(searchParam)) {
            innerHTMLNew = ` <${type}  dir = "ltr"  style=' '>${innerText.substr(
              index + searchTrimmed.length,
            )}</${type}><${type}  dir = "ltr"  style=' font-weight: bold;'>${innerText.substr(
              0,
              searchTrimmed.length,
            )}</${type}>`;
          } else {
            innerHTMLNew = ` <${type}  style='font-weight: bold;'>${innerText.substr(
              0,
              searchTrimmed.length,
            )}</${type}><${type}   style=' '>${innerText.substr(
              index + searchTrimmed.length,
            )}</${type}>`;
          }

          if (ref.current.parentElement) {
            ref.current.outerHTML = innerHTMLNew;
          }
        }
      }
    }
  };

  function handleEmptyDiv(divRef, value) {
    return value && value !== '' ? <div ref={divRef}>{value}</div> : '';
  }

  return (
    <React.Fragment>
      <span ref={spanRef}>{name}</span>
      {seperator ? <label> - </label> : ''}
      {handleEmptyDiv(divRef, value)}
    </React.Fragment>
  );
};

export default TitleValueComponent;
