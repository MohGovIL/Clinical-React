import React from "react";
import StyledSearch from './Style';
import SearchInput from "./SearchInput";
import Icon from "./Icon/index";
import search from '../../../Images/search.png';

const Search = props => {

    return(
        <StyledSearch>
            <SearchInput />
            <Icon alt='search icon' img={search}/>
        </StyledSearch>
    );
};

export default Search;
