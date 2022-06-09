/* eslint-disable prettier/prettier */
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField,Button,Grid,Dialog,DialogActions, DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import ReadOnlyRowGym from './component/ReadOnlyRowGym';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Gym() {

    const [gymData, setGymData] = React.useState();
    const [editContactId, setEditContctId] = React.useState(null);

    const [userId, setUserId] = useState([]);
    const [type, setType] = useState([]);

    /* useEffect(() => {
        HttpCommon.get('/api/gym/')
            .then(res => {
                console.log(res.data);
                setGymData(res.data.data);
                console.log(gymData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []); */


    const getGymToView = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        const link = '/api/gym/getAllGymByUserId/';
        const id = userId;
        const url = link+id;

        HttpCommon.get(url)
            .then(res => {
                console.log(res.data);
                setGymData(res.data.data);
                console.log(gymData);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        getGymToView();
    }, []);

    const [gymCountToUser,getGymCountToUser] = React.useState();
    const gymCountByUser = () => {
        const link = '/api/gym/getGymCountByUserId/';
        const id = userId;
        const url = link +id;

        HttpCommon.get(url)
        .then(res => {
            console.log(res.data);
            getGymCountToUser(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        gymCountByUser();
    },[gymData]);

    // get subscription by userId
    const [getSubscriptionData,setSubscriptionData] = React.useState();
    const getSubscriptionByUserId = () => {
        const link = '/api/subscription/getSubscriptionByUserId/';
        const id = userId;
        const url = link+id;

        HttpCommon.get(url)
            .then(res => {
                console.log(res.data);
                setSubscriptionData(res.data.data.subscriptionTypeId)
                console.log(getSubscriptionData)
            })
            .catch(err => {
                console.log(err);
            });

    };
    

    // get subscription type by id
    const [getGymCount,setGymCount] = React.useState();
    const gymCount = () => {
        getSubscriptionByUserId();
        const link = '/api/subscriptionType/';
        const id = getSubscriptionData;
        const url = link+id;

        HttpCommon.get(url)
            .then(res => {
                console.log(res.data);
                setGymCount(res.data.data.gymCount)
                console.log(getGymCount)
                console.log(getGymCount)
            })
            .catch(err => {
                console.log(err);
            });
            return getGymCount;
    };
    const gymCountPossible = gymCount();


    const [newGymData, setNewGymData] = useState();
    const [editFormData, setEditFormData] = React.useState({
        name: '',
        CreatedAt: '',
        userId:''
    });

    // dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newGymData };
        newFormData[fieldName] = fieldValue;

        setNewGymData(newFormData);
        console.log(newGymData);
    };

    const handleAddFormSubmit = () => {
        
        if(parseInt(gymCountToUser, 10) >= parseInt(gymCountPossible, 10)){
            Store.addNotification({
                title: 'Fail to add new gym!',
                message: 'Your gym count exceeded',
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
        }else{
            HttpCommon.post('/api/gym/', {
                name: newGymData.name,
                CreatedAt: newGymData.CreatedAt,
                userId
            })
                .then((res) => {
                    getGymToView();
    
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
        } 
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
                getGymToView();

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Gym Updated Successfully',
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
            setOpenDialog(false);
    };

    const handleEditClick = (event, row) => {
        setEditContctId(row.id);
        setOpenDialog(true);

        const formValues = {
            name: row.name,
            CreatedAt:row.CreatedAt,
            userId:row.userId
        };
        setEditFormData(formValues);
    };

    
    const handleClose = () => {
        setEditContctId(null);
        setOpenDialog(false);
    };

    const myRef = useRef(null);
    // Scroll to myRef view
    const executeScroll = () => {
        if(parseInt(gymCountToUser, 10) >= parseInt(gymCountPossible, 10)){
            Store.addNotification({
                title: 'Fail to add new gym! ',
                message: 'Your gym count exceeded, Use new subscription',
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
        }else{
            myRef.current.scrollIntoView();
        }
    };

    return (
        <>
        {type === 'Owner' ? (
            <>
            <MainCard title="Gym">
            <div style={{ height: 5 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Gym Name</TableCell>
                            <TableCell align="center">Created At</TableCell>
                            <TableCell align="right">
                                <AnimateButton>
                                    <Button disableElevation size="medium" variant="contained" color="secondary" onClick={executeScroll}>
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
                                        <Dialog />
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
                            color="secondary"
                            disabled={!newGymData}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit Gym</DialogTitle>
               <DialogContent>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="dense"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditFormSubmit}>Save</Button>
                </DialogActions>
            </Dialog>

            <div style={{ height: 50 }} />
        </>

        ) : (
            <>
           
            </>
            )}
        </>
    );
}

export default Gym;
