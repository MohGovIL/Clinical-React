import React from 'react';
import { ChipWithImageStyle, OnHoverElement } from './Style';
import PDF from '../../../Assets/Images/pdf.png';
import { useTranslation } from 'react-i18next';
import { Delete, Visibility } from '@material-ui/icons';
import { Typography, Tooltip, Grid } from '@material-ui/core';
import HeaderIcon from '../Header/HeaderIcon/index';
const ChipWithImage = ({ label, onDelete, size, onClick, htmlFor }) => {
  const { t } = useTranslation();

  return (
    <label htmlFor={htmlFor}>
      <Grid container alignItems='center'>
        <ChipWithImageStyle onClick={onClick || console.log('OnClick')}>
          <Tooltip title={label}>
            <OnHoverElement className='onHover'>
              <Visibility style={{ color: '#ffffff' }} />
            </OnHoverElement>
          </Tooltip>
          <HeaderIcon img={PDF} alt={'PDF'} />
          <Grid container direction='column'>
            <Typography noWrap style={{ maxWidth: '150px' }}>
              {t(label)}
            </Typography>
            <Typography>{size}MB</Typography>
          </Grid>
        </ChipWithImageStyle>
        <Delete
          style={{
            color: '#076ce9',
            margin: '0 24px 0 24px',
            cursor: 'pointer',
          }}
          onClick={(event) => onDelete(event) || null}
        />
      </Grid>
    </label>
  );
};

export default ChipWithImage;
