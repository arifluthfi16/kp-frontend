import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SuratMasukPage from "./pages/Surat/SuratMasuk/SuratMasukPage";
import axios from 'axios';
import BuatSuratPage from "./pages/Surat/BuatSurat/BuatSuratPage";
import SuratKeluarPage from "./pages/Surat/SuratKeluar/SuratKeluarPage";
import Draft from "./pages/Surat/Draft/DraftPage";
import ProcessDocusignCode from "./pages/ProcessDocusignCode/ProcessDocusignCode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { createBrowserHistory } from "history";

// Context and Providers
import {LoginContext} from "./contexts/LoginContext";

const App = () => {
  const history = createBrowserHistory();
  const {login, checkLogin} = useContext(LoginContext);
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path={"/login"} component={LoginPage}/>
          <ProtectedRoute exact path={"/"} component={DashboardPage}/>
          <ProtectedRoute exact path={"/surat-masuk"} component={SuratMasukPage}/>
          <ProtectedRoute exact path={"/buat-surat"} component={BuatSuratPage}/>
          <ProtectedRoute exact path={"/surat-keluar"} component={SuratKeluarPage}/>
          <ProtectedRoute exact path={"/draft"} component={Draft}/>
          <ProtectedRoute exact path={"/proses-login"} component={ProcessDocusignCode}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
