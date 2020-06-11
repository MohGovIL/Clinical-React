import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

import {
  StyledGridClean,
  StyledGridChoosen,
  StyledCheckAllLabel,
  StyledCheckAll,
  CustomizedPaperBlocked,
  StyledList,
  StyledListItem,
  SearchTemplates,
  SearchInput,
  StyledListItemText,
  CustomizedPaper,
  CustomizedPaperFooter,
  CustomizedPaperHeader,
} from 'Components/Generic/PopupComponents/PopUpFormTemplates/Style';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Icon from 'Assets/Elements/Header/Search/Icon';
import X from 'Assets/Images/x.png';
import trash from 'Assets/Images/trash.png';
import { arrayRemove } from 'Utils/Services/FHIR/CommonFunctions';
import Grid from '@material-ui/core/Grid';

const PopUpContantList = ({
  templates,
  languageDirection,
  setContent,
  handleTransferOfContentList,
  checkAll,
  setCheckAll,
  checked,
  setChecked,
  cleanSelection,
}) => {
  useEffect(() => {
    if (searchThis === '')
      if (templates && templates.length > 0)
        setSearchInsideTemplates(templates);
  });

  function intersection(a, b) {
    if (!a || a.length < 1) return [];

    return a.filter(function (value) {
      return value.title.indexOf(b) > -1;
    });
  }
  const handleSelectAllToggle = (e) => {
    setCheckAll(e.target.checked);
    let context = '';
    if (!e.target.checked) {
      setChecked([]);
      return;
    }

    let inputs = document.getElementsByTagName('input');
    let newChecked = [...checked];
    for (let i = 0; i < inputs.length; i++) {
      let idText = inputs.item(i).getAttribute('aria-labelledby');
      if (idText && idText.includes('transfer-list-all-item-')) {
        if (e.target.checked && !inputs.item(i).checked) {
          newChecked.push({ title: idText });
        }
      }
    }
    setChecked(newChecked);
    for (let i = 0; i < newChecked.length; i++) {
      context +=
        document.getElementById(newChecked[i].title).innerText + '\r\n';
    }
    setContent(context);
  };

  const toggleRegisterOfChecked = (idText) => {
    if (!idText || idText === '') {
      return;
    }
    let context = '';
    let newChecked = [...checked];
    const checkIfInChecked = intersection(checked, idText.trim());
    if (!checkIfInChecked || checkIfInChecked.length < 1) {
      newChecked.push({ title: idText });
      setChecked(newChecked);
    } else {
      for (let i = 0; i < checked.length; i++) {
        if (
          newChecked.length > 0 &&
          newChecked[i] &&
          newChecked[i].title &&
          newChecked[i].title !== '' &&
          newChecked[i].title === idText.trim()
        ) {
          newChecked = arrayRemove(newChecked, newChecked[i]);
          setChecked(newChecked);
        }
      }
    }

    for (let i = 0; i < newChecked.length; i++) {
      context +=
        document.getElementById(newChecked[i].title).innerText + '\r\n';
    }
    setContent(context);
  };
  const handleToggle = (e) => {
    let target = e.target;
    let idText = target.getAttribute('aria-labelledby');
    toggleRegisterOfChecked(idText);
  };

  const onChangeHandler = (e) => {
    let target = e.target;
    setSeachThis(target.value);
    setCheckAll(false);
    if (target.value.length > 2) {
      let intersectionWithTemplates = intersection(
        templates,
        target.value.trim(),
      );

      setContent('');

      setSearchInsideTemplates(intersectionWithTemplates);
    } else {
      setSearchInsideTemplates(templates);
    }
  };

  const onClearHandler = () => {
    setSeachThis('');
    setChecked([]);
    setSearchInsideTemplates([]);
  };
  const { t } = useTranslation();

  const [searchInsideTemplates, setSearchInsideTemplates] = React.useState(
    templates,
  );
  const [searchThis, setSeachThis] = React.useState('');

  return (
    <React.Fragment>
      <CustomizedPaperHeader languageDirection={languageDirection}>
        {t('Add template')}
      </CustomizedPaperHeader>
      <CustomizedPaper>
        <SearchTemplates>
          <input
            onChange={onChangeHandler}
            value={searchThis}
            placeholder={t('Search template')}
          />
          <img onClick={onClearHandler} alt='search icon' src={X} />
        </SearchTemplates>
        {templates ? (
          <StyledCheckAll
            dir={languageDirection}
            onClick={handleSelectAllToggle}>
            <Checkbox
              checked={checkAll}
              tabIndex={-1}
              disableRipple
              color={'primary'}
            />
            <StyledCheckAllLabel>{t('Check All')}</StyledCheckAllLabel>
          </StyledCheckAll>
        ) : null}
        {templates ? (
          <CustomizedPaperBlocked
            dir={languageDirection == 'rtl' ? 'ltr' : 'rtl'}>
            <StyledList
              dir={languageDirection}
              dense
              component='div'
              role='list'>
              {searchInsideTemplates.map((value, index) => {
                const labelId = `transfer-list-all-item-${index}-label`;
                return (
                  <StyledListItem
                    alignItems='flex-start'
                    key={index}
                    role='listitem'
                    button
                    onClick={handleToggle}>
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          intersection(checked, labelId.trim()).length > 0
                        }
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        color={'primary'}
                      />
                    </ListItemIcon>
                    <StyledListItemText
                      id={labelId}
                      primary={`${t(value.title)}`}
                    />
                  </StyledListItem>
                );
              })}
              <ListItem />
            </StyledList>
          </CustomizedPaperBlocked>
        ) : null}
      </CustomizedPaper>
      <CustomizedPaperFooter>
        <Grid container spacing={6} onClick={cleanSelection}>
          <StyledGridChoosen item xs={6}>{`${checked.length} ${t(
            'Selected',
          )}`}</StyledGridChoosen>
          <StyledGridClean item xs={6}>
            <Icon img={trash} />
            {t('Clean selection')}
          </StyledGridClean>
        </Grid>
      </CustomizedPaperFooter>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(PopUpContantList);
