import React from 'react';
import StyledBG, { BGImage, CenteredText } from './Style';
import Typography from '@material-ui/core/Typography';
const LoginBG = ({ src }) => {
  return (
    <StyledBG>
      <BGImage src={src} alt='backgroundImage' />
      <CenteredText>
        <Typography variant={'h1'} align={'center'}>
          ברוכים השבים
        </Typography>
        <Typography variant={'h2'} align={'center'}>
          קליניקל
        </Typography>
        <Typography variant={'h3'} align={'center'}>
          ניהול אדמיניסטרטיבי וקליני במוצר אחד
        </Typography>
      </CenteredText>
    </StyledBG>
  );
};

export default LoginBG;
