import React, { useState, useEffect } from 'react';
import { StyledButton, StyledMenu, StyledMenuItem, StyledDiv } from './Style';

import { useTranslation } from 'react-i18next';
import { ExpandMore } from '@material-ui/icons/';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandLess } from '@material-ui/icons';

/**
 * @author Idan Gigi idangi@matrix.co.il, Yuriy Gershem yuriyge@matrix.co.il
 * @param background_color
 * @param icon_color
 * @param textcolor
 * @param value - valueCode
 * @param onChange - onChange can be an async function and can return true or false if wanted to change the value
 * @param options
 * @returns {Component}
 * @constructor
 */
const CustomizedSelect = ({
  background_color,
  background_menu_color,
  icon_color,
  text_color,
  defaultValue,
  onChange,
  options,
  langDirection,
  mode,
}) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);

  //DO NOT DELETE, FOR FUTURE USE
  // const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [value, setValue] = useState('');

  useEffect(() => {
    let defaultValueType = typeof defaultValue;
    if (defaultValueType === 'number' && defaultValue >= 0) {
      setValue(defaultValue);
    }
    if (defaultValueType === 'string' && defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleClick = (event) => {
    setClicked(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setClicked(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (code) => {
    // onChange(code);
    const change = await onChange(code);
    if (change) {
      setValue(code);
    }
    setClicked(false);
    setAnchorEl(null);
  };

  ///
  let opts = {};
  let iconForButtonMenu = clicked ? <ExpandLess /> : <ExpandMore />;
  let typeIcon = langDirection === 'rtl' ? 'endIcon' : 'startIcon';
  opts[typeIcon] = iconForButtonMenu;

  let buttonLabel = ' ';
  if (options !== undefined) {
    const res = options.find((obj) => {
      /* eslint eqeqeq: 0 */
      return obj.code == value;
    });

    if (res !== undefined) {
      buttonLabel = t(res.name);
    }
  }
  return (
    <StyledDiv>
      <StyledButton
        background_color={background_color}
        icon_color={icon_color}
        text_color={text_color}
        aria-controls='customized-menu'
        aria-haspopup='true'
        onClick={handleClick}
        language_direction={langDirection}
        {...opts}
        disabled={mode === 'view' ? true : false}>
        {buttonLabel}
      </StyledButton>
      <StyledMenu
        background_color={
          background_menu_color ? background_menu_color : background_color
        }
        icon_color={icon_color}
        text_color={text_color}
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {options.map((option, optionIndex) => (
          <StyledMenuItem
            key={optionIndex}
            // selected={optionIndex === selectedIndex} DO NOT DELETE, FOR FUTURE USE
            onClick={(event) => handleMenuItemClick(option.code)}>
            <ListItemText value={option.code} primary={t(option.name)} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </StyledDiv>
  );
};

CustomizedSelect.propTypes = {};

export default CustomizedSelect;
