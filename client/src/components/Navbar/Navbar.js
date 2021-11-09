//React Hooks 
import React, { useState, useEffect } from 'react';

//Design Elements
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

//Routing
import { Link,useHistory,useLocation } from 'react-router-dom';
//Redux ...
import { useDispatch } from 'react-redux';

//Decoding The Token To Logout User After Token Expired
import decode from 'jwt-decode';

//Importing Constants
import * as actionType from '../../constants/actionTypes';

//StyleSheet
import useStyles from './styles';

const Navbar = () => {
    //Get User Data From LocalStorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //Dispatch For Redux 
    const dispatch = useDispatch();
    //For Route Changes
    const location =useLocation();
    //Routing
    const history = useHistory();
    //StyleSheet
    const classes = useStyles();
    //Logout Logics
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
    };
    //Checking If User Token Is Expired And Log The User Out (On Route Change)
    useEffect(() => {
        const token = user?.token;
        if (token) {
        const decodedToken = decode(token);
          // *1000 To Convert Second To Milisecond
            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
        //Navbar JSXs
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">WebSite</Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {/* Check If User Is Loged In */}
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                            {/* Show First Letter Of User Name */}
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        {/* User Name */}
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        {/* LogOut Button */}
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;