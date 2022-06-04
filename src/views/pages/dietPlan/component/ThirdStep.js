import { TextField, Button, Box, InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import MuiPhoneNumber from 'material-ui-phone-number';
import { IconFileAnalytics } from '@tabler/icons';
// import { Box } from '@material-ui/core';

const ThirdStep = ({ contactNo, street, lane, city, province, setContactNo, setStreet, setLane, setCity, setProvince }) => {
    const handlechange = () => {
        console.log('Hello');
    };
    return (
        <div>
            <div style={{ hight: 100 }} />
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'left', margin: '5px' }}>
                    <IconFileAnalytics color="black" />
                    <div style={{ width: '20px' }} />
                    <Typography align="left" variant="subtitle1" style={{ maxWidth: '150px', minWidth: '150px' }}>
                        Carrot :
                    </Typography>
                    <TextField id="outlined-basic" label="Amount" variant="outlined" value="250g" />
                </div>
            </Grid>
        </div>
    );
};

export default ThirdStep;
