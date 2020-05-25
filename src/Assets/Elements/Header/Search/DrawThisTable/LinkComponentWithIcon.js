import React from 'react';
import Link from '@material-ui/core/Link';
import { StyledIconValueComponent } from '../Style';
import { useTranslation } from 'react-i18next';
import { Link as LinkRouter } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';

const LinkComponentWithIcon = ({ linkUrl, linkHeader, iconType, mode }) => {
  const { t } = useTranslation();
  return mode === 'view' || mode === 'write' ? (
    <Link
      //   href='linkUrl'
      component={LinkRouter}
      to={`${baseRoutePath()}/generic/EncounterSheet`}>
      <label>
        {t(linkHeader)}
        <StyledIconValueComponent
          iconType={iconType ? iconType : 'arrow_back_ios'}
        />
      </label>
    </Link>
  ) : null;
};

export default LinkComponentWithIcon;
