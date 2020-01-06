import React from 'react';
import StyledInputBase from './Style'

const SearchInput = (props) => {
    return (
        <StyledInputBase placeholder='איתור מטופל' value={props.searchInput}/>
    );
};

export default SearchInput;
