import React, { useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card, Button, Box, Divider, Grid, Stack, Typography, useMediaQuery, CardMedia } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../../authentication/AuthWrapper1';
import AuthCardWrapper from '../../authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import SubCard from 'ui-component/cards/SubCard';
import { makeStyles, withStyles } from '@material-ui/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactToPrint from 'react-to-print';
import MuiTypography from '@material-ui/core/Typography';

import { Store } from 'react-notifications-component';
import 'animate.css/animate.min.css';
import HttpCommon from 'utils/http-common';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';

import { gridSpacing } from 'store/constant';
import EventIcon from '@mui/icons-material/Event';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import MapIcon from '@mui/icons-material/Map';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
// assets

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useStyles = makeStyles((theme) => ({
    card: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        // width: '755px',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
        // '&:before': {
        //     content: '""',
        //     position: 'absolute',
        //     width: '1500px',
        //     height: '610px',
        //     background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
        //     borderRadius: '250%',
        //     top: '-500px',
        //     right: '-350px'
        // }
    },
    page: {
        // width: '100%',
        minHeight: '29.7cm',
        padding: '2cm',
        margin: '1cm auto',
        border: '1px #D3D3D3 solid',
        borderRadius: '5px',
        background: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    },
    mainCard: {
        // backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        // width: '800px',
        // width: '100%',
        // height: '29.7cm',
        // padding: '2cm',
        margin: '0.5cm auto',
        // border: '5px solid #916BD8',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        // borderRadius: '0px!important'
        // '&:after': {
        //     content: '""',
        //     zIndex: 1,
        //     position: 'absolute',
        //     width: '1200px',
        //     height: '1500px',
        //     background: `linear-gradient(210.04deg, ${theme.palette.secondary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        //     // borderRadius: '50%',
        //     top: '-300px',
        //     right: '-250px'
        // },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1500px',
            height: '610px',
            background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
            borderRadius: '250%',
            top: '-500px',
            right: '-350px'
        }
    },
    button: {
        color: theme.palette.white,
        alignItems: 'right',
        marginTop: 20,
        backgroundColor: 'white',
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: 'white'
        }
    }
}));

let theme;

const CustomTypography = withStyles({
    root: {
        color: '#7E7676'
    }
})(MuiTypography);

const Subscription = ({ subData }) => {
    theme = useTheme();
    const classes = useStyles();
    console.log(subData);

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <SubCard
                sx={{
                    color: 'white',
                    minWidth: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 2,
                    marginBottom: 2
                }}
            >
                <Typography
                    color={theme.palette.secondary.main}
                    style={{
                        textShadow: '0px 0px 5px #D0B7FF',
                        textAlign: 'center',
                        marginTop: '20px',
                        marginBottom: '0px'
                    }}
                    gutterBottom
                    variant="h3"
                >
                    {subData.type}
                </Typography>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="10px">
                    {subData.description}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" fontSize="25px" textAlign="center">
                        {subData.amount}
                    </Typography>
                    <Typography variant="h5" fontSize="18px" textAlign="center">
                        &nbsp;LKR
                    </Typography>
                </div>
                <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="20px">
                    per year
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
                    <Button className={classes.button} variant="outlined" color="secondary">
                        Get Start
                    </Button>
                </div>
                <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <DoneIcon style={{ color: 'green', marginTop: '-2px', marginRight: '10px' }} />
                        <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                            This plan can create upto {subData.gymCount} gym brands.
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <DoneIcon style={{ color: 'green', marginTop: '-2px', marginRight: '10px' }} />
                        <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                            This plan can create upto {subData.branchCount} branches in single gym brand.
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {subData.isCalAvailable ? (
                            <>
                                <DoneIcon style={{ color: 'green', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan provide Calorie Calculator for its all users.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <CloseIcon style={{ color: 'red', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan does not provide Calorie Calculator for its users.
                                </Typography>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {subData.isDietAvailable ? (
                            <>
                                <DoneIcon style={{ color: 'green', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan allow trainers to provide Diet Plans for all gym customers.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <CloseIcon style={{ color: 'red', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan does not allow trainers to provide Diet Plans for gym customers.
                                </Typography>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex' }}>
                        {subData.isDietAvailable ? (
                            <>
                                <DoneIcon style={{ color: 'green', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan provide weight prediction feature to all trainers.
                                </Typography>
                            </>
                        ) : (
                            <>
                                <CloseIcon style={{ color: 'red', marginTop: '-2px', marginRight: '10px' }} />
                                <Typography variant="h5" fontSize="14px" textAlign="left" marginBottom="20px">
                                    This plan does not provide weight prediction feature to all trainers.
                                </Typography>
                            </>
                        )}
                    </div>
                </div>
            </SubCard>
        </>
    );
};

//= ===============================|| Payment Success Page ||================================//

const PriceView = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const componentRef = useRef(null);
    const [subTypeData, setSubTypeData] = React.useState([]);
    const [isDataLoading, setDataLoading] = React.useState(true);
    const [display, setDisplay] = React.useState('none');

    // const trainerId = 4;
    // const userId = 1;
    const branchId = 1;

    function getSubData() {
        // let arr = [];
        HttpCommon.get(`/api/subscriptionType/`).then((response) => {
            console.log(response.data.data);
            setSubTypeData(response.data.data);
            setDataLoading(false);
        });
    }

    const handleDisplay = () => {
        setTimeout(() => {
            setDisplay('block');
            setDisplay('none');
            console.log('Done');
        }, 2000);
    };

    useEffect(async () => {
        setDataLoading(true);
        getSubData();
    }, []);

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '800px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <AuthWrapper1>
                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                        <Grid container xs={12} sm={12} md={8} lg={12} style={{ maxWidth: '100%', minWidth: 500 }}>
                            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                <SubCard
                                    className={classes.mainCard}
                                    sx={{
                                        color: 'white',
                                        width: '100%',
                                        minWidth: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Typography
                                        color={theme.palette.secondary.main}
                                        style={{
                                            textShadow: '0px 0px 5px #D0B7FF',
                                            textAlign: 'center',
                                            marginTop: '20px',
                                            marginBottom: '0px'
                                        }}
                                        gutterBottom
                                        variant="h3"
                                    >
                                        Prices
                                    </Typography>
                                    <Typography variant="h5" fontSize="14px" textAlign="center" marginBottom="40px">
                                        NPartFitness
                                    </Typography>
                                    <Grid container justifyContent="center" alignItems="center">
                                        {subTypeData.map((element) => (
                                            <Grid item sm={12} xs={12} md={6} lg={4} spacing={1}>
                                                <Subscription subData={element} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                            <AuthFooter />
                        </Grid>
                    </Grid>
                </AuthWrapper1>
            )}
        </>
    );
};

export default PriceView;
