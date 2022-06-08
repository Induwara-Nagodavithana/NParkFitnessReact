import React, { useEffect, useRef, useState, Fragment } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Grid,
    TextField,
    Autocomplete,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import ReadOnlyRow from './component/ReadOnlySubscriptionRow';
import HttpCommon from 'utils/http-common';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import messages from 'utils/messages';

/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const statusChoise = [
    { label: 'Active', value: 'true' },
    { label: 'Not Active', value: 'false' }
];
const choice = [
    { label: 'Available', value: 'true' },
    { label: 'Not Available', value: 'false' }
];

function SubscriptionType() {
    const [subscriptionData, setSubscriptionData] = useState([]);

    function getSubscriptionTypes() {
        HttpCommon.get('/api/subscriptionType/')
            .then((res) => {
                setSubscriptionData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getSubscriptionTypes();
    }, []);

    const [contacts, setContacts] = React.useState();

    const [editFormData, setEditFormData] = React.useState({
        type: '',
        description: '',
        gymCount: '',
        branchCount: '',
        amount: '',
        isActive: '',
        isCalAvailable: '',
        isDietAvailable: ''
    });
    const [editContactId, setEditContctId] = React.useState(null);

    // Autocomplete data
    const [status, setStatus] = React.useState();
    const [caloriecal, setCaloriecal] = React.useState();
    const [dietPlan, setDietPlan] = React.useState();

    // Handle Dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    // Handeling Data entering to text feilds in Add New Subscription Type
    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...contacts };
        newFormData[fieldName] = fieldValue;

        setContacts(newFormData);
    };

    // Handeling Data entering to text feilds in Edit Subscription Type
    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    // Send New Subscription Type data to server
    const handleAddFormSubmit = () => {
        HttpCommon.post('/api/subscriptionType/', {
            type: contacts.type,
            description: contacts.description,
            amount: contacts.amount,
            gymCount: contacts.gymCount,
            branchCount: contacts.branchCount,
            isActive: status,
            isCalAvailable: caloriecal,
            isDietAvailable: dietPlan
        })
            .then((res) => {
                getSubscriptionTypes();
                messages.addMessage({ title: 'Successfully Done!', msg: 'New Subscription Type Added Successfully', type: 'success' });
            })
            .catch((error) => {
                console.log(error);
                messages.addMessage({ title: 'Fail!', msg: 'Fill all required Data', type: 'danger' });
            });
    };

    // Send Edited Subscription Type data to server
    const handleEditFormSubmit = () => {
        const link = '/api/subscriptionType/';
        const key = editContactId;
        const url = link + key;

        HttpCommon.put(url, {
            type: editFormData.type,
            description: editFormData.description,
            amount: editFormData.amount,
            gymCount: editFormData.gymCount,
            branchCount: editFormData.branchCount,
            isActive: status,
            isCalAvailable: caloriecal,
            isDietAvailable: dietPlan
        })
            .then((res) => {
                getSubscriptionTypes();
                messages.addMessage({ title: 'Successfully Done!', msg: 'Subscription Type Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                console.log(error);
                messages.addMessage({ title: 'Fail!', msg: error, type: 'danger' });
            });

        setEditContctId(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        event.preventDefault();
        console.log('ContactId');
        console.log(row.id);
        setEditContctId(row.id);
        setOpenDialog(true);

        const formValues = {
            type: row.type,
            description: row.description,
            gymCount: row.gymCount,
            branchCount: row.branchCount,
            amount: row.amount
        };

        setEditFormData(formValues);
        setStatus(row.isActive);
        setCaloriecal(row.isCalAvailable);
        setDietPlan(row.isDietAvailable);
    };

    const handleClose = () => {
        setEditContctId(null);
        setOpenDialog(false);
    };

    const handleStatus = (event, value) => {
        setStatus(value.value);
    };

    const handleCalorieCal = (event, value) => {
        setCaloriecal(value.value);
    };

    const handleDietPlan = (event, value) => {
        setDietPlan(value.value);
    };

    // Create and get my reference in Add New Subscription type
    const myRef = useRef(null);

    // Scroll to myRef view
    const executeScroll = () => {
        myRef.current.scrollIntoView();
    };

    return (
        <>
            <MainCard title="Subscription Types">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Gym Count</TableCell>
                                <TableCell align="left">Branch Count</TableCell>
                                <TableCell align="left">Amount</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Calorie Cal</TableCell>
                                <TableCell align="left">Diet Plan</TableCell>
                                <TableCell align="right">
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            onClick={executeScroll}
                                        >
                                            Add New Type
                                        </Button>
                                    </AnimateButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscriptionData != null ? (
                                subscriptionData.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {editContactId === row.id ? (
                                            <Dialog />
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

            <MainCard ref={myRef} title="Add New Type">
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Type"
                    margin="dense"
                    name="type"
                    inputProps={{ maxLength: 255 }}
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Description"
                    multiline
                    rows={3}
                    margin="dense"
                    name="description"
                    inputProps={{ maxLength: 255 }}
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Gym Count"
                    margin="dense"
                    name="gymCount"
                    type="number"
                />
                <TextField
                    required
                    fullWidth
                    onChange={handlAddFormChange}
                    label="Branch Count"
                    margin="dense"
                    name="branchCount"
                    type="number"
                />
                <TextField required fullWidth onChange={handlAddFormChange} label="Amount" margin="dense" name="amount" type="number" />
                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleStatus}
                    options={statusChoise}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="isActive" />
                    )}
                />

                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleCalorieCal}
                    options={choice}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Calorie Calculator"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            name="isCalAvailable"
                        />
                    )}
                />

                <Autocomplete
                    required
                    disablePortal
                    id="combo-box-demo"
                    onChange={handleDietPlan}
                    options={choice}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Diet Plan" variant="outlined" fullWidth margin="dense" name="isDietAvailable" />
                    )}
                />

                <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                    <Grid item>
                        <Button
                            disableElevation
                            onClick={handleAddFormSubmit}
                            size="medium"
                            variant="contained"
                            color="secondary"
                            disabled={!contacts}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </MainCard>

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit Subscription Type</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter all * Requierd Data</DialogContentText>
                    <TextField
                        required
                        fullWidth
                        value={editFormData.type}
                        onChange={handleEditFormChange}
                        label="Type"
                        margin="dense"
                        name="type"
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.description}
                        onChange={handleEditFormChange}
                        label="Description"
                        multiline
                        rows={3}
                        margin="dense"
                        name="description"
                        inputProps={{ maxLength: 255 }}
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.gymCount}
                        onChange={handleEditFormChange}
                        label="Gym Count"
                        margin="dense"
                        name="gymCount"
                        type="number"
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.branchCount}
                        onChange={handleEditFormChange}
                        label="Branch Count"
                        margin="dense"
                        name="branchCount"
                        type="number"
                    />
                    <TextField
                        required
                        fullWidth
                        value={editFormData.amount}
                        onChange={handleEditFormChange}
                        label="Amount"
                        margin="dense"
                        name="amount"
                        type="number"
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        defaultValue={status ? statusChoise[0] : statusChoise[1]}
                        onChange={handleStatus}
                        options={statusChoise}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" variant="outlined" fullWidth margin="dense" name="isActive" />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={handleCalorieCal}
                        defaultValue={caloriecal ? choice[0] : choice[1]}
                        options={choice}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Calorie Calculator"
                                variant="outlined"
                                fullWidth
                                margin="dense"
                                name="isCalAvailable"
                            />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        defaultValue={dietPlan ? choice[0] : choice[1]}
                        onChange={handleDietPlan}
                        options={choice}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Diet Plan" variant="outlined" fullWidth margin="dense" name="isDietAvailable" />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditFormSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
            <div style={{ height: 50 }} />
        </>
    );
}

export default SubscriptionType;
