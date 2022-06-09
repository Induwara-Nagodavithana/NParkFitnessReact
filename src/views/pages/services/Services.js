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
    Autocomplete,
    Stack
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import EditableRow from './component/EditableRowService';
import ReadOnlyRow from './component/ReadOnlyServiceRow';
import { Search } from '@material-ui/icons';
import HttpCommon from 'utils/http-common';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const gymArray = [];
const bodyparts = ['ABS', 'Back', 'Biceps', 'Chest', 'Forearm', 'Hips', 'Legs', 'Shoulder', 'Triceps'];
const status = ['Availble', 'Not Available'];

function ServiceType() {
    const [serviceData, setServiceData] = useState([]);
    const [BranchId, setBranchId] = React.useState();
    const [branchArray, setBranchArray] = React.useState([]);

    useEffect(() => {
        const link = '/api/gym/getAllGymByUserId/';
        const key = localStorage.getItem('userID');
        const url = link + key;
        console.log(url);
        HttpCommon.get(url)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
                console.log(gymArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleGymSelect = (event, newValue) => {
        if (newValue !== null) {
            console.log(newValue.value);

            const link = '/api/branch/getBranchByGymId/';
            const key = newValue.value;
            const url = link + key;
            console.log(url);
            HttpCommon.get(url)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        tempArr.push({ label: element.name, value: element.id });
                    });
                    setBranchArray(tempArr);
                    console.log(tempArr);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleBranchSelect = (event, newValue) => {
        if (newValue !== null) {
            setBranchId(newValue.value);
        }
    };

    const handleSearch = () => {
        const link = '/api/serviceType/getServiceTypeByBranchId/';
        const key = BranchId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                setServiceData(res.data.data.serviceType);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [newServiceData, setNewServiceData] = useState();
    const [statusValue, setStatusValue] = React.useState(null);
    const [bodyPartValue, setBodyPartValue] = React.useState(null);
    const [editedValue, setEditedValue] = useState();

    const [editFormData, setEditFormData] = React.useState({
        name: '',
        status: '',
        bodyPart: ''
    });

    const [editServiceId, setEditServiceId] = React.useState(null);

    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newServiceData };
        newFormData[fieldName] = fieldValue;

        setNewServiceData(newFormData);
        console.log(newServiceData);
    };

    const handleAddFormSubmit = () => {
        HttpCommon.post('/api/serviceType/', {
            name: newServiceData.name,
            status: statusValue,
            bodyPart: bodyPartValue,
            branchId: BranchId
        })
            .then((res) => {
                handleSearch();
                setNewServiceData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New Service Added Successfully',
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
        const link = '/api/serviceType/';
        const key = editServiceId;
        const url = link + key;

        HttpCommon.put(url, {
            name: editFormData.name,
            status: editFormData.status,
            bodyPart: editedValue
        })
            .then((res) => {
                handleSearch();

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Service Edited Successfully',
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

        setEditServiceId(null);
    };

    const handleEditClick = (event, row) => {
        setEditServiceId(row.id);

        const formValues = {
            name: row.name,
            status: row.status,
            bodyPart: row.bodyPart
        };
        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditServiceId(null);
    };

    // Create and get my reference in Add New Subscription type
    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
    };

    return (
        <>
            <MainCard title="Services">
                <Stack direction="row" spacing={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={gymArray}
                        onChange={handleGymSelect}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Gym" />}
                    />
                    {branchArray.length > 0 ? (
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo2"
                            options={branchArray}
                            onChange={handleBranchSelect}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Branch" />}
                        />
                    ) : (
                        <></>
                    )}

                    <Button variant="contained" startIcon={<Search />} size="large" onClick={handleSearch}>
                        Search
                    </Button>
                </Stack>
                <div style={{ height: 50 }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Body Part</TableCell>
                                <TableCell align="right">
                                    <AnimateButton>
                                        <Button disableElevation size="medium" variant="contained" color="primary" onClick={executeScroll}>
                                            Add New Service
                                        </Button>
                                    </AnimateButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceData != null ? (
                                serviceData.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {editServiceId === row.id ? (
                                            <EditableRow
                                                editFormData={editFormData}
                                                setEditedValue={setEditedValue}
                                                handleEditFormChange={handleEditFormChange}
                                                handleEditFormSubmit={handleEditFormSubmit}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <ReadOnlyRow row={row} handleEditClick={handleEditClick} />
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
            <MainCard title="Add New Service" ref={myRef}>
                <TextField required fullWidth onChange={handlAddFormChange} label="Name" margin="dense" name="name" />

                <Autocomplete
                    value={statusValue}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        setStatusValue(newValue);
                    }}
                    id="controllable-states-demo"
                    options={status}
                    renderInput={(params) => (
                        <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="bodyPart" />
                    )}
                />

                <Autocomplete
                    value={bodyPartValue}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        setBodyPartValue(newValue);
                    }}
                    id="controllable-states-demo"
                    options={bodyparts}
                    renderInput={(params) => (
                        <TextField {...params} label="Body Part" variant="outlined" fullWidth margin="dense" name="bodyPart" />
                    )}
                />

                <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                    <Grid item>
                        <Button
                            disableElevation
                            onClick={handleAddFormSubmit}
                            size="medium"
                            variant="contained"
                            color="primary"
                            disabled={!newServiceData}
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

export default ServiceType;
