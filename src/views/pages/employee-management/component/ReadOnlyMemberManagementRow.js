import React from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Edit } from '@material-ui/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadOnlyRow = ({ row, userType, handleViewEditClick, handleRemoveClick, nullBranchStaff, setIsEdit }) => {
    const handleEditClick = (row) => (event) => {
        setIsEdit(true);
        handleViewEditClick(event, row);
    };
    const handleViewClick = (row) => (event) => {
        setIsEdit(false);
        handleViewEditClick(event, row);
    };
    return (
        <>
            {/* <TableContainer component={Paper} hidden={showTable}>
                    <Table sx={{ minWidth: 650, backgroundColor: '#f3e5f5' }} size="small" aria-label="a dense table">
                        <TableHead sx={{ backgroundColor: '#512da8' }}>
                            <TableRow>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Use Id
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Name
                                </TableCell>
                                <TableCell align="center" sx={{ color: 'white' }}>
                                    Contact No
                                </TableCell>
                                {nullBranchStaff === true ? (
                                    <>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Started Date
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>
                                            Last Job Role
                                        </TableCell>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <TableCell align="right" sx={{ color: 'white' }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeData != null ? (
                                employeeData.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {editEmployeeId === row.id ? (
                                            <Dialog />
                                        ) : (
                                            <ReadOnlyRow
                                                row={row}
                                                userType={userType}
                                                handleViewClick={handleViewClick}
                                                handleEditClick={handleEditClick}
                                                handleRemoveClick={handleRemoveClick}
                                                nullBranchStaff={nullBranchStaff}
                                            />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer> */}

            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.firstName.concat(' ', row.lastName)}</TableCell>
                <TableCell align="center">{row.contactNo}</TableCell>
                {nullBranchStaff === true ? (
                    <>
                        <TableCell align="center">{row.CreatedAt.toString().slice(0, 10)}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                    </>
                ) : (
                    <></>
                )}
                <TableCell align="right">
                    <AnimateButton>
                        <IconButton aria-label="edit" color="secondary" onClick={handleViewClick(row)}>
                            <VisibilityIcon />
                        </IconButton>
                        {userType === 'Admin' ? (
                            <></>
                        ) : (
                            <IconButton aria-label="edit" color="secondary" onClick={handleEditClick(row)}>
                                <Edit />
                            </IconButton>
                        )}
                        {nullBranchStaff === true ? (
                            <></>
                        ) : (
                            <>
                                {userType === 'Owner' || userType === 'Manager' ? (
                                    <IconButton aria-label="remove" color="secondary" onClick={(event) => handleRemoveClick(event, row)}>
                                        <DeleteIcon />
                                    </IconButton>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </AnimateButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default ReadOnlyRow;
