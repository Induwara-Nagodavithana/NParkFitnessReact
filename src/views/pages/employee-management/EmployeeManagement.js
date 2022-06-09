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
    Step,
    StepLabel,
    Grid
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { Search } from '@material-ui/icons';
import MainCard from 'ui-component/cards/MainCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box } from '@material-ui/system';
import { Autocomplete } from '@mui/material';
import HttpCommon from 'utils/http-common';
import ReadOnlyRow from './component/ReadOnlyMemberManagementRow';

// Stepper
import FirstStep from './component/FirstStep';
import SecondStep from './component/SecondStep';
import ThirdStep from './component/ThirdStep';

// Firebase Authentication
import app from '../authentication/auth-forms/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router';
import messages from 'utils/messages';

const gymArray = [];
const adminArray = [];
const ownerArray = [];
const managerArray = [];
const trainerArray = [];
const steps = ['Sign Up', 'Personal Info', 'Contact Details'];

function ManageEmployee() {
    const [userType, setUserType] = React.useState();
    const [branchId, setBranchId] = React.useState();

    const [radioValue, setRadioValue] = React.useState();

    const [employeeData, setEmployeeData] = React.useState([]);
    const [openAddNewMemberDialog, setOpenAddNewMemberDialog] = React.useState(false);
    const [openEditMemberDialog, setEditMemberDialog] = React.useState(false);
    const [openViewMemberDialog, setViewMemberDialog] = React.useState(false);

    const [branchArray, setBranchArray] = React.useState([]);
    const [editEmployeeId, setEditEmployeeId] = React.useState();

    // Form Data
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthday, setBirthday] = React.useState(null);
    const [genderValue, setGenderValue] = React.useState('Male');
    const [contactNo, setContactNo] = React.useState('');
    const [employeeType, setEmployeeType] = React.useState('');
    const [street, setStreet] = React.useState('');
    const [lane, setLane] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');

    const [addNewStaffButton, setAddNewStaffButton] = React.useState(true);
    const [uId, setUID] = React.useState('');

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [showTable, setShowTable] = React.useState(true);
    const navigate = useNavigate();

    function showDataToAdmin() {
        const allMembers = [...adminArray, ...ownerArray, ...managerArray, ...trainerArray];
        setEmployeeData(allMembers);
        setBranchId(null);
        setRadioValue('Admin');
        setAddNewStaffButton(false);
        setShowTable(false);
    }

    function getGym() {
        const link = '/api/gym/getAllGymByUserId/';
        const key = localStorage.getItem('userID');
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function getAllMembers() {
        const tempAdArr = [];
        const tempOwArr = [];
        const url = '/api/user/';
        HttpCommon.get(url)
            .then(async (res) => {
                await Promise.all(
                    res.data.data.map((element) => {
                        if (element.type === 'Admin') {
                            adminArray.push(element);
                            tempAdArr.push(element);
                        } else if (element.type === 'Owner') {
                            ownerArray.push(element);
                            tempOwArr.push(element);
                        } else if (element.type === 'Manager') {
                            managerArray.push(element);
                        } else if (element.type === 'Trainer') {
                            trainerArray.push(element);
                        }
                        return 0;
                    })
                );
                showDataToAdmin();
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function showDataToManager() {
        setRadioValue('Trainer');
        const link = '/api/user/';
        const key = localStorage.getItem('userID');
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                if (res.data.data !== null) {
                    setBranchId(res.data.data.branchId);
                    const link2 = '/api/user/findUserByBranchId/';
                    const key2 = res.data.data.branchId;
                    const url2 = link2 + key2;

                    HttpCommon.get(url2)
                        .then((res) => {
                            const tempArr = [];
                            res.data.data.forEach((element) => {
                                if (element.type === 'Trainer') {
                                    tempArr.push(element);
                                }
                            });

                            setEmployeeData(tempArr);
                            setAddNewStaffButton(false);
                            setShowTable(false);
                        })
                        .catch((err) => {
                            messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                        });
                }
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
    }

    function unauthorizedlogin() {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    useEffect(() => {
        setUserType(localStorage.getItem('type'));
        if (localStorage.getItem('type') === 'Admin') {
            getAllMembers();
        } else if (localStorage.getItem('type') === 'Owner') {
            getGym();
        } else if (localStorage.getItem('type') === 'Manager') {
            showDataToManager();
        } else if (localStorage.getItem('type') === 'Trainer') {
            unauthorizedlogin();
        }
    }, []);

    const handleGymSelect = (event, newValue) => {
        if (newValue !== null) {
            const link = '/api/branch/getBranchByGymId/';
            const key = newValue.value;
            const url = link + key;

            HttpCommon.get(url)
                .then((res) => {
                    const tempArr = [];
                    res.data.data.forEach((element) => {
                        tempArr.push({ label: element.name, value: element.id });
                    });
                    setBranchArray(tempArr);
                })
                .catch((err) => {
                    messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
                });
        }
    };

    const handleBranchSelect = (event, newValue) => {
        if (newValue !== null) {
            setBranchId(newValue.value);
        }
    };

    const handleRadioButton = (event) => {
        setRadioValue(event.target.value);
    };

    const handleSearch = () => {
        const link = '/api/user/findUserByBranchId/';
        const key = branchId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                const tempArr = [];
                res.data.data.forEach((element) => {
                    if (element.type === radioValue) {
                        tempArr.push(element);
                    }
                });
                setEmployeeData(tempArr);

                setAddNewStaffButton(false);
                setShowTable(false);
            })
            .catch((err) => {
                messages.addMessage({ title: 'Fail !', msg: err, type: 'danger' });
            });
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
                if (userType === 'Admin') {
                    showDataToAdmin();
                } else if (userType === 'Owner') {
                    handleSearch();
                } else {
                    showDataToManager();
                }

                messages.addMessage({ title: 'Successfully Added!', msg: 'New member added to the data base.', type: 'success' });

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
                messages.addMessage({ title: 'Fail !', msg: error.massage, type: 'danger' });
            });
    };

    const handleViewClick = (event, row) => {
        setViewMemberDialog(true);
        setFirstName(row.firstName);
        setLastName(row.lastName);
        setEmail(row.email);
        setBirthday(row.birthDay);
        setContactNo(row.contactNo);
        setGenderValue(row.gender);
        setEmployeeType(row.type);
        setStreet(row.street);
        setLane(row.lane);
        setCity(row.city);
        setProvince(row.province);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        setEditEmployeeId(row.id);
        setEditMemberDialog(true);
        setFirstName(row.firstName);
        setLastName(row.lastName);
        setEmail(row.email);
        setBirthday(row.birthDay);
        setContactNo(row.contactNo);
        setGenderValue(row.gender);
        setEmployeeType(row.type);
        setStreet(row.street);
        setLane(row.lane);
        setCity(row.city);
        setProvince(row.province);
    };

    const handleEditMemberSubmit = () => {
        const link = '/api/user/';
        const key = editEmployeeId;
        const url = link + key;

        HttpCommon.put(url, {
            type: employeeType
        })
            .then((res) => {
                handleSearch();
                messages.addMessage({ title: 'Edit Successfully !', msg: 'Subscription Type Edited Successfully', type: 'success' });
            })
            .catch((error) => {
                messages.addMessage({ title: 'Fail !', msg: error.message, type: 'danger' });
            });

        setEditEmployeeId(null);
        setEditMemberDialog(false);
    };

    // Add New Member Dialog
    const handleClickAddNewMember = () => {
        setOpenAddNewMemberDialog(true);
    };
    const handleCloseAddNewMember = () => {
        setOpenAddNewMemberDialog(false);
    };

    const handleEmployeeType = (event) => {
        setEmployeeType(event.target.value);
    };

    const handleCloseEditMember = () => {
        setEditEmployeeId(null);
        setEditMemberDialog(false);
    };

    const handleCloseViewMember = () => {
        setViewMemberDialog(false);
    };

    // Stepper
    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
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
                        userType={userType}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        employeeType={employeeType}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        setEmployeeType={setEmployeeType}
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
                if (password === '' || email === '') {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                    setActiveStep(0);
                } else if (password !== confirmPassword) {
                    messages.addMessage({ title: 'Fail !', msg: 'Confirm Password did not match.', type: 'danger' });
                    setActiveStep(0);
                    setPassword('');
                    setConfirmPassword('');
                } else if (password === confirmPassword && email !== '') {
                    handleNext();
                }
                break;
            case 1:
                if (firstName !== '' && lastName !== '' && birthday !== '') {
                    handleNext();
                } else {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                }
                break;
            case 2:
                if (contactNo !== '' && street !== '' && lane !== '' && city !== '' && province !== '') {
                    const auth = getAuth(app);
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            setUID(userCredential.user.uid);
                            handleNext();
                        })
                        .catch((error) => {
                            messages.addMessage({
                                title: 'Fail!',
                                msg: error.message,
                                type: 'danger'
                            });
                        });
                } else {
                    messages.addMessage({ title: 'Fail !', msg: 'Field cannot be empty.', type: 'danger' });
                }
                break;
            default:
                messages.addMessage({ title: 'Fail !', msg: 'Active Step Not Found.', type: 'danger' });
        }
    }

    return (
        <>
            <MainCard title="Manage Employee">
                {userType === 'Owner' ? (
                    <>
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
                    </>
                ) : (
                    <></>
                )}

                <div style={{ height: 20 }} />
                {showTable !== true ? (
                    <Grid container justifyContent="flex-end">
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
                    </Grid>
                ) : (
                    <></>
                )}

                <div style={{ height: 20 }} />

                <TableContainer component={Paper} hidden={showTable}>
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
                                {userType !== 'Admin' ? (
                                    <TextField
                                        fullWidth
                                        value={branchId}
                                        label="Branch Id"
                                        margin="dense"
                                        inputProps={{ readOnly: true }}
                                    />
                                ) : (
                                    <></>
                                )}

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
                    {userType !== 'Admin' ? (
                        <>
                            {userType !== 'Owner' ? (
                                <DialogContentText>Manager can change only the type of member</DialogContentText>
                            ) : (
                                <>
                                    <DialogContentText>Owner can change only the type of member</DialogContentText>
                                </>
                            )}
                        </>
                    ) : (
                        <DialogContentText>Admin can change only the type of member</DialogContentText>
                    )}

                    <TextField
                        fullWidth
                        value={firstName}
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={lastName}
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField fullWidth value={email} label="Email" margin="dense" name="email" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={birthday} label="Birthday" margin="dense" name="birthDay" inputProps={{ readOnly: true }} />
                    <TextField
                        fullWidth
                        value={contactNo}
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
                        <FormControl fullWidth>
                            <InputLabel id="type-lable" required>
                                Type
                            </InputLabel>
                            <Select
                                labelId="type-lable"
                                id="type-select"
                                value={employeeType}
                                label="Type**"
                                onChange={handleEmployeeType}
                                required
                            >
                                {userType === 'Admin' ? (
                                    <MenuItem value="Admin">Admin</MenuItem>
                                ) : (
                                    <>
                                        {userType === 'Manager' ? (
                                            <MenuItem value="Trainer">Trainer</MenuItem>
                                        ) : (
                                            <>
                                                <MenuItem value="Manager">Manager</MenuItem>
                                                <MenuItem value="Trainer">Trainer</MenuItem>
                                            </>
                                        )}
                                    </>
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField fullWidth value={street} label="Street" margin="dense" name="street" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={lane} label="Lane" margin="dense" name="lane" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={city} label="City" margin="dense" name="city" inputProps={{ readOnly: true }} />
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
                    <TextField
                        fullWidth
                        value={firstName}
                        label="First Name"
                        margin="dense"
                        name="firstName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField
                        fullWidth
                        value={lastName}
                        label="Last Name"
                        margin="dense"
                        name="lastName"
                        inputProps={{ readOnly: true }}
                    />
                    <TextField fullWidth value={email} label="Email" margin="dense" name="email" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={birthday} label="Birthday" margin="dense" name="birthDay" inputProps={{ readOnly: true }} />
                    <TextField
                        fullWidth
                        value={contactNo}
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
                    <TextField fullWidth value={street} label="Street" margin="dense" name="street" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={lane} label="Lane" margin="dense" name="lane" inputProps={{ readOnly: true }} />
                    <TextField fullWidth value={city} label="City" margin="dense" name="city" inputProps={{ readOnly: true }} />
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
