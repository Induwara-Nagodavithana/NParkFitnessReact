import React from 'react';
import { TableRow, TableCell, IconButton, Button } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';

const ReadOnlyRowScheduleItem = ({ row, handleEditClickScheduleItem, setServiceId, getServiceToView, getService }) => {
    const handleSetServiceId = () => {
        console.log('service.id');
        console.log(row.serviceId);

        setServiceId(row.serviceId);
    };
    return (
        <>
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onChange={handleSetServiceId}>
                <TableCell component="th" scope="row" align="center">
                    {getService}
                </TableCell>

                <TableCell align="center">{row.noOfSet}</TableCell>

                <TableCell align="center">{row.noOfRepetition}</TableCell>

                <TableCell align="center">{row.timeBySeconds}</TableCell>
                <TableCell align="center">{row.calAmount}</TableCell>

                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={(event) => handleEditClickScheduleItem(event, row)}>
                            <Edit />
                        </IconButton>
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRowScheduleItem;
