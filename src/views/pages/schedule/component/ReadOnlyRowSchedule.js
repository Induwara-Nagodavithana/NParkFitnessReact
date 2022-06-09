import React from 'react';
import { TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';

const current = new Date();

// eslint-disable-next-line no-unused-vars
const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

const ReadOnlyRowSchedule = ({ row, handleEditClick, handleDialog, handleDialogAdd, setScheduleId, getScheduleId, scheduleData }) => {
    const handleItemClick = () => {
        console.log('row.id');
        console.log(row.id);

        setScheduleId(row.id);
        handleDialog();
    };
    const handleAddItemClick = () => {
        console.log('row.id');
        console.log(row.id);

        setScheduleId(row.id);
        handleDialogAdd();
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.expireDate.substring(0, 10)}</TableCell>

                {row.expireDate > date ? <TableCell align="center">Not Expired</TableCell> : <TableCell align="center">Expired</TableCell>}

                <TableCell>
                    <Button disableElevation size="medium" variant="contained" color="secondary" onClick={handleItemClick}>
                        Items
                    </Button>
                </TableCell>

                <TableCell>
                    <Button disableElevation size="medium" variant="contained" color="secondary" onClick={handleAddItemClick}>
                        Add Items
                    </Button>
                </TableCell>

                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClick(event, row)}>
                            <Edit />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowSchedule;
