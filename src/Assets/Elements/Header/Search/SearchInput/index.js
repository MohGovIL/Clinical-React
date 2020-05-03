import React from 'react';
import StyledInputBase from './Style'
import { useTranslation} from "react-i18next";

const SearchInput = ({searchInput,onChange}) => {
    const {t} = useTranslation();

    return (
        <StyledInputBase placeholder={t('Locate patient')} value={searchInput} onChange={onChange} onClick={onChange}/>
    );
};

export default SearchInput;
