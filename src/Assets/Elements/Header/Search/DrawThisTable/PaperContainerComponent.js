import React, {useEffect, useRef, useState} from 'react';
import {StyledPaperContainer} from "../Style";
import DrawThisTable from "./index";


const PaperContainerComponent = ({result,searchParam}) => {
    const [height, setHeight] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);
    useEffect(() => {

    // 88px are the headers height
    // ~60px are the height of every element in the container
    // ~18px is the height of the add box
    // it is the same thing to save it in a variable but it is more clear like this

        setHeight(containerRef.current.clientHeight)
        setMaxHeight(window.innerHeight - 88 - 60 - 18);
    }, []);

    const containerRef = useRef(null);
    return (
        /*<StyledPaperContainer ref={containerRef} width={width} height={height}>*/
        <StyledPaperContainer ref={containerRef} height={height} maxHeight={maxHeight}>
            <DrawThisTable result={result} searchParam={searchParam}/>
        </StyledPaperContainer>

    );

};



export default PaperContainerComponent;
