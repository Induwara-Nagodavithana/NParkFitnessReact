import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DietPlanSuggestionCard from './DietPlanSuggestionCard';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const SecondStep = ({ mealType, setMealType, portionType, setPortionType, items, setItems, amount, setAmount }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [finalFoodData, setFinalFoodData] = useState([]);

    console.log(mealType);
    console.log(items);
    console.log(amount);
    const searchText = [...items];
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

    const calorieInstance = axios.create({
        baseURL: 'https://api.calorieninjas.com/v1',
        timeout: 10000,
        headers: { 'X-Api-Key': '6RwQbquEzm9YBP6n/M5AVA==Nv6Oh56eUK2Oc1lv' }
    });

    async function findCalorie(search, type) {
        console.log(search);
        const temp = [];
        let foodText = '';
        await Promise.all(
            search.map((element) => {
                if (element.foodItem !== undefined) {
                    foodText = foodText.concat(element.foodItem, ', ');
                } else {
                    foodText = foodText.concat(element.amount, ' g ', element.name, ', ');
                }
                return 0;
            })
        );
        console.log(foodText);

        calorieInstance.get(`/nutrition?query=${foodText}`).then(async (response) => {
            console.log(response.data);
            if (response.data.items.length < 1) {
                Store.addNotification({
                    title: 'Error Occured!',
                    message: 'Enter Foods Cannot Find',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    },
                    width: 500
                });
                setIsLoading(false);
            } else {
                await Promise.all(
                    response.data.items.map((element) => {
                        temp.push({
                            name: element.name,
                            amount: element.serving_size_g,
                            calorie: element.calories
                        });
                        return 0;
                    })
                );
                if (type === 'final') {
                    setFinalFoodData(temp);
                    console.log('Final');
                    console.log(temp);
                } else {
                    setFoodData(temp);
                }
                setIsLoading(false);
            }
            return temp;
        });
    }

    async function createDietSuggestion(foods) {
        console.log(amount);
        console.log(foods.length);
        const tempFoodData = [];
        const avgFoodCalorie = Math.round(amount / foods.length);
        let portionPointer = 1;
        let result = '';

        // let foodText = '';
        await Promise.all(
            foods.map(async (element, index) => {
                if (index < items.length) {
                    result = items[index].portionType;
                }
                console.log(result);
                if (result === 'Low') {
                    portionPointer = 0.3;
                } else if (result === 'Medium') {
                    portionPointer = 0.6;
                }
                console.log('result2');

                const foodAmount = Math.round((100 / element.calorie) * avgFoodCalorie * portionPointer);
                console.log(avgFoodCalorie);
                console.log(foodAmount);
                const data = {
                    name: element.name,
                    amount: foodAmount < 30 ? 40 : foodAmount
                };
                tempFoodData.push(data);
                // foodText = foodText.concat(data.amount, 'g ', data.name, ' ');
                return 0;
            })
        );
        findCalorie(tempFoodData, 'final');
        setFinalFoodData(tempFoodData);
    }

    async function analizeDietData() {
        setIsLoading(true);
        findCalorie(searchText, 'temp');
    }

    useEffect(async () => {
        analizeDietData();
    }, [items]);

    useEffect(async () => {
        createDietSuggestion(foodData);
    }, [foodData]);

    const hansleSelect = () => {
        console.log('Hello');
    };

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '500px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    <div>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <div style={{ hight: 10 }} />
                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}
        </>
    );
};

export default SecondStep;
