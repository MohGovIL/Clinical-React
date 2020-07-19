import React from 'react';
import StyledNoContentTable from './Style';
import NoContentTablePic from 'Assets/Images/NoContentTable.png';
import { Styledh1 } from './Style';
import { useTranslation } from 'react-i18next';
const NoContentTable = () => {
  const { t } = useTranslation();

  return (
    <StyledNoContentTable>
      <img alt={'No Content'} src={NoContentTablePic} />
      <Styledh1>{t('No data to display')}</Styledh1>
    </StyledNoContentTable>
  );
};

export default NoContentTable;
