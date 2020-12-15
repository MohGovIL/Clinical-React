import { StyledButton } from 'Assets/Elements/StyledButton';
import React from 'react';

export const StyledSelectTemplateButton = ({
  width,
  height,
  color,
  margin,
  variant,
  size,
  ...rest
}) => (
  <StyledButton
    width='113px'
    height='32px'
    color='primary'
    margin={margin ? margin : '0 16px'}
    variant='outlined'
    size='small'
    {...rest}
  />
);
