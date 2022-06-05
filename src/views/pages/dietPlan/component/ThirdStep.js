import { TextField, Button, Box, InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiPhoneNumber from 'material-ui-phone-number';
import { IconFileAnalytics } from '@tabler/icons';
// import { Box } from '@material-ui/core';
import { Avatar } from '@mui/material';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: 'white',
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: theme.shadows[3],
        position: 'relative',
        '&:hover': {
            boxShadow: theme.shadows[8]
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '1500px',
            height: '610px',
            background: `linear-gradient(275.9deg, ${theme.palette.secondary[800]} -50.02%, rgba(145, 107, 216, 0) 180.58%)`,
            borderRadius: '250%',
            top: '-530px',
            right: '-530px'
        }
    },
    mainCard: {
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        width: '21cm',
        margin: '0.5cm auto',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
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
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
    },
    avatarFirst: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '20px',
        marginRight: '10px',
        height: '20px',
        width: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    avatarSecond: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        color: theme.palette.secondary.dark,
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '20px',
        height: '8px',
        width: '8px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: theme.palette.white,
        backgroundColor: theme.palette.secondary.main,
        marginBottom: -10,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }
}));

const ThirdStep = ({ mealType, setMealType, portionType, setPortionType, items, setItems, amount, setAmount }) => {
    const classes = useStyles();
    const handlechange = () => {
        console.log('Hello');
    };
    return (
        <div style={{ paddingLeft: 40, paddingRight: 40 }}>
            <div style={{ height: 20 }} />
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                    <Grid item sm={10} xs={10} md={4} lg={4}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar style={{ marginRight: 40 }} variant="rounded" className={classes.avatarFirst}>
                                <Avatar variant="rounded" className={classes.avatarSecond} />
                            </Avatar>
                            <TextField
                                style={{ marginRight: 40 }}
                                fullWidth
                                id="outlined-basic"
                                label="Food"
                                variant="outlined"
                                value="Carrot"
                            />
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4}>
                        <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" value="250g" />
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} lg={2}>
                        <Typography align="center" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            120 cal
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ height: 40 }} />
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                    <Grid item sm={10} xs={10} md={4} lg={4}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar style={{ marginRight: 40 }} variant="rounded" className={classes.avatarFirst}>
                                <Avatar variant="rounded" className={classes.avatarSecond} />
                            </Avatar>
                            <TextField
                                style={{ marginRight: 40 }}
                                fullWidth
                                id="outlined-basic"
                                label="Food"
                                variant="outlined"
                                value="Carrot"
                            />
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4}>
                        <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" value="250g" />
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} lg={2}>
                        <Typography align="center" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            120 cal
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <div style={{ height: 40 }} />
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <Grid container justifyContent="center" alignItems="center" direction="row" spacing={1}>
                    <Grid item sm={10} xs={10} md={4} lg={4}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar style={{ marginRight: 40 }} variant="rounded" className={classes.avatarFirst}>
                                <Avatar variant="rounded" className={classes.avatarSecond} />
                            </Avatar>
                            <TextField
                                style={{ marginRight: 40 }}
                                fullWidth
                                id="outlined-basic"
                                label="Food"
                                variant="outlined"
                                value="Carrot"
                            />
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={4} lg={4}>
                        <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" value="250g" />
                    </Grid>
                    <Grid item sm={12} xs={12} md={2} lg={2}>
                        <Typography align="center" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            120 cal
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ThirdStep;
