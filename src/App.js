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
import SuratMasukPage from "./pages/Surat/SuratMasuk/SuratMasukPage";
import LoginContextProvider from "./contexts/LoginContext";
import axios from 'axios';
import BuatSuratPage from "./pages/Surat/BuatSurat/BuatSuratPage";
import SuratKeluarPage from "./pages/Surat/SuratKeluar/SuratKeluarPage";
import Draft from "./pages/Surat/Draft/DraftPage";


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
            <Route exact path={"/login"} component={LoginPage}/>
            <Route exact path={"/"} component={DashboardPage}/>
            <Route exact path={"/surat-masuk"} component={SuratMasukPage}/>
            <Route exact path={"/buat-surat"} component={BuatSuratPage}/>
            <Route exact path={"/surat-keluar"} component={SuratKeluarPage}/>
            <Route exact path={"/draft"} component={Draft}/>
          </Switch>
        </Router>
      </LoginContextProvider>
    </div>
  );
}

export default App;
