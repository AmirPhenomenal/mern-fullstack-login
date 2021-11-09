import React from 'react'
import { Button, Container, Grow, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

const Home = () => {
    //StyleSheet
    const classes = useStyles();

    return (
        // Grow For Animation
        <Grow in>
            <Container component="main" maxWidth="sm"  >
                {/* Website Main Page Here  */}
                <Paper elevation={3}>
                    <Typography variant="h2" align="center" color="primary">
                    Main WebSite Page 
                    </Typography>
                </Paper>


            </Container>
        </Grow>
    )
}

export default Home
