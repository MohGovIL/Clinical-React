 import React from 'react';
 import { useTranslation } from 'react-i18next';
 import { withTranslation } from 'react-i18next';

 const Header = ({t, children}) =>  {
    const header = 'Header';

        return <header height='100px' >
            <Htitle value={t(header)} />
            {children}
        </header>

}

const Htitle = ({value}) => <h1>{value}</h1>;



export default withTranslation()(Header);
