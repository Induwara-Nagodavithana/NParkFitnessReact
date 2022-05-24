/* eslint-disable prettier/prettier */
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Button,Grid,} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import ReadOnlyRowGym from './component/ReadOnlyRowGym';
import EditableRowGym from './component/EditableRowGym';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Gym() {

    const [gymData, setGymData] = React.useState();
    const [editContactId, setEditContctId] = React.useState(null);


    useEffect(() => {
        HttpCommon.get('/api/gym/')
            .then(res => {
                console.log(res.data);
                setGymData(res.data.data);
                console.log(gymData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const [newGymData, setNewGymData] = useState();
    const [editFormData, setEditFormData] = React.useState({
        name: '',
        CreatedAt: '',
        userId:''
    });

    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newGymData };
        newFormData[fieldName] = fieldValue;

        setNewGymData(newFormData);
        console.log(newGymData);
    };

    const handleAddFormSubmit = () => {
        HttpCommon.post('/api/gym/', {
            name: newGymData.name,
            CreatedAt: newGymData.CreatedAt
        })
            .then((res) => {
                setNewGymData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New Gym Added Successfully',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: 'Fill all required Data',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });
    };

    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = () => {
        const link = '/api/gym/';
        const key = editContactId;
        const url = link + key;

        HttpCommon.put(url, {
            name: editFormData.name,
            CreatedAt:editFormData.CreatedAt,
            userId: editFormData.userId,
        })
            .then((res) => {

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Gym Edited Successfully',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            })
            .catch((error) => {
                console.log(error);

                Store.addNotification({
                    title: 'Fail !',
                    message: error,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 2000,
                        onScreen: true
                    },
                    width: 500
                });
            });

            setEditContctId(null);
    };

    const handleEditClick = (event, row) => {
        setEditContctId(row.id);

        const formValues = {
            name: row.name,
            CreatedAt:row.CreatedAt,
            userId:row.userId
        };
        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContctId(null);
    };

    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
    };

    return (
        <>
            <MainCard title="Gym">
                <div style={{ height: 5 }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>GymId</TableCell>
                                <TableCell align="center">Gym Name</TableCell>
                                <TableCell align="center">Created At</TableCell>
                                <TableCell align="right">
                                    <AnimateButton>
                                        <Button disableElevation size="medium" variant="contained" color="primary" onClick={executeScroll}>
                                            Add New Gym
                                        </Button>
                                    </AnimateButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {gymData != null ? (
                                gymData.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {editContactId === row.id ? (
                                            <EditableRowGym 
                                                editFormData={editFormData}
                                                handleEditFormChange={handleEditFormChange}
                                                handleEditFormSubmit={handleEditFormSubmit}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <ReadOnlyRowGym row={row} handleEditClick={handleEditClick} />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <></>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
           
            <div style={{ height: 10 }} />
            <MainCard title="Add New Gym" ref={myRef}>
                <TextField required fullWidth onChange={handlAddFormChange} label="Gym Name" margin="dense" name="name" />

               
                <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                    <Grid item>
                        <Button
                            disableElevation
                            onClick={handleAddFormSubmit}
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={!newGymData}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>

            <div style={{ height: 50 }} />
              

               
        </>
    );
}

export default Gym;
