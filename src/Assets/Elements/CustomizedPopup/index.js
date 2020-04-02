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

const CustomizedPopup = ({children, isOpen, onClose, languageDirection, languageCode, props}) => {
    return (
        <div>
            <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <StyledMuiDialogTitle disableTypography language_direction={languageDirection}>
                    <Typography variant="h6">{props.title}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </StyledMuiDialogTitle>
                <DialogContent dividers={props.content_dividers ? props.content_dividers : false}>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
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
        languageCode: state.settings.lang_code,
        props: ownProps,
    }
};
export default connect(mapStateToProps, null)(CustomizedPopup);
