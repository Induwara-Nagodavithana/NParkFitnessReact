import React from 'react';
import { Cancel, Save } from '@material-ui/icons';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, IconButton, TextField } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';

const EditableRowGym = ({ editFormData, handleEditFormChange, handleEditFormSubmit, handleCancelClick }) => (
    <>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="right">
                <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="dense"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell align="right">
                <TextField required fullWidth label="Created At" margin="dense" name="CreatedAt" value={editFormData.CreatedAt} />
            </TableCell>

            <TableCell align="right">
                <AnimateButton>
                    <IconButton aria-label="edit" color="primary" onClick={handleEditFormSubmit}>
                        <Save />
                    </IconButton>
                    <IconButton aria-label="edit" color="primary" onClick={handleCancelClick}>
                        <Cancel />
                    </IconButton>
                </AnimateButton>
            </TableCell>
        </TableRow>
    </>
);

export default EditableRowGym;
