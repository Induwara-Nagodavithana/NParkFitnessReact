/* eslint-disable spaced-comment */
/* eslint-disable react/react-in-jsx-scope */
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Avatar,
    CardActionArea,
    CardActions,
    Autocomplete,
    Stack
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

import ReadOnlyRowSchedule from './component/ReadOnlyRowSchedule';
import ReadOnlyRowScheduleItem from '../scheduleItem/component/ReadOnlyRowScheduleItem';
import ReadOnlyRowScheduleItemManager from '../scheduleItem/component/ReadOnlyScheduleItemManager';
import ReadOnlyRowScheduleManager from './component/ReadOnlyRowScheduleManager';
import EditableRowScheduleItem from '../scheduleItem/component/EditableRowScheduleItem';
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const serviceArray = [];
function Schedule() {
    const navigate = useNavigate();
    const viewGoal = () => {
        navigate('/', { replace: true });
    };
    // dialog box
    const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    const [openDialogScheduleItem, setOpenDialogScheduleItem] = React.useState(false);
    const [openDialogScheduleItemAdd, setopenDialogScheduleItemAdd] = React.useState(false);
    const handleDialog = () => {
        setOpenDialogScheduleItem(true);
    };
    const handleDialogAdd = () => {
        setopenDialogScheduleItemAdd(true);
    };
    const [userId, setUserId] = useState([]);
    const [type, setType] = useState([]);

    const [goalData, setGoalData] = React.useState();

    useEffect(() => {
        HttpCommon.get('api/goal')
            .then((res) => {
                setGoalData(res.data.data);
            })
            .catch((err) => {
                // console.log('error');
            });
    }, []);

    //-----------------------schedule-----------------------------
    const [scheduleData, setScheduleData] = React.useState();
    const [editContactIdSchedule, setEditContctIdSchedule] = React.useState(null);
    const [getMemberId, setMemberId] = React.useState();

    //should take membership id
    const getScheduleToView = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        const link = '/api/schedule/getAllScheduleByMemberId/';
        const id = getMemberId;
        const url = link + id;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data.data);
                setScheduleData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const viewMemberSchedule = () => {
        getScheduleToView();
    };

    const [getExpireDate, setExpireDate] = React.useState();

    const [newScheduleData, setNewScheduleData] = React.useState();

    const [editFormDataSchedule, setEditFormDataSchedule] = React.useState({
        expireDate: ''
    });

    const [editContactId, setEditContctId] = React.useState(null);

    //  Add New schedule data
    const handleAddFormChangeSchedule = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newScheduleData };
        newFormData[fieldName] = fieldValue;

        setNewScheduleData(newFormData);
    };

    // Send New schedule data to server
    const handleAddFormSubmitSchedule = () => {
        HttpCommon.post('/api/schedule/', {
            expireDate: getExpireDate,
            membershipId: getMemberId,
            trainerId: userId
        })
            .then((res) => {
                getScheduleToView();
                setNewScheduleData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Created Successfully',
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
                    message: 'Fail to create schedule',
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

    const handleEditFormChangeSchedule = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormDataSchedule };
        newFormData[fieldName] = fieldValue;

        setEditFormDataSchedule(newFormData);
    };
    const handleEditFormSubmitSchedule = () => {
        const link = '/api/schedule/';
        const key = editContactId;
        const url = link + key;

        HttpCommon.put(url, {
            expireDate: getExpireDate
        })
            .then((res) => {
                getScheduleToView();
                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Updated Successfully',
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
        setOpenDialogEdit(false);
    };

    const handleEditClickSchedule = (event, row) => {
        setEditContctId(row.id);
        setOpenDialogEdit(true);

        const formValues = {
            expireDate: getExpireDate
        };
        setEditFormDataSchedule(formValues);
    };

    const handleCloseEdit = () => {
        setEditContctId(null);
        setOpenDialogEdit(false);
    };
    const handleCloseScheduleItem = () => {
        setEditContctId(null);
        setOpenDialogScheduleItem(false);
    };

    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
    };

    //----------------------------------scheduleItem-------------------------------
    const [scheduleItemData, setScheduleItemData] = React.useState();
    const [getScheduleId, setScheduleId] = React.useState();
    const [getServiceId, setServiceId] = React.useState();
    const [getService, setService] = React.useState();
    const getScheduleItemData = () => {
        console.log('getScheduleId');
        console.log(getScheduleId);
        const link = '/api/scheduleItem/getScheduleItemById/';
        const id = getScheduleId;
        const url = link + id;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data);
                setScheduleItemData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getScheduleItemData();
    }, [getScheduleId]);

    //get service by servie id
    const serviceId = 1;
    const getServiceToView = () => {
        const link = '/api/serviceType/';
        const id = setServiceId;
        const url = link + id;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res.data);
                setService(res.data.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getServiceToView();
    }, [getServiceId]);

    // get all services for autocomplete
    useEffect(() => {
        HttpCommon.get('/api/serviceType')
            .then((res) => {
                res.data.data.map((row) => serviceArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    const [newScheduleItemData, setNewScheduleItemData] = React.useState();

    const [editFormDataScheduleItem, setEditFormDataScheduleItem] = React.useState({
        serviceId: '',
        noOfSet: '',
        noOfRepetition: '',
        timeBySeconds: '',
        calAmount: ''
    });

    const [editContactIdSchedueItem, setEditContctIdScheduleItem] = React.useState(null);
    //  Add New ScheduleItem
    const handlAddFormChangeScheduleItem = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newScheduleItemData };
        newFormData[fieldName] = fieldValue;

        setNewScheduleItemData(newFormData);
        console.log(newScheduleItemData);
    };

    // Send New ScheduleItem data to server
    const handleAddFormSubmitScheduleItem = () => {
        console.log(newScheduleItemData);

        HttpCommon.post('/api/scheduleItem/', {
            serviceId: getServiceId,
            noOfSet: newScheduleItemData.noOfSet,
            noOfRepetition: newScheduleItemData.noOfRepetition,
            timeBySeconds: newScheduleItemData.timeBySeconds,
            calAmount: newScheduleItemData.calAmount,
            scheduleId: getScheduleId
        })
            .then((res) => {
                getScheduleItemData();
                setNewScheduleItemData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New ScheduleItem Added Successfully',
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

    // Data entering to text feilds in Edit scheduleitem details
    const handleEditFormChangeScheduleItem = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormDataScheduleItem };
        newFormData[fieldName] = fieldValue;

        setEditFormDataScheduleItem(newFormData);
        console.log('after type edit data');
        console.log(editFormDataScheduleItem);
    };

    const [editedValueService, setEditedValueService] = useState();

    // Send Edited branch data to server
    const handleEditFormSubmitScheduleItem = () => {
        const link = '/api/scheduleItem/';
        const key = editContactIdSchedueItem;
        const url = link + key;

        HttpCommon.put(url, {
            noOfSet: editFormDataScheduleItem.noOfSet,
            noOfRepetition: editFormDataScheduleItem.noOfRepetition,
            timeBySeconds: editFormDataScheduleItem.timeBySeconds,
            calAmount: editFormDataScheduleItem.calAmount,
            serviceId: editedValueService
        })
            .then((res) => {
                getScheduleItemData();
                setNewScheduleItemData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Schedule Item Updated Successfully',
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
                    message: 'Fail!',
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

        setEditContctIdScheduleItem(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClickScheduleItem = (event, row) => {
        event.preventDefault();
        setEditContctIdScheduleItem(row.id);
        setOpenDialog(true);

        const formValues = {
            noOfSet: row.noOfSet,
            noOfRepetition: row.noOfRepetition,
            timeBySeconds: row.timeBySeconds,
            calAmount: row.calAmount,
            serviceId: row.serviceId
        };
        setEditFormDataScheduleItem(formValues);
    };
    const handleCancelClickScheduleItem = () => {
        setEditContctIdScheduleItem(null);
    };

    const handleClose = () => {
        setEditContctIdScheduleItem(null);
        setOpenDialog(false);
    };

    const handleCloseScheduleItemAdd = () => {
        setEditContctId(null);
        setopenDialogScheduleItemAdd(false);
    };

    return (
        <>
            {type === 'Manager' || type === 'Owner' ? (
                <>
                    <MainCard title="Schedule">
                        <Stack direction="row" spacing={2}>
                            <p>Enter Member Id to view schedule</p>
                            <TextField
                                required
                                onChange={(event, newValue) => {
                                    setMemberId(event.target.value);
                                }}
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 150 }}
                            />
                            <Button disableElevation size="medium" variant="contained" color="secondary" onClick={viewMemberSchedule}>
                                Search
                            </Button>
                        </Stack>
                        <AnimateButton>
                            <Button disableElevation size="medium" variant="contained" color="secondary">
                                Member Report
                            </Button>
                        </AnimateButton>
                    </MainCard>
                    <br />

                    <MainCard title="Schedule">
                        <div style={{ height: 5 }} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Expire Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center" />
                                        <TableCell align="center" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scheduleData != null ? (
                                        scheduleData.map((row) => (
                                            <React.Fragment key={row.id}>
                                                {editContactId === row.id ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <ReadOnlyRowScheduleManager
                                                            row={row}
                                                            handleEditClick={handleEditClickSchedule}
                                                            handleDialog={handleDialog}
                                                            handleDialogAdd={handleDialogAdd}
                                                            setScheduleId={setScheduleId}
                                                        />
                                                        <Dialog open={openDialogScheduleItem} onClose={handleCloseScheduleItem}>
                                                            <DialogTitle>ScheduleItems</DialogTitle>
                                                            <DialogContent>
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell align="center">Activity</TableCell>
                                                                                <TableCell align="center">No of Sets</TableCell>
                                                                                <TableCell align="center">No of Repetitions</TableCell>
                                                                                <TableCell align="center">Time(Seconds)</TableCell>
                                                                                <TableCell align="center">Calories</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {scheduleItemData != null ? (
                                                                                scheduleItemData.map((row) => (
                                                                                    <React.Fragment key={row.id}>
                                                                                        {editContactIdSchedueItem === row.id ? (
                                                                                            <></>
                                                                                        ) : (
                                                                                            <>
                                                                                                <ReadOnlyRowScheduleItemManager
                                                                                                    row={row}
                                                                                                    handleEditClick={
                                                                                                        handleEditClickSchedule
                                                                                                    }
                                                                                                    handleDialog={handleDialog}
                                                                                                    handleDialogAdd={handleDialogAdd}
                                                                                                    setScheduleId={setScheduleId}
                                                                                                    setServiceId={setServiceId}
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseScheduleItem}>Cancel</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
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
                </>
            ) : (
                <>
                    <MainCard title="Schedule">
                        <Stack direction="row" spacing={2}>
                            <p>Enter Member Id to view schedule</p>
                            <TextField
                                required
                                onChange={(event, newValue) => {
                                    setMemberId(event.target.value);
                                }}
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 150 }}
                            />
                            <Button disableElevation size="medium" variant="contained" color="secondary" onClick={viewMemberSchedule}>
                                Search
                            </Button>
                        </Stack>
                        <AnimateButton>
                            <Button disableElevation size="medium" variant="contained" color="secondary" onClick={viewGoal}>
                                Member Report
                            </Button>
                        </AnimateButton>
                    </MainCard>
                    <br />

                    <MainCard title="Schedule">
                        <div style={{ height: 5 }} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Expire Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center" />
                                        <TableCell align="center" />
                                        <TableCell align="right">
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    size="medium"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={executeScroll}
                                                >
                                                    Add New Schedule
                                                </Button>
                                            </AnimateButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {scheduleData != null ? (
                                        scheduleData.map((row) => (
                                            <React.Fragment key={row.id}>
                                                {editContactId === row.id ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <ReadOnlyRowSchedule
                                                            row={row}
                                                            handleEditClick={handleEditClickSchedule}
                                                            handleDialog={handleDialog}
                                                            handleDialogAdd={handleDialogAdd}
                                                            setScheduleId={setScheduleId}
                                                        />
                                                        <Dialog open={openDialogScheduleItem} onClose={handleCloseScheduleItem}>
                                                            <DialogTitle>ScheduleItems</DialogTitle>
                                                            <DialogContent>
                                                                <TableContainer component={Paper}>
                                                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell align="center">Activity</TableCell>
                                                                                <TableCell align="center">No of Sets</TableCell>
                                                                                <TableCell align="center">No of Repetitions</TableCell>
                                                                                <TableCell align="center">Time(Seconds)</TableCell>
                                                                                <TableCell align="center">Calories</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {scheduleItemData != null ? (
                                                                                scheduleItemData.map((row) => (
                                                                                    <React.Fragment key={row.id}>
                                                                                        {editContactIdSchedueItem === row.id ? (
                                                                                            <EditableRowScheduleItem
                                                                                                editFormDataScheduleItem={
                                                                                                    editFormDataScheduleItem
                                                                                                }
                                                                                                handleEditFormChangeScheduleItem={
                                                                                                    handleEditFormChangeScheduleItem
                                                                                                }
                                                                                                handleEditFormSubmitScheduleItem={
                                                                                                    handleEditFormSubmitScheduleItem
                                                                                                }
                                                                                                handleCancelClickScheduleItem={
                                                                                                    handleCancelClickScheduleItem
                                                                                                }
                                                                                                setEditedValueService={
                                                                                                    setEditedValueService
                                                                                                }
                                                                                                serviceArray={serviceArray}
                                                                                                getService={getService}
                                                                                            />
                                                                                        ) : (
                                                                                            <>
                                                                                                <ReadOnlyRowScheduleItem
                                                                                                    row={row}
                                                                                                    handleEditClickScheduleItem={
                                                                                                        handleEditClickScheduleItem
                                                                                                    }
                                                                                                    handleDialog={handleDialog}
                                                                                                    handleDialogAdd={handleDialogAdd}
                                                                                                    getService={getService}
                                                                                                />
                                                                                            </>
                                                                                        )}
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleCloseScheduleItem}>Cancel</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </>
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

                    <MainCard title="Add New Schedule" ref={myRef}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item lg={6}>
                                <DesktopDatePicker
                                    label="Expire Date"
                                    value={getExpireDate}
                                    inputFormat="MM/dd/yyyy"
                                    sx={{ width: 600 }}
                                    onChange={(newValue) => {
                                        setExpireDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                            <Grid item>
                                <Button
                                    disableElevation
                                    onClick={handleAddFormSubmitSchedule}
                                    size="medium"
                                    variant="contained"
                                    color="secondary"
                                    disabled={!getExpireDate}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>

                    <Dialog open={openDialogEdit} onClose={handleCloseEdit}>
                        <DialogTitle>Edit Schedule</DialogTitle>
                        <DialogContent>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid item lg={6}>
                                    <DesktopDatePicker
                                        label="Expire Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={getExpireDate}
                                        sx={{ width: 600 }}
                                        onChange={(newValue) => {
                                            setExpireDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                            </LocalizationProvider>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEdit}>Cancel</Button>
                            <Button onClick={handleEditFormSubmitSchedule}>Save</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openDialogScheduleItemAdd} onClose={handleCloseScheduleItemAdd}>
                        <DialogTitle>Add ScheduleItems</DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                id="controllable-states-demo"
                                onChange={(event, value) => setServiceId(value.value)}
                                options={serviceArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Activity" variant="outlined" fullWidth margin="dense" />
                                )}
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                label="No of Sets"
                                margin="dense"
                                name="noOfSet"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                label="No of Repetitions"
                                margin="dense"
                                name="noOfRepetition"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                label="Time(seconds)"
                                margin="dense"
                                name="timeBySeconds"
                            />
                            <TextField
                                required
                                fullWidth
                                onChange={handlAddFormChangeScheduleItem}
                                type="number"
                                label="CalAmount"
                                margin="dense"
                                name="calAmount"
                            />

                            <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                                <Grid item>
                                    <Button
                                        disableElevation
                                        onClick={handleAddFormSubmitScheduleItem}
                                        size="medium"
                                        variant="contained"
                                        color="secondary"
                                        disabled={!newScheduleItemData}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseScheduleItemAdd}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <div style={{ height: 50 }} />

                    <div style={{ height: 50 }} />
                </>
            )}
        </>
    );
}

export default Schedule;
