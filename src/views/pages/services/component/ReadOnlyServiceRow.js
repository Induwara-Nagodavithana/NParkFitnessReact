import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';

const ReadOnlyRow = ({ row, handleEditClick, userType }) => (
    <>
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>

            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="center">{row.bodyPart}</TableCell>

            {userType !== 'Trainer' ? (
                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                            <Edit />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            ) : (
                <></>
            )}
        </TableRow>
    </>
);

export default ReadOnlyRow;
