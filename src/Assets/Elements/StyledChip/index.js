import React from 'react';
import { ChipWithImageStyle, OnHoverElement } from './Style';
import PDF from '../../../Assets/Images/pdf.png';
import { useTranslation } from 'react-i18next';
import { Delete, Visibility } from '@material-ui/icons';
import { Typography, Tooltip, Grid } from '@material-ui/core';
import HeaderIcon from '../Header/HeaderIcon/index';
const ChipWithImage = ({ label, onDelete, size, onClick }) => {
  const { t } = useTranslation();

  return (
    <Grid container alignItems='center'>
      <ChipWithImageStyle onClick={onClick || console.log('OnClick')}>
        <OnHoverElement className='onHover'>
          <Visibility style={{ color: '#ffffff' }} />
        </OnHoverElement>
        <HeaderIcon img={PDF} alt={'PDF'} />
        <Grid container direction='column'>
          <Tooltip title={label}>
            <Typography noWrap style={{ maxWidth: '150px' }}>
              {t(label)}
            </Typography>
          </Tooltip>
          <Typography>{size}MB</Typography>
        </Grid>
      </ChipWithImageStyle>
      <Delete
        style={{ color: '#076ce9' }}
        onClick={onDelete || console.log('noDelete')}
      />
    </Grid>
  );
};

export default ChipWithImage;
