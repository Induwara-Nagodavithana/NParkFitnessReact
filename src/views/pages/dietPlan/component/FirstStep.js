import React, { useState } from 'react';
import { Button, TextField, Stack, Grid, Box, Select, Autocomplete } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
// import Chip from './Chip';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Label } from '@material-ui/icons';
import { Chip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const FirstStep = ({ mealType, setMealType, items, setItems, setAmount }) => {
    const [foodItem, setFoodItem] = useState();
    // const [items, setItems] = useState([]);
    // const [amount, SetAmount] = useState();

    const handleDelete = (chipToDelete) => {
        setItems((items) => items.filter((chip) => chip.foodItem !== chipToDelete));
    };

    const handleAdd = () => {
        if (foodItem !== undefined && foodItem !== '') {
            const arr = items;
            arr.push({ foodItem });
            setItems(arr);
            // setItems([
            //     ...items,
            //     {
            //         foodItem
            //     }
            // ]);

            setFoodItem('');
        }
    };

    const handleMealType = (event) => {
        setMealType(event.target.value);
    };

    const handleFoodItem = (event) => {
        setFoodItem(event.target.value);
    };

    const handleAmount = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div>
            <div style={{ hight: 10 }} />
            <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                    <div>Meal Type :</div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="meal-type-label" />
                            <Select
                                labelId="meal-type-label"
                                id="meal-type-select"
                                value={mealType}
                                label="Meal Type"
                                onChange={handleMealType}
                            >
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <div>Calorie Amount for the Meal :</div>
                    <TextField id="calories" label="Amount" variant="outlined" onChange={handleAmount} />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField id="food" label="Food Item" value={foodItem} variant="outlined" onChange={handleFoodItem} />
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        size="large"
                        onClick={handleAdd}
                        // disabled={disableSearch}
                    >
                        Add
                    </Button>
                </Stack>
                <Grid container spacing={2}>
                    {items.length > 0 ? (
                        <Stack direction="row" spacing={1}>
                            {/* <Chip label={data} color="primary" size="small" onDelete={handleDelete} /> */}
                            {items.map((item) => (
                                <Chip key={item.foodItem} label={item.foodItem} onDelete={() => handleDelete(item.foodItem)} />
                            ))}
                        </Stack>
                    ) : (
                        <></>
                    )}
                </Grid>
            </Stack>
        </div>
    );
};

export default FirstStep;
