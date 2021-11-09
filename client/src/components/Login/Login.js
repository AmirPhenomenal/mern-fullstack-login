//React Hooks
import React, { useState } from 'react';

//Design Elements
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import Input from './Input';

//Google Login 
import { GoogleLogin } from 'react-google-login';

//Redux Dispatch ( I HATE REDUX !!! 😭)
import { useDispatch } from 'react-redux';

//React Router For Pushing To Main Route After Login
import { useHistory } from 'react-router-dom';

//Actions
import { signup, signin } from '../../actions/login';

//Icons
import LockIcon from '@material-ui/icons/LockOutlined';
import GoogleIcon from './googleIcon';

//StyleSheet
import useStyles from './styles';

//Form Data Initial Value
const formDataInitVal = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
//Google Client ID
const GOOGLE_CLIENT_ID = "GOOGLE CLIENT ID HERE";

const Login = () => {

    const classes = useStyles();

    //States
    const [formData, setFormData] = useState(formDataInitVal);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);

    const dispatch = useDispatch();
    const history = useHistory();

    //// Handle Actions
    //Form Submit
    const handleSubmit = (e) => {
        //Prevent Page Refresh
        e.preventDefault();
        if (isSignIn) {
            dispatch(signin(formData, history));
        } else {
            dispatch(signup(formData, history));
        }
    }
    //Form Elements Value Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    //Show Password Button
    const handleShowPassword = (e) => {
        setShowPassword((prevPassword) => !prevPassword);
    }
    //Switch Sign In/Up Button
    const switchSignIn = (e) => {
        setIsSignIn((prevState) => !prevState);
    }
    //Google Login Events
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        //For This One We Do Actions Here Instead Of Actions/login.js
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }

    const googleFailure = () => {
        console.log("Google sign in was unsuccessful try again later");
    }


    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper} elevation={3} b>
                    <Avatar className={classes.avatar}> <LockIcon /></Avatar>
                    <Typography variant="h5" color="primary" >
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Only Show If It Wasn't Sign In */}
                            {!isSignIn && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}

                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} half={isSignIn ? false : true} />
                            {/* Only Show If It Wasn't Sign In */}
                            {!isSignIn && (
                                <>
                                    <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" half />
                                </>
                            )}
                        </Grid>
                        <Button className={classes.submit} fullWidth variant="contained" color="primary">
                            {/* Change Text Based On Sign In/Up */}
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </Button>
                        {/* Google Login */}
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick}
                                    disabled={renderProps.disabled} startIcon={<GoogleIcon />} variant="contained" >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Button onClick={switchSignIn}>
                                    {isSignIn ? 'Dont Have An Account ? Sign Up .' : 'Already Have An Account ? Sign In .'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>

        </div>
    )
}

export default Login;


