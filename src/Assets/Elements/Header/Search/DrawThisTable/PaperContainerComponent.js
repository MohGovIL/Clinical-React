import React, {useEffect, useRef, useState} from 'react';
import {StyledPaperContainer} from "../Style";
import DrawThisTable from "./index";


const PaperContainerComponent = ({result,searchParam}) => {
    const [height, setHeight] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);
    useEffect(() => {

        setHeight(containerRef.current.clientHeight)
        setMaxHeight(window.innerHeight - 88 - 60 - 18);
    });

    const containerRef = useRef(null);
    return (
        /*<StyledPaperContainer ref={containerRef} width={width} height={height}>*/
        <StyledPaperContainer ref={containerRef} height={height} maxHeight={maxHeight}>
            <DrawThisTable result={result} searchParam={searchParam}/>
        </StyledPaperContainer>

    );

};



export default PaperContainerComponent;
