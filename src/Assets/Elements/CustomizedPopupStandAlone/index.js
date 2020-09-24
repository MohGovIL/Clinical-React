/**
 * @author Dror Golan drorgo@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, { useEffect } from 'react';
import {
  Dialog,
  Typography,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  StyledMuiDialogTitle,
  StyledDialogActions,
  StyledTypography,
} from './Style';
import CustomizedTableButton from '../CustomizedTable/CustomizedTableButton';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import { store } from 'index';

const CustomizedPopupStandAlone = ({
  children,
  isOpen,
  onClose,
  props,
  dialog_props,
}) => {
  const languageDirection = store.getState().settings.lang_dir;
  const { t } = useTranslation();
  return (
    <div>
      <Dialog
        disableBackdropClick={
          props.disableBackdropClick !== undefined &&
          props.disableBackdropClick !== null
            ? props.disableBackdropClick
            : true
        }
        onClose={onClose}
        aria-labelledby='customized-dialog-title'
        open={isOpen}
        maxWidth={props.dialogMaxWidth}
        {...dialog_props}>
        <StyledMuiDialogTitle
          disableTypography
          language_direction={languageDirection}>
          <Typography variant='h6'>{t(props.title)}</Typography>
          {onClose ? (
            <IconButton aria-label='close' onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </StyledMuiDialogTitle>
        <DialogContent
          dividers={props.content_dividers ? props.content_dividers : false}>
          {children}
        </DialogContent>
        {props.AlertMessage && props.AlertMessage.show && (
          <Alert severity={props.AlertMessage.severity}>
            {t(props.AlertMessage.message)}
          </Alert>
        )}
        <StyledTypography gutterBottom>
          {t(props.message)}
          <br />
        </StyledTypography>
        <StyledDialogActions>
          {props.bottomButtons &&
            props.bottomButtons.map((button, buttonIndex) => {
              return <CustomizedTableButton key={buttonIndex} {...button} />;
            })}
        </StyledDialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedPopupStandAlone;
