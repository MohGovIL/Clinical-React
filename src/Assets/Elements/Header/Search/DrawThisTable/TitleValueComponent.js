
import React, {useEffect} from "react";
const TitleValueComponent = ({name,value,searchParam}) => {
const handleChange =  (event) => {
    highlight(event);
};

const highlight = (event) => {

    let inputText = event;
    let innerHTML = event.target.innerHTML ;
    let searchTrimmed = searchParam.trim();
    let index = innerHTML.indexOf(searchTrimmed);
    if (index >= 0) {
        innerHTML = "<div><span style='margin-left:0; '>"+innerHTML.substring(0,index) +"</span>"+ "<span style='margin:0; font-weight: bold;'>" + innerHTML.substring(index,index+searchParam.length-1) + "</span><span style='margin-right:0; '>" + innerHTML.substring(index-1 + searchParam.length)+"</span></div>";
        event.target.outerHTML  = innerHTML;
    }
}


return(
    <React.Fragment>
        <span onClick={(e)=>{handleChange(e)}}>{name}</span>
        <div>{value}</div>
    </React.Fragment>
);

};


export default TitleValueComponent;
