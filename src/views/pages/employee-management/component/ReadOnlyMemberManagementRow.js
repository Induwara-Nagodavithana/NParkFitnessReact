import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ReadOnlyRow = ({ row, userType, handleViewClick, handleEditClick }) => (
    <>
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell align="center" component="th" scope="row">
                {row.id}
            </TableCell>
            <TableCell align="center">{row.firstName.concat(' ', row.lastName)}</TableCell>
            <TableCell align="center">{row.contactNo}</TableCell>
            <TableCell align="right">
                <AnimateButton>
                    <IconButton aria-label="edit" color="secondary" onClick={(event) => handleViewClick(event, row)}>
                        <VisibilityIcon />
                    </IconButton>
                    {/* {userType !== 'Admin' || userType !== 'Manager' ? (
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                            <Edit />
                        </IconButton>
                    ) : (
                        <></>
                    )} */}
                    {userType === 'Admin' || userType === 'Manager' ? (
                        <></>
                    ) : (
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                            <Edit />
                        </IconButton>
                    )}
                </AnimateButton>
            </TableCell>
        </TableRow>
    </>
);

export default ReadOnlyRow;
