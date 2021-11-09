//React 
import React from "react";
import ReactDOM from "react-dom";
//REDUXXXXXXXXXXX 
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//Redux Middleware
import thunk from "redux-thunk";
//Assets And Components
import App from "./App";
import "./style.css";
//Reducers
import reducers from "./reducers";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
