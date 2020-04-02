/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, {useState, useEffect, useContext} from 'react';
import {Button, Dialog, Typography, DialogActions, DialogContent, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {StyledMuiDialogTitle} from "./Style";

const CustomizedPopup = ({children, title, isOpen, onClose}) => {
    return (
        <div>
            <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={isOpen}>
                <StyledMuiDialogTitle disableTypography>
                    <Typography variant="h6">{title}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    ) : null}
                </StyledMuiDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomizedPopup;
