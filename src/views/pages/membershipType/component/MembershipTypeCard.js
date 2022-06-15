import React, { useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Link, Stack, Typography } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';
import { loadStripe } from '@stripe/stripe-js';
import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';
import messages from 'utils/messages';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: '#E9C7FC',
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        boxShadow: theme.shadows[3],
        position: 'relative',
        '&:hover': {
            boxShadow: theme.shadows[8]
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.secondary.dark,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.secondary.dark,
            borderRadius: '50%',
            top: '145px',
            right: '-70px',
            opacity: 0.5
        }
    },
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
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

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const MembershipTypeCard = ({ row, handleEditClick, userType }) => {
    const classes = useStyles();
    console.log(row);
    return (
        <Card className={classes.card}>
            <CardContent justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconFileAnalytics color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Membership Type
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {row !== null ? row.type : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconCalendarEvent color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Description
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {row !== null ? row.description : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconBulb color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Duration
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {row !== null ? row.periodInMonths : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconReceipt2 color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Amount
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {row !== null ? row.amount : 'NotFound'}
                        </Typography>
                    </div>
                    {userType === 'Owner' ? (
                        <AnimateButton>
                            <Button
                                type="button"
                                variant="contained"
                                className={classes.button}
                                onClick={(event) => handleEditClick(event, row)}
                            >
                                Edit
                            </Button>
                        </AnimateButton>
                    ) : (
                        <></>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MembershipTypeCard;
