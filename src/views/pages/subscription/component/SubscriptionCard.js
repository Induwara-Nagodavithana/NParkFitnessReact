import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Link, Stack, Typography } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

import { IconFileAnalytics, IconCalendarEvent, IconBulb, IconReceipt2 } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        paddingTop: '20px',
        background: theme.palette.warning.main,
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
            borderColor: theme.palette.warning.dark,
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
            borderColor: theme.palette.warning.dark,
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

const SubscriptionCard = (subscriptionData) => {
    const classes = useStyles();
    let status;
    if (subscriptionData.subscriptionData.isActive) {
        status = 'Active';
    } else {
        status = 'InsActive';
    }
    return (
        <Card className={classes.card}>
            <CardContent justifyContent="center" alignItems="center">
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconFileAnalytics color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Subscription
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.subscriptionType.type : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                        <IconCalendarEvent color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Expire Date
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.expireDate : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconBulb color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Status
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? status : 'NotFound'}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px' }}>
                        <IconReceipt2 color="black" />
                        <div style={{ width: '20px' }} />
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                            Amount
                        </Typography>
                        <Typography align="left" variant="subtitle1" style={{ maxWidth: '100px', minWidth: '110px' }}>
                            {subscriptionData !== null ? subscriptionData.subscriptionData.subscriptionType.amount : 'NotFound'}
                        </Typography>
                    </div>
                    <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
                        <div style={{ display: 'none' }}>
                            <input type="hidden" name="merchant_id" value="1217402" />
                            <input type="hidden" name="return_url" value="http://localhost:3000/pages/subscription" />
                            <input type="hidden" name="cancel_url" value="http://localhost:3000/pages/subscription" />
                            <input type="hidden" name="notify_url" value="https://npark-fitness-test.herokuapp.com/payhere/notify" />
                            <br />
                            <br />
                            Item Details
                            <br />
                            <input type="hidden" name="order_id" value="65321" />
                            <input type="hidden" name="items" value="NParkFitness Monthly Subscription Payment" />
                            <br />
                            <input type="hidden" name="currency" value="LKR" />
                            <input type="hidden" name="amount" value={subscriptionData.subscriptionData.subscriptionType.amount} />
                            <br />
                            <br />
                            Customer Details
                            <br />
                            <input type="hidden" name="first_name" value={subscriptionData.subscriptionData.user.firstName} />
                            <input type="hidden" name="last_name" value={subscriptionData.subscriptionData.user.lastName} />
                            <br />
                            <input type="hidden" name="email" value="" />
                            <input type="hidden" name="phone" value="" />
                            <br />
                            <input type="hidden" name="address" value="{JSON.stringify(props.centers)}" />
                            <input type="hidden" name="city" value="" />
                            <input type="hidden" name="country" value="" />
                            <input type="hidden" name="custom_1" value={subscriptionData.subscriptionData.userId} />
                            <br />
                            <br />
                            {/* <input type="submit" value="Buy Now" /> */}
                        </div>
                        {subscriptionData.subscriptionData.subscriptionType.amount < 1 ||
                        subscriptionData.subscriptionData.subscriptionType.amount == null ? (
                            <></>
                        ) : (
                            <AnimateButton>
                                <Button type="submit" variant="contained" className={classes.button}>
                                    Pay
                                </Button>
                            </AnimateButton>
                            // <ButtonMaterial type="submit" variant="contained" className={classes.buttonMaterial2}>
                            //     Payment
                            // </ButtonMaterial>
                        )}
                    </form>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SubscriptionCard;
