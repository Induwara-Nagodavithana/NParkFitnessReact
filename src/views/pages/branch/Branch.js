/* eslint-disable prettier/prettier */
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
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import MuiAlert from '@mui/material/Alert';
import HttpCommon from 'utils/http-common';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import ReadOnlyRowBranch from './component/ReadOnlyRowBranch';
import useId from '@material-ui/utils/useId';
/* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const provinceArray = ['Western', 'Southern', 'Central', 'Nouthern', 'Eastern', 'North Central', 'Uva', 'Sabaragamuwa', 'North Western'];
const activeStatusArray = ['true', 'false'];
const gymArray = [];

function Branch() {
    const [branchData, setBranchData] = useState([]);
    
    // get all branch
    useEffect(() => {
        HttpCommon.get('/api/branch/')
            .then((res) => {
                setBranchData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [getGymId, setGymId] = useState([]);

    // get gym by gym id
    const [getGymByGymId, setGymByGymId] = useState([]);
    const getGym = () => {
        const link = 'api/gym/';
        const id = getGymId;
        const url = link + id;

        HttpCommon.get(url)
            .then((res) => {
                setGymByGymId(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // get branches by gym id
    const [branchByGymData, setBranchByGymData] = useState([]);

    const getBranch = () => {
        getGym();
        const link = 'api/branch/getBranchByGymId/';
        const id = getGymId;
        const url = link + id;

        HttpCommon.get(url)
            .then((res) => {
                setBranchByGymData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getBranch();
    }, []);

    // push all gyms to gym array
    const [userId, setUserId] = useState([]);
    const [type, setType] = useState([]);
    const getBranchToView = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        const link = '/api/gym/getAllGymByUserId/';
        const id = userId;
        const url = link+id;

        HttpCommon.get(url)
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getBranchToView();
    },[])

    const [getBranchId,setBranchId]=React.useState();
    const [getBranchManager,setBranchManager] = React.useState([]);
    const [getBranchNameManager,setBranchNameManager] = React.useState([]);
    const [getBranchIsActiveManager,setBranchIsActiveManager] = React.useState([]);
    const [getBranchLaneManager,setBranchLaneManager] = React.useState([]);
    const [getBranchStreetManager,setBranchStreetManager] = React.useState([]);
    const [getBranchCityManager,setBranchCityManager] = React.useState([]);
    const [getBranchProvinceManager,setBranchProvinceManager] = React.useState([]);

    const getManagerBranchId = () => {
        const userId = localStorage.getItem('userID');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);
        const link = '/api/user/'
        const id = userId;
        const url = link+id;
        HttpCommon.get(url)
            .then((res) => {
                setBranchId(res.data.data.branchId);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getManagerBranchId();
    },[getBranchId])
    // get branch by branchId
    const viewBranchDataManager = () => {
        const link = 'api/branch/'
        const id=getBranchId
        const url=link+id
        HttpCommon.get(url)
        .then((res) => {
            setBranchNameManager(res.data.data.name);
            setBranchStreetManager(res.data.data.street);
            setBranchLaneManager(res.data.data.lane);
            setBranchCityManager(res.data.data.city);
            setBranchProvinceManager(res.data.data.province);
            setBranchIsActiveManager(res.data.data.isActive);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        viewBranchDataManager();
    },[getBranchId])

   /* useEffect(() => {
        const userId = localStorage.getItem('UserId');
        const type = localStorage.getItem('type');
        setUserId(userId);
        setType(type);

        HttpCommon.get('/api/gym')
            .then((res) => {
                res.data.data.map((row) => gymArray.push({ label: row.name, value: row.id }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []); */

    const [branchCountToUser,getBranchCountToUser] = React.useState();
    const branchCountByUser = () => {
        const link = '/api/branch/getBranchCountByGymId/';
        const id = getGymId;
        const url = link +id;

        HttpCommon.get(url)
        .then(res => {
            console.log(res.data);
            getBranchCountToUser(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        branchCountByUser();
    },[branchByGymData,getGymId]);

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
    const [getBranchCount,setBranchCount] = React.useState();
    const gymCount = () => {
        getSubscriptionByUserId();
        const link = '/api/subscriptionType/';
        const id = getSubscriptionData;
        const url = link+id;

        HttpCommon.get(url)
            .then(res => {
                console.log(res.data);
                setBranchCount(res.data.data.branchCount)
                console.log(getBranchCount)
            })
            .catch(err => {
                console.log(err);
            });
            return getBranchCount;
    };
    const branchCountPossible = gymCount();

    const [newBranchData, setNewBranchData] = React.useState();

    const [editFormDataBranch, setEditFormDataBranch] = React.useState({
        name: '',
        street: '',
        lane: '',
        city: '',
        province: '',
        gymId: '',
        isActive: ''
    });

    const [editContactIdBranch, setEditContctIdBranch] = React.useState(null);

    // dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    // provinces & isActive autocomplete values
    const [proviceName, setProvince] = useState([]);
    const [ActiveStatus, setIsActive] = useState([]);

    //  Add New Branch
    const handlAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...newBranchData };
        newFormData[fieldName] = fieldValue;

        setNewBranchData(newFormData);
        console.log(newBranchData);
    };

    // Send New branch data to server
    const handleAddFormSubmit = () => {
        if(parseInt(branchCountToUser, 10) >= parseInt(branchCountPossible, 10)){
            Store.addNotification({
                title: 'Fail to add new gym!',
                message: 'Your branch count exceeded',
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
        console.log(newBranchData);

        HttpCommon.post('/api/branch/', {
            name: newBranchData.name,
            street: newBranchData.street,
            lane: newBranchData.lane,
            city: newBranchData.city,
            province: proviceName,
            gymId: getGymId,
            isActive: ActiveStatus
        })
            .then((res) => {
                getBranch();
                setNewBranchData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'New Branch Added Successfully',
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
                setNewBranchData(null);
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
    // Data entering to text feilds in Edit branch details
    const handleEditFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormDataBranch };
        newFormData[fieldName] = fieldValue;

        setEditFormDataBranch(newFormData);
        console.log('after type edit data');
        console.log(editFormDataBranch);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueProvince, setEditedValueProvince] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueActive, setEditedValueActive] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [editedValueGym, setEditedValueGym] = useState();

    // Send Edited branch data to server
    const handleEditFormSubmit = () => {
        const link = '/api/branch/';
        const key = editContactIdBranch;
        const url = link + key;

        HttpCommon.put(url, {
            name: editFormDataBranch.name,
            street: editFormDataBranch.street,
            lane: editFormDataBranch.lane,
            city: editFormDataBranch.city,
            province: editedValueProvince,
            gymId: editedValueGym,
            isActive: editedValueActive
        })
            .then((res) => {
                getBranch();
                getBranchToView();
                setNewBranchData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Branch Updated Successfully',
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

        setEditContctIdBranch(null);
        setOpenDialog(false);
    };
    const handleEditFormSubmitManager = () => {
        const link = '/api/branch/';
        const key = getBranchId;
        const url = link + key;

        HttpCommon.put(url, {
            name: getBranchNameManager,
            street: getBranchStreetManager,
            lane: getBranchLaneManager,
            city: getBranchCityManager,
            province: getBranchProvinceManager,
            isActive: getBranchIsActiveManager
        })
            .then((res) => {
                setNewBranchData(null);

                Store.addNotification({
                    title: 'Successfully Done!',
                    message: 'Branch Updated Successfully',
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

        setBranchId(null);
        setOpenDialog(false);
    };

    // Handling edit click
    const handleEditClick = (event, row) => {
        event.preventDefault();
        setEditContctIdBranch(row.id);
        setOpenDialog(true);

        const formValues = {
            name: row.name,
            street: row.street,
            lane: row.lane,
            city: row.city,
            province: row.province,
            gymId: row.gymId,
            isActive: row.isActive
        };
        setEditFormDataBranch(formValues);
    };

    const handleClose = () => {
        setEditContctIdBranch(null);
        setOpenDialog(false);
    };

    const myRef = useRef(null);

     // Scroll to myRef view
     const executeScroll = () => {
        if(parseInt(branchCountToUser, 10) >= parseInt(branchCountPossible, 10)){
            Store.addNotification({
                title: 'Fail to add new gym! ',
                message: 'Your Branch count exceeded, Use new subscription',
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
            {type === 'Manager' ? (
                <MainCard title="Branch">
                     <TextField
                                required
                                fullWidth
                                value={getBranchNameManager}
                                onChange={(event, newValue) => {
                                    setBranchNameManager(event.target.value);
                                }}                                
                                label="Branch Name"
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 255 }}
                            />
                            <TextField
                                required
                                fullWidth
                                value={getBranchStreetManager}
                                onChange={(event, newValue) => {
                                    setBranchStreetManager(event.target.value);
                                }}
                                label="Street"
                                margin="dense"
                                name="street"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={getBranchLaneManager}
                                onChange={(event, newValue) => {
                                    setBranchLaneManager(event.target.value);
                                }}
                                label="Lane"
                                margin="dense"
                                name="lane"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={getBranchCityManager}
                                onChange={(event, newValue) => {
                                    setBranchCityManager(event.target.value);
                                }}
                                label="City"
                                margin="dense"
                                name="city"
                                inputProps={{ maxLength: 255 }}
                            />
                             <Autocomplete
                                value={getBranchProvinceManager}
                                onChange={(event, newValue) => {
                                    setBranchProvinceManager(newValue);
                                }}
                                id="controllable-states-demo"
                                options={provinceArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" name="Province" />
                                )}
                            />
                            <Autocomplete
                                value={getBranchIsActiveManager}
                                onChange={(event, newValue) => {
                                    setBranchIsActiveManager(newValue);
                                }}
                                id="controllable-states-demo"
                                options={activeStatusArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="isActive" variant="outlined" fullWidth margin="dense" name="isActive" />
                                )}
                            />
                             <Button
                            disableElevation
                            onClick={handleEditFormSubmitManager}
                            size="medium"
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                   

                </MainCard>
            ) : (
                <>
                    <MainCard title="Branch">
                        <Stack direction="row" spacing={2}>
                            <Autocomplete
                                disablePortal
                                id="controllable-states-demo"
                                options={gymArray}
                                onChange={(event, newValue) => {
                                    setGymId(newValue.value);
                                }}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Select Gym" />}
                            />
                            <Button variant="contained" onClick={getBranch} size="medium" color="secondary">
                                Search
                            </Button>
                        </Stack>
                        <div style={{ height: 5 }} />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">BranchName</TableCell>
                                        <TableCell align="center">Street</TableCell>
                                        <TableCell align="center">Lane</TableCell>
                                        <TableCell align="center">City</TableCell>
                                        <TableCell align="center">Province</TableCell>
                                        <TableCell align="center">isActive</TableCell>

                                        <TableCell align="right">
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    size="medium"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={executeScroll}
                                                >
                                                    Add New Branch
                                                </Button>
                                            </AnimateButton>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {branchByGymData != null ? (
                                        branchByGymData.map((row) => (
                                            <React.Fragment key={row.id}>
                                                {editContactIdBranch === row.id ? (
                                                    <Dialog />
                                                ) : (
                                                    <ReadOnlyRowBranch row={row} handleEditClick={handleEditClick} />
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
                    <MainCard title="Add New Branch" ref={myRef}>
                        <TextField required fullWidth onChange={handlAddFormChange} label="Branch Name" margin="dense" name="name" />
                        <TextField required fullWidth onChange={handlAddFormChange} label="Street" margin="dense" name="street" />
                        <TextField required fullWidth onChange={handlAddFormChange} label="Lane" margin="dense" name="lane" />
                        <TextField required fullWidth onChange={handlAddFormChange} label="City" margin="dense" name="city" />

                        <Autocomplete
                            id="controllable-states-demo"
                            value={proviceName}
                            onChange={(event, value) => setProvince(value)}
                            options={provinceArray}
                            renderInput={(params) => <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" />}
                        />

                        <Autocomplete
                            id="controllable-states-demo"
                            onChange={(event, value) => setGymId(value.value)}
                            options={gymArray}
                            renderInput={(params) => <TextField {...params} label="Gym" variant="outlined" fullWidth margin="dense" />}
                        />

                        <Autocomplete
                            id="controllable-states-demo"
                            value={ActiveStatus}
                            onChange={(event, value) => setIsActive(value)}
                            options={activeStatusArray}
                            renderInput={(params) => <TextField {...params} label="isActive" variant="outlined" fullWidth margin="dense" />}
                        />
                        <Grid container direction="row" justifyContent="flex-end" spacing={3}>
                            <Grid item>
                                <Button
                                    disableElevation
                                    onClick={handleAddFormSubmit}
                                    size="medium"
                                    variant="contained"
                                    color="secondary"
                                    disabled={!newBranchData}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>

                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Edit Branch</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                fullWidth
                                value={editFormDataBranch.name}
                                onChange={handleEditFormChange}
                                label="Branch Name"
                                margin="dense"
                                name="name"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={editFormDataBranch.street}
                                onChange={handleEditFormChange}
                                label="Street"
                                margin="dense"
                                name="street"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={editFormDataBranch.lane}
                                onChange={handleEditFormChange}
                                label="Lane"
                                margin="dense"
                                name="lane"
                                inputProps={{ maxLength: 255 }}
                            />

                            <TextField
                                required
                                fullWidth
                                value={editFormDataBranch.city}
                                onChange={handleEditFormChange}
                                label="City"
                                margin="dense"
                                name="city"
                                inputProps={{ maxLength: 255 }}
                            />

                            <Autocomplete
                                value={editFormDataBranch.province}
                                onChange={(event, newValue) => {
                                    setEditedValueProvince(newValue);
                                }}
                                id="controllable-states-demo"
                                options={provinceArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Province" variant="outlined" fullWidth margin="dense" name="Province" />
                                )}
                            />
                            <Autocomplete
                                value={editFormDataBranch.isActive}
                                onChange={(event, newValue) => {
                                    setEditedValueActive(newValue);
                                }}
                                id="controllable-states-demo"
                                options={activeStatusArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="isActive" variant="outlined" fullWidth margin="dense" name="isActive" />
                                )}
                            />
                            <Autocomplete
                                value={getGymByGymId.name}
                                onChange={(event, newValue) => {
                                    setEditedValueGym(newValue.value);
                                }}
                                id="controllable-states-demo"
                                options={gymArray}
                                renderInput={(params) => (
                                    <TextField {...params} label="Gym" variant="outlined" fullWidth margin="dense" name="gymId" />
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
            )}
        </>
    );
}

export default Branch;
