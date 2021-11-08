//Libraries
import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
//Assets
import GoogleIcon from './googleIcon';
import LockIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

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

    //Handle Actions

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
    const googleSuccess = (e) => {

    }

    const googleFailure = (e) => {

    }


    return (
        <div>
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper} elevation={3} b>
                    <Avatar className={classes.avatar}> <LockIcon /></Avatar>
                    <Typography variant="h5" color="primary" >
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </Typography>
                    <form className={classes.form}>
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


