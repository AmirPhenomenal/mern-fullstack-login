import React from 'react';
import { Container } from '@material-ui/core';
//Routing
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login";
import Home from './components/Home/Home';


const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Login} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;