import React from 'react'
import { Button, Container, Grow, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

const Home = () => {
    //StyleSheet
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const isSingedIn = user?.result?.name;
    // {/* Website Main Page Here  */}
    return (
        // Grow For Animation
        <Grow in>
            <Container component="main" maxWidth="sm" >
                <Paper elevation={3}>
                    {isSingedIn ? (
                    <Typography variant="h4" align="center" color="primary">
                    You Can See This If You Are Loged In .
                    </Typography>
                    ): (
                    <Typography variant="h4" align="center" color="primary">
                    You Can See This If You Are Not Loged In .
                    </Typography>
                    ) }
                </Paper>


            </Container>
        </Grow>
    )
}

export default Home
