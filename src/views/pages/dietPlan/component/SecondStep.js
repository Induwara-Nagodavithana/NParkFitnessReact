import React, { useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DietPlanSuggestionCard from './DietPlanSuggestionCard';

const SecondStep = ({ items, setItems, amount, setAmount }) => {
    const data = {
        name: '1',
        type: 'breakfast'
    };

    const hansleSelect = () => {
        console.log('Hello');
    };

    return (
        <div>
            <div style={{ hight: 10 }} />
            <DietPlanSuggestionCard dietPlanSuggestionData={data} />
        </div>
    );
};

export default SecondStep;
