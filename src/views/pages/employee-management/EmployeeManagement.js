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
    Stack,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    InputLabel,
    Select,
    MenuItem,
    Stepper,
    StepLable,
    Step,
    StepLabel,
    IconButton
} from '@material-ui/core';
import React, { useEffect, Fragment } from 'react';
import { Search, Visibility, VisibilityOff } from '@material-ui/icons';
import MainCard from 'ui-component/cards/MainCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@material-ui/system';
import { Autocomplete, OutlinedInput, InputAdornment } from '@mui/material';
import HttpCommon from 'utils/http-common';
import ReadOnlyRow from './component/ReadOnlyMemberManagementRow';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';

// Stepper
import FirstStep from './component/FirstStep';
import SecondStep from './component/SecondStep';
import ThirdStep from './component/ThirdStep';

// Firebase Authentication
import app from '../authentication/auth-forms/firebase';
import { getAuth, createUserWithEmailAndPassword, IdTokenResult } from 'firebase/auth';

const gymArray = [];
const steps = ['Sign Up', 'Personal Info', 'Contact Details'];

function ManageEmployee() {
    const [branchId, setBranchId] = React.useState();
    const [radioValue, setRadioValue] = React.useState('Manager');
    const [employeeData, setEmployeeData] = React.useState([]);
    const [openAddNewMemberDialog, setOpenAddNewMemberDialog] = React.useState(false);
    const [openEditMemberDialog, setEditMemberDialog] = React.useState(false);
    const [openViewMemberDialog, setViewMemberDialog] = React.useState(false);

    const [employeeType, setEmployeeType] = React.useState('');

    const [branchArray, setBranchArray] = React.useState([]);
    const [editEmployeeId, setEditEmployeeId] = React.useState();
    const [addNewEmployee, setAddNewEmployee] = React.useState();
    const [editFormData, setEditFormData] = React.useState({
        firstName: '',
        lastName: '',
        password: '',
        birthDay: '',
        email: '',
        contactNo: '',
        street: '',
        lane: '',
        city: ''
    });

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmValidation, setConfirmValidation] = React.useState(true);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthday, setBirthday] = React.useState(null);
    const [genderValue, setGenderValue] = React.useState('Male');
    const [contactNo, setContactNo] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [lane, setLane] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [addNewStaffButton, setAddNewStaffButton] = React.useState(true);
    const [uId, setUID] = React.useState('');

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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

    const handleRadioButton = (event) => {
        console.log(event.target.value);
        setRadioValue(event.target.value);
    };

    const handleSearch = () => {
        console.log(branchId);
        console.log(radioValue);
        const link = '/api/user/findUserByBranchId/';
        const key = branchId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                // const tempArr = [];
                // res.data.data.forEach((element) => {
                //     tempArr.push({ label: element.name, value: element.id });
                // });
                // setBranchArray(tempArr);
                setEmployeeData(res.data.data);
                console.log(res.data.data);
                setAddNewStaffButton(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addNewEmployee };
        newFormData[fieldName] = fieldValue;

        setAddNewEmployee(newFormData);
    };

    const handleAddNewMemberSubmit = () => {
        HttpCommon.post('/api/user/', {
            firstName,
            lastName,
            password: confirmPassword,
            birthDay: birthday,
            email,
            contactNo,
            gender: genderValue,
            type: radioValue,
            street,
            lane,
            city,
            province,
            fireUID: uId,
            branchId
        })
            .then((res) => {
                handleSearch();
                Store.addNotification({
                    title: 'Successfully Added!',
                    message: 'New member added to the data base.',
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
                setOpenAddNewMemberDialog(false);
                setActiveStep(0);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
                setBirthday(null);
                setGenderValue('Male');
                setContactNo('');
                setStreet('');
                setLane('');
                setCity('');
                setProvince('');
                setUID('');
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
    };

    const handleViewClick = (event, row) => {
        setViewMemberDialog(true);

        const formValues = {
            firstName: row.firstName,
            lastName: row.lastName,
            password: row.password,
            birthDay: row.birthDay,
            email: row.email,
            contactNo: row.contactNo,
            street: row.street,
            lane: row.lane,
            city: row.city
        };

        setEditFormData(formValues);
        setEmployeeType(row.type);
        setProvince(row.province);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        event.preventDefault();
        console.log('ContactId');
        console.log(row.id);
        console.log(row);
        setEditEmployeeId(row.id);

        setEditMemberDialog(true);

        const formValues = {
            firstName: row.firstName,
            lastName: row.lastName,
            password: row.password,
            birthDay: row.birthDay,
            email: row.email,
            contactNo: row.contactNo,
            street: row.street,
            lane: row.lane,
            city: row.city
        };

        setEditFormData(formValues);
        setEmployeeType(row.type);
        setProvince(row.province);
    };

    // const handleEditFormChange = (event) => {
    //     const fieldName = event.target.getAttribute('name');
    //     const fieldValue = event.target.value;

    //     const newFormData = { ...editFormData };
    //     newFormData[fieldName] = fieldValue;

    //     setEditFormData(newFormData);
    // };

    const handleEditMemberSubmit = () => {
        const link = '/api/user/';
        const key = editEmployeeId;
        const url = link + key;

        HttpCommon.put(url, {
            type: employeeType
        })
            .then((res) => {
                handleSearch();

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Subscription Type Edited Successfully',
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

        setEditEmployeeId(null);
        setEditMemberDialog(false);
    };

    const handleEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    };

    // Add New Member Dialog
    const handleClickAddNewMember = () => {
        setOpenAddNewMemberDialog(true);
    };
    const handleCloseAddNewMember = () => {
        setOpenAddNewMemberDialog(false);
    };
    // const handleGenderButton = (event) => {
    //     setGenderValue(event.target.value);
    // };
    const handleEmployeeType = (event) => {
        setEmployeeType(event.target.value);
    };
    // const handleProvince = (event) => {
    //     setProvince(event.target.value);
    // };

    const handleCloseEditMember = () => {
        setEditEmployeeId(null);
        setEditMemberDialog(false);
    };

    const handleCloseViewMember = () => {
        setViewMemberDialog(false);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Stepper
    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        console.log('step up');
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function showStep(step) {
        switch (step) {
            case 0:
                return (
                    <FirstStep
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                    />
                );
            case 1:
                return (
                    <SecondStep
                        firstName={firstName}
                        lastName={lastName}
                        birthday={birthday}
                        genderValue={genderValue}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setBirthday={setBirthday}
                        setGenderValue={setGenderValue}
                    />
                );
            case 2:
                return (
                    <ThirdStep
                        contactNo={contactNo}
                        street={street}
                        lane={lane}
                        city={city}
                        province={province}
                        setContactNo={setContactNo}
                        setStreet={setStreet}
                        setLane={setLane}
                        setCity={setCity}
                        setProvince={setProvince}
                    />
                );
            default:
                return <></>;
        }
    }
    function validations() {
        switch (activeStep) {
            case 0:
                console.log('step00');
                if (password === '') {
                    Store.addNotification({
                        title: 'Fail!',
                        message: 'Field cannot be empty.',
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
                    setActiveStep(0);
                } else if (password !== confirmPassword) {
                    Store.addNotification({
                        title: 'Fail!',
                        message: 'Confirm Password did not match.',
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
                    setActiveStep(0);
                    setPassword('');
                    setConfirmPassword('');
                } else if (password === confirmPassword) {
                    // confirmValidation(false);
                    handleNext();
                }

                break;
            case 1:
                console.log('step01');
                if (firstName !== '' && lastName !== '' && birthday !== '') {
                    handleNext();
                } else {
                    Store.addNotification({
                        title: 'Fail!',
                        message: 'Field cannot be empty.',
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
                }
                break;
            case 2:
                console.log('step02');
                if (contactNo !== '' && street !== '' && lane !== '' && city !== '' && province !== '') {
                    const auth = getAuth(app);
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in
                            console.log(userCredential.user.uid);
                            setUID(userCredential.user.uid);
                            // const user = userCredential.user;
                            // ...
                            Store.addNotification({
                                title: 'successfull!',
                                message: 'added successfully.',
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
                            handleNext();
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            Store.addNotification({
                                title: 'Fail!',
                                message: errorMessage,
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
                            // ..
                        });
                } else {
                    Store.addNotification({
                        title: 'Fail!',
                        message: 'Field cannot be empty.',
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
                }
                break;
            default:
                console.log('step default');
                Store.addNotification({
                    title: 'Failed!',
                    message: 'Active Step Not Found.',
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
        }
    }

    return (
        <>
            <MainCard title="Manage Employee">
                <Stack spacing={2}>
                    <Autocomplete
                        disablePortal
                        id="gyms"
                        options={gymArray}
                        onChange={handleGymSelect}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Gym" />}
                    />
                    {branchArray.length > 0 ? (
                        <Autocomplete
                            disablePortal
                            id="branchs"
                            options={branchArray}
                            onChange={handleBranchSelect}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Branch" />}
                        />
                    ) : (
                        <></>
                    )}

                    <RadioGroup row value={radioValue} onChange={handleRadioButton}>
                        <FormControlLabel value="Manager" control={<Radio color="secondary" />} label="Manager" />
                        <FormControlLabel value="Trainer" control={<Radio color="secondary" />} label="Trainer" />
                    </RadioGroup>
                </Stack>

                <div style={{ height: 10 }} />

                <Button variant="contained" color="secondary" startIcon={<Search />} size="smaLL" onClick={handleSearch}>
                    Search
                </Button>

                <div style={{ height: 50 }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Use Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Contact No</TableCell>
                                <TableCell align="right">
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            size="medium"
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleClickAddNewMember}
                                            disabled={addNewStaffButton}
                                        >
                                            Add New Staff
                                        </Button>
                                    </AnimateButton>
                                </TableCell>
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
                                                radioValue={radioValue}
                                                handleViewClick={handleViewClick}
                                                handleEditClick={handleEditClick}
                                            />
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
            <Dialog open={openAddNewMemberDialog} onClose={handleCloseAddNewMember}>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'error.main' }}>Enter all * Requierd Data</DialogContentText>
                    <div style={{ height: 10 }} />
                    <Box sx={{ width: '100%' }}>
                        <Stepper
                            style={{ width: '100%', align: 'center' }}
                            activeStep={activeStep}
                            orientation="horizontal"
                            alternativeLabel
                        >
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {showStep(activeStep)}
                        {activeStep === steps.length ? (
                            <>
                                <TextField
                                    fullWidth
                                    value={firstName.concat(' ', lastName)}
                                    label="Name"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField fullWidth value={email} label="Email" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={birthday} label="Birthday" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={genderValue} label="Gender" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={contactNo} label="Contact No" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField
                                    fullWidth
                                    value={street.concat(', ', lane, ', ', city)}
                                    label="Address"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField fullWidth value={province} label="Province" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField fullWidth value={branchId} label="Branch Id" margin="dense" inputProps={{ readOnly: true }} />
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" onClick={handleCloseAddNewMember} sx={{ mr: 1 }}>
                                        Close
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleAddNewMemberSubmit}>Submit</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {/* if(activeStep === steps.length - 1)<Button onClick={handleNext}>Finish</Button>else if(activeStep===0 )
                                    <Button onClick={handleNext} disabled={checkConfirm}>
                                        Next
                                    </Button>
                                    else<Button onClick={handleNext}>Next</Button> */}
                                    <Button onClick={validations}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openEditMemberDialog} onClose={handleCloseAddNewMember}>
                <DialogTitle>Edit Staff Member Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Owner can change only the type of member</DialogContentText>
                    <TextField
                        fullWidth
                        value={editFormData.firstName}
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.lastName}
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.email}
                        label="Email"
                        margin="dense"
                        name="email"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.birthDay}
                        label="Birthday"
                        margin="dense"
                        name="birthDay"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.contactNo}
                        label="Contact Number"
                        margin="dense"
                        name="contactNo"
                        inputProps={{ readOnly: true }}
                    />
                    <FormControl>
                        <FormLabel id="gender">Gender</FormLabel>
                        <RadioGroup row value={genderValue}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth required>
                            <InputLabel id="type-lable">Type</InputLabel>
                            <Select labelId="type-lable" id="type-select" value={employeeType} label="Type" onChange={handleEmployeeType}>
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Trainer">Trainer</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        fullWidth
                        value={editFormData.street}
                        label="Street"
                        margin="dense"
                        name="street"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.lane}
                        label="Lane"
                        margin="dense"
                        name="lane"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.city}
                        label="City"
                        margin="dense"
                        name="city"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField fullWidth value={province} label="Province" margin="dense" name="province" inputProps={{ readOnly: true }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditMember}>Cancel</Button>
                    <Button onClick={handleEditMemberSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openViewMemberDialog} onClose={handleCloseAddNewMember}>
                <DialogTitle>Member Details</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Owner can change only the type of member</DialogContentText> */}
                    <TextField
                        fullWidth
                        value={editFormData.firstName}
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.lastName}
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.email}
                        label="Email"
                        margin="dense"
                        name="email"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.birthDay}
                        label="Birthday"
                        margin="dense"
                        name="birthDay"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.contactNo}
                        label="Contact Number"
                        margin="dense"
                        name="contactNo"
                        inputProps={{ readOnly: true }}
                    />
                    <FormControl>
                        <FormLabel id="gender">Gender</FormLabel>
                        <RadioGroup row value={genderValue}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth value={employeeType} label="Employee Type" margin="dense" inputProps={{ readOnly: true }} />
                    <TextField
                        fullWidth
                        value={editFormData.street}
                        label="Street"
                        margin="dense"
                        name="street"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.lane}
                        label="Lane"
                        margin="dense"
                        name="lane"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={editFormData.city}
                        label="City"
                        margin="dense"
                        name="city"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField fullWidth value={province} label="Province" margin="dense" name="province" inputProps={{ readOnly: true }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewMember}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ManageEmployee;
