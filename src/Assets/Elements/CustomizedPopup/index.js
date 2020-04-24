/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, {useState, useEffect, useContext} from 'react';
import {Button, Dialog, Typography, DialogActions, DialogContent, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {StyledMuiDialogTitle, StyledDialogActions} from "./Style";
import {connect} from "react-redux";
import CustomizedTableButton from "../CustomizedTable/CustomizedTableButton";

const CustomizedPopup = ({children, isOpen, onClose, languageDirection, props}) => {

    return (
        <div>
            <Dialog
                children={props.children}
                disableBackdropClick={props.disableBackdropClick}
                disableEscapeKeyDown={props.disableEscapeKeyDown}
                fullScreen={props.fullScreen}
                fullWidth={props.fullWidth}
                maxWidth={props.maxWidth}
                onBackdropClick={props.onBackdropClick}
                onEnter={props.onEnter}
                onEntered={props.onEntered}
                onEntering={props.onEntering}
                onEscapeKeyDown={props.onEscapeKeyDown}
                onExit={props.onExit}
                onExited={props.onExited}
                onExiting={props.onExiting}
                PaperComponent={props.PaperComponent}
                PaperProps={props.PaperProps}
                scroll={props.scroll}
                TransitionComponent={props.TransitionComponent}
                transitionDuration={props.transitionDuration}
                TransitionProps={props.TransitionProps}
                aria-labelledby={props.labelledby ? props.labelledby :"customized-dialog-title"}
                aria-describedby={props.describedby}
                onClose={onClose}

                open={isOpen}>
                <StyledMuiDialogTitle disableTypography language_direction={languageDirection}>
                    <Typography variant="h6">{props.title}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </StyledMuiDialogTitle>
                <DialogContent dividers={props.content_dividers ? props.content_dividers : false}>
                    {children}
                </DialogContent>
                <StyledDialogActions>
                    {props.bottomButtons && props.bottomButtons.map((button, buttonIndex) => {
                        return (
                            <CustomizedTableButton key={buttonIndex} {...button}/>
                        )
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
    }
};
export default connect(mapStateToProps, null)(CustomizedPopup);
