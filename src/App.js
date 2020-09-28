import React, {useEffect, useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginContextProvider from "./contexts/LoginContext";
import axios from 'axios';


function checkLoginStatus(){
  // Get stored JWT

  // Get Current login

  // Set user
}

const App = () => {

  useEffect(()=>{
    checkLoginStatus()
  });

  return (
    <div>
      <LoginContextProvider>
        <Router>
          <Switch>
            <Route exact path={"/"} component={DashboardPage}/>
            <Route exact path={"/login"} component={LoginPage}/>
          </Switch>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
