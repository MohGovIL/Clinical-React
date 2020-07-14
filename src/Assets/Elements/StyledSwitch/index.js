import React from 'react';
import Label from './Style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const StyledSwitch = ({
  checked,
  onChange,
  label_1,
  label_2,
  marginRight,
  marginLeft,
  register,
  name,
}) => {
  const { t } = useTranslation();

  const languageDirection = useSelector((state) => state.settings.lang_dir);

  const onChangeHandler = (event) => {
    onChange(event);
  };

  return (
    <Label
      marginRight={marginRight}
      marginLeft={marginLeft}
      direction={languageDirection}>
      <input
        name={name || null}
        ref={register || null}
        type='checkbox'
        checked={checked || null}
        onChange={onChange && onChangeHandler}
      />
      <span>
        <div>{label_1 ? t(label_1) : 'Yes'}</div>
        <div>{label_2 ? t(label_2) : 'No'}</div>
      </span>
    </Label>
  );
};

export default StyledSwitch;
