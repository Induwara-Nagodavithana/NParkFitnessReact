import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DietPlanSuggestionCard from './DietPlanSuggestionCard';
import { Grid } from '@mui/material';

const SecondStep = ({ items, setItems, amount, setAmount }) => {
    const data = [
        {
            food: 'Carrot',
            amount: '10',
            calAmount: '153'
        },
        {
            food: 'Tomato',
            amount: '20',
            calAmount: '421'
        },
        {
            food: 'Apple',
            amount: '35',
            calAmount: '120'
        }
    ];

    const hansleSelect = () => {
        console.log('Hello');
    };

    return (
        <div>
            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <div style={{ hight: 10 }} />
                <Grid item sm={12} xs={12} md={6} lg={4}>
                    <DietPlanSuggestionCard dietPlanSuggestionData={data} />
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4}>
                    <DietPlanSuggestionCard dietPlanSuggestionData={data} />
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4}>
                    <DietPlanSuggestionCard dietPlanSuggestionData={data} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SecondStep;
