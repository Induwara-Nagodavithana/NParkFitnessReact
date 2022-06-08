import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/icons/social-google.svg';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import HttpCommon from 'utils/http-common';
import { Store } from 'react-notifications-component';
import { SET_TOKEN, SET_FONT_FAMILY } from 'store/actions'; // THEME_RTL

import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';
// ============================|| FIREBASE - LOGIN ||============================ //

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);
    const [isDataLoading, setDataLoading] = React.useState(false);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const googleHandler = async () => {
        console.error('Login');
    };

    const [showPassword, setShowPassword] = useState(false);
    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };

    function navigateDashboard(type) {
        switch (type) {
            case 'Admin':
                navigate('/pages/dashboard/admin');
                break;
            case 'Owner':
                navigate('/pages/dashboard/owner');
                break;
            case 'Manager':
                navigate('/pages/dashboard/manager');
                break;
            case 'Trainer':
                navigate('/pages/dashboard/trainer');
                break;
            default:
                messages.addMessage({ title: 'Error Occured!', msg: `${type} type clients cannot enter this system. `, type: 'danger' });

                break;
        }
    }

    const onSubmitHandler = (event) => {
        setDataLoading(true);
        event.preventDefault();
        let fireUID = '';
        const userInput = {
            email
        };
        const auth = getAuth(app);
        console.log('email');
        console.log(email);
        console.log('password');
        console.log(password);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // const user = userCredential.user;
                console.log(userCredential.user);
                fireUID = userCredential.user.uid;
                console.log(userCredential.user.accessToken);
                dispatch({ type: SET_TOKEN, token: userCredential.user.accessToken });
                localStorage.setItem('token', userCredential.user.accessToken);
                userInput.fireUID = fireUID;
                HttpCommon.post('/auth/validateUserByFireUIDAndEmail', userInput).then(async (response) => {
                    console.log(response);
                    setDataLoading(false);
                    if (response.data.success) {
                        // localStorage.setItem('type', response.data.data.type);
                        // localStorage.setItem('userID', response.data.data.id);
                        await Promise.all([
                            localStorage.setItem('type', response.data.data.type),
                            localStorage.setItem('userID', response.data.data.id)
                        ]);
                        navigateDashboard(response.data.data.type);
                        // navigate('/pages/dashboard/admin');
                    } else {
                        messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                    }
                });
            })
            .catch((error) => {
                setDataLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                messages.addMessage({ title: 'Error Occured!', msg: errorMessage, type: 'danger' });
            });
        // setTimeout(async () => {
        //     userInput.fireUID = fireUID;
        //     HttpCommon.post('/auth/validateUserByFireUIDAndEmail',userInput).then(async (response) => {
        //         console.log(response);
        //        if (response.data.success) {
        //         navigate('/dashboard/admin');
        //        } else {

        //        }
        //     });
        //     // const response = await fetch('http://localhost:3005/auth/validateUserByFireUIDAndEmail', {
        //     //     method: 'POST',
        //     //     body: JSON.stringify(userInput),
        //     //     headers: {
        //     //         'Content-Type': 'application/json'
        //     //     }
        //     // });
        //     // const data = await response.json();
        //     // console.log(data);
        //     // navigate('/dashboard/admin');
        //     // console.log(userInput);
        // }, 5000);

        // setEmail('');
        // setPassword('');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== '') {
            dispatch({ type: SET_TOKEN, token });
            setDataLoading(true);

            HttpCommon.post('/api/user/validateUserByJWT')
                .then(async (response) => {
                    console.log(response);
                    setDataLoading(false);
                    if (response.data.success) {
                        localStorage.setItem('type', response.data.data.type);
                        localStorage.setItem('userID', response.data.data.id);
                        navigateDashboard(response.data.data.type);
                        // navigate('/pages/dashboard/admin');
                    } else {
                        localStorage.clear();
                        window.location.reload();
                        messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                    }
                })
                .catch((err) => {
                    setDataLoading(false);
                    localStorage.clear();
                    window.location.reload();
                    messages.addMessage({ title: 'Error Occured!', msg: 'Entered User Cannot Find In Server', type: 'danger' });
                });
        }
    }, []);

    return (
        <>
            {isDataLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    <div>
                        <Grid container direction="column" justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        onClick={googleHandler}
                                        size="large"
                                        variant="outlined"
                                        sx={{
                                            color: 'grey.700',
                                            backgroundColor: theme.palette.grey[50],
                                            borderColor: theme.palette.grey[100]
                                        }}
                                    >
                                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                            <img
                                                src={Google}
                                                alt="google"
                                                width={16}
                                                height={16}
                                                style={{ marginRight: matchDownSM ? 8 : 16 }}
                                            />
                                        </Box>
                                        Login in with Google
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex'
                                    }}
                                >
                                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            cursor: 'unset',
                                            m: 2,
                                            py: 0.5,
                                            px: 7,
                                            borderColor: `${theme.palette.grey[100]} !important`,
                                            color: `${theme.palette.grey[900]}!important`,
                                            fontWeight: 500,
                                            borderRadius: `${customization.borderRadius}px`
                                        }}
                                        disableRipple
                                        disabled
                                    >
                                        OR
                                    </Button>

                                    <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                                </Box>
                            </Grid>
                            <Grid item xs={12} container alignItems="center" justifyContent="center">
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1">Log in with Email address</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <form noValidate onSubmit={onSubmitHandler}>
                            <FormControl fullWidth sx={{ ...theme.typography.customInput, mb: 2 }}>
                                <TextField
                                    id="outlined-adornment-email-login"
                                    type="email"
                                    value={email}
                                    label="Email Address / Username"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        setEmail(event.target.value);
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel>Confirm Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    label="Confirm Password"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        setPassword(event.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={showPasswordHandler}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    Forgot Password?
                                </Typography>
                            </Stack>

                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                                        Log in
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default FirebaseLogin;
