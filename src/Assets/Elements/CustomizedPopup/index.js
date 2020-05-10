/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { StyledMuiDialogTitle, StyledDialogActions } from './Style';
import { connect } from 'react-redux';
import CustomizedTableButton from '../CustomizedTable/CustomizedTableButton';
import Alert from '@material-ui/lab/Alert';

const CustomizedPopup = ({
  children,
  isOpen,
  onClose,
  languageDirection,
  props,
  dialog_props,
}) => {
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
          <Typography variant='h6'>{props.title}</Typography>
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
            {props.AlertMessage.message}
          </Alert>
        )}
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

const mapStateToProps = (state, ownProps) => {
  return {
    languageDirection: state.settings.lang_dir,
    props: ownProps,
  };
};
export default connect(mapStateToProps, null)(CustomizedPopup);
