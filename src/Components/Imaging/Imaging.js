import React from 'react';
import {useTranslation} from "react-i18next";

const Imaging = () => {
    const {t} = useTranslation();
    return (
        <div>
            {t('Zulu')}
        </div>
    );
};

export default Imaging;
