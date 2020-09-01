import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "../Login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={"/"}>
        </Route>
        <Route exact path={"/login"}>
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
