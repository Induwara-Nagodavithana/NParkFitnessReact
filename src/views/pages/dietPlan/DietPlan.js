import { Button, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, Step, StepLabel, Stepper } from '@material-ui/core';
import { TextField } from '@mui/material';
import { React, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Search } from '@material-ui/icons';
import HttpCommon from 'utils/http-common';
import DietPlanCard from './component/DietPlanCard';
import MemberReport from '../reports/member-report/MemberReport';
import { useNavigate } from 'react-router-dom';
import FirstStep from './component/FirstStep';
import SecondStep from './component/SecondStep';
import ThirdStep from './component/ThirdStep';
import { Box } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';

const dietPlanArray = [];
const steps = ['Food Items', 'Diet Plan Suggestions', 'Diet Plan Details'];
const useStyles = makeStyles(() => ({
    dialog: {
        width: 800
    }
}));
function DietPlan() {
    const classes = useStyles();

    const [memberId, setMemberId] = useState();
    const [dietPlanData, setDietPlanData] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [disableSearch, setDisableSearch] = useState(true);
    const [openAddNewDietPlanDialog, setOpenAddNewDietPlanDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState();
    const [mealType, setMealType] = useState('');

    const navigate = useNavigate();

    const handleMemberId = (event) => {
        console.log(event.target.value);
        setDisableSearch(false);
        setMemberId(event.target.value);
    };

    function getDietPlans() {
        const link = '/api/dietPlan/getDietPlanAndMealByUserId/';
        const key = memberId;
        const url = link + key;
        HttpCommon.get(url)
            .then((res) => {
                console.log(res);
                console.log(res.data.data);
                setDietPlanData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSearch = () => {
        setShowButton(true);
        getDietPlans();
    };

    const handleShowProfile = () => {
        // <MemberReport memberid={2} />;
        navigate('/pages/report/memberReport', { state: { memberid: memberId } });
    };

    const handleAddNewDietPlan = () => {
        setOpenAddNewDietPlanDialog(true);
    };

    const handleCloseAddNewDietPlan = () => {
        setOpenAddNewDietPlanDialog(false);
    };

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
                return <FirstStep mealType={mealType} setMealType={setMealType} items={items} setItems={setItems} setAmount={setAmount} />;
            case 1:
                return <SecondStep />;
            case 2:
                return <ThirdStep />;
            default:
                return <></>;
        }
    }

    return (
        <>
            <MainCard title="Diet Plan">
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                        <TextField id="member-id" label="Enter Member ID" variant="outlined" onChange={handleMemberId} />
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Search />}
                            size="large"
                            onClick={handleSearch}
                            disabled={disableSearch}
                        >
                            Search
                        </Button>
                    </Stack>

                    {showButton ? (
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleShowProfile}>
                                Show Profile
                            </Button>
                            <Button variant="outlined" color="secondary" sx={{ background: '#f3e5f5' }} onClick={handleAddNewDietPlan}>
                                Add New Diet Plan
                            </Button>
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Stack>
                <Grid container spacing={2}>
                    {dietPlanData != null ? (
                        dietPlanData.map((row) => (
                            <Grid align="center" item xs={12} sm={12} md={6} lg={6}>
                                <DietPlanCard dietPlanData={row} />
                            </Grid>
                        ))
                    ) : (
                        <></>
                    )}
                </Grid>
            </MainCard>
            <Dialog open={openAddNewDietPlanDialog} onClose={handleCloseAddNewDietPlan} classes={{ paper: classes.dialog }}>
                <DialogTitle>Add New Diet Plan</DialogTitle>
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
                        <div style={{ height: 20 }} />
                        {showStep(activeStep)}
                        {activeStep === steps.length ? (
                            <>
                                <TextField
                                    fullWidth
                                    // value={firstName.concat(' ', lastName)}
                                    label="Name"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField fullWidth /* value={email} */ label="Email" margin="dense" inputProps={{ readOnly: true }} />
                                <TextField
                                    fullWidth
                                    /* value={birthday} */ label="Birthday"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField
                                    fullWidth
                                    /* value={genderValue} */ label="Gender"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField
                                    fullWidth
                                    /* value={contactNo} */ label="Contact No"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField
                                    fullWidth
                                    /* value={street.concat(', ', lane, ', ', city)} */
                                    label="Address"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField
                                    fullWidth
                                    /* value={province} */ label="Province"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <TextField
                                    fullWidth
                                    /* value={branchId} */ label="Branch Id"
                                    margin="dense"
                                    inputProps={{ readOnly: true }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button color="inherit" onClick={handleCloseAddNewDietPlan} sx={{ mr: 1 }}>
                                        Close
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button /* onClick={handleAddNewMemberSubmit} */>Submit</Button>
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
                                    <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DietPlan;
