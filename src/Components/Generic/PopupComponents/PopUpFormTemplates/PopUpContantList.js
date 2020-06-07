import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';



import { StyledList,StyledListItem,SearchTemplates,SearchInput,StyledListItemText,CustomizedPaper, CustomizedPaperFooter } from 'Components/Generic/PopupComponents/PopUpFormTemplates/Style';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';


import Icon from 'Assets/Elements/Header/Search/Icon';

import X from 'Assets/Images/x.png';





const PopUpContantList = ({templates,languageDirection})=>{
  useEffect(() => {
    if(searchThis === "")
    if (templates && templates.length >0) setSearchInsideTemplates(templates);
  });

  function intersection(a, b) {
    return a.filter(function (value) {
     return value.title.indexOf(b) > -1

    });
  }
  const handleToggle = (e) => {
    let target = e.target;
    setChecked(intersection(templates,target.innerText))
  }

  const onChangeHandler = (e) => {
    let target = e.target;
    if(target.value.length > 2) {
      let intersectionWithTemplates = intersection(templates, target.value)
      setSeachThis(target.value);
      setSearchInsideTemplates(intersectionWithTemplates);
    }
    else{
      setSeachThis("");
      setSearchInsideTemplates(templates);
    }
  }

  const onClearHandler = () => {
    setSeachThis("");
    setSearchInsideTemplates(intersection(checked,""));
  }
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState([]);
  const [searchInsideTemplates, setSearchInsideTemplates] = React.useState(templates);
  const [searchThis, setSeachThis] = React.useState("");


  return(
    <React.Fragment>
    <CustomizedPaper>
      <SearchTemplates>
        <input onChange={onChangeHandler} placeholder={t('Search template')}/>
        <Icon  onClick={onClearHandler} alt='search icon' img={X}/>
      </SearchTemplates>
      {templates ?
    <StyledList dense component="div" role="list">
      {searchInsideTemplates.map((value,index) => {
        const labelId = `transfer-list-all-item-${index}-label`;
        return (
          <StyledListItem alignItems="flex-start" key={index} role="listitem" button onClick={handleToggle}>
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}

              />
            </ListItemIcon>
            <StyledListItemText  id={labelId} primary={`${t(value.title)}`} />
          </StyledListItem>
        );
      })}
      <ListItem />
    </StyledList>  :
        null}

    </CustomizedPaper>
  <CustomizedPaperFooter>

  </CustomizedPaperFooter>

  </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(PopUpContantList);
