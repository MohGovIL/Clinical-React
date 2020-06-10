import Grid from '@material-ui/core/Grid';

import React from 'react';
import { connect } from 'react-redux';
import {
  StyledRoundButton,
  CustomizedPaperHeader,
} from 'Components/Generic/PopupComponents/PopUpFormTemplates/Style';
import { useTranslation } from 'react-i18next';
import PopUpContantList from './PopUpContantList';
import PopUpContext from './PopUpContext';
import l from 'Assets/Images/l.png';
import Icon from 'Assets/Elements/Header/Search/Icon';

const MainPopUpFormTemplate = ({
  context,
  setContext,
  defaultContext,
  templates,
  languageDirection,
  setTemplatesTextReturned,
  handleCloseOperation,
}) => {
  const { t } = useTranslation();
  const handleTransferOfContent = () => {
    setContext(context + content);
    setContent('');
    cleanSelection();
  };

  const cleanSelection = () => {
    setChecked([]);
    setCheckAll(false);
  };

  const [content, setContent] = React.useState('');

  const [checkAll, setCheckAll] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const handleFirstTimeContext = () => {
    if (context !== '') defaultContext = '';
    return defaultContext !== '' ? defaultContext : context;
  };
  return (
    <Grid dir={languageDirection} container spacing={3}>
      <Grid item xs={6}>
        <PopUpContantList
          cleanSelection={cleanSelection}
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          checked={checked}
          setChecked={setChecked}
          setContent={setContent}
          templates={templates}
        />
      </Grid>
      {checked.length > 0 ? (
        <StyledRoundButton
          variant={'contained'}
          color={'primary'}
          fontWeight={'bold'}
          onClick={handleTransferOfContent}>
          <Icon alt='transfer content icon' img={l} />
        </StyledRoundButton>
      ) : null}
      <Grid item xs={6}>
        <PopUpContext
          handleCloseOperation={handleCloseOperation}
          setTemplatesTextReturned={setTemplatesTextReturned}
          context={context}
          setContext={setContext}></PopUpContext>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(MainPopUpFormTemplate);