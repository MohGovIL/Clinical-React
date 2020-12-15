import React from 'react';
import Link from '@material-ui/core/Link';
import { StyledIconValueComponent } from 'Assets/Elements/Header/Search/Style';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
const LinkComponentWithIcon = ({
  linkUrl,
  linkHeader,
  iconType,
  mode,
  onClick,
  languageDirection,
}) => {
  const { t } = useTranslation();
  return mode === 'view' || mode === 'write' ? (
    <Link onClick={onClick} component='button'>
      <label>
        {t(linkHeader)}
        <StyledIconValueComponent
          iconType={
            iconType
              ? iconType
              : languageDirection === 'ltr'
              ? 'arrow_forward_ios'
              : 'arrow_back_ios'
          }
        />
      </label>
    </Link>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(LinkComponentWithIcon);
