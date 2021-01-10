import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { createBrowserHistory } from "history";


export const LoginContext = createContext();


const PORT_CONFIG = {
  BACKEND_DEV : 3001
}

const LoginContextProvider = (props) => {

  const history = createBrowserHistory();

  const [login, setLogin] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState(null);

  const checkLogin = () => {
    // Get user data from local storage
    let user = JSON.parse(localStorage.getItem("auth"));
    if(user){
      // Need to verify if the token still valid
      console.log(user)
      setLogin(true);
      setUser(user);
      setLoginError(null);
    }else{
      setLogin(false);
    }
  }

  const mockLogin = (username, password) => {
    if(username === "admin" && password === "admin"){
      setLogin(true);
      setLoginError(null);
    }
  }

  const companyLogout = () =>{
    localStorage.removeItem("auth");
    resetStateDefault();
  }

  const resetStateDefault = () =>{
    setUser(null)
    setLogin(false)
  }

  const signin = (username, password) => {
    // Type & Error Check
    let data = {
      username,
      password
    }

    // Get login data
    axios.post('http://localhost:3001/api/auth/signin',
      data)
      .then(function (response) {
        if(response.status === 200){
          localStorage.setItem("auth", JSON.stringify(response.data));
          setLogin(true);
          setUser(response.data);
          setLoginError(null);
          console.log("login succeed");
          window.location.replace("/");
        }else{
          console.log("Failed to login something is wrong")
        }
      })
      .catch(function (error) {
        console.log(error)
        console.log("Login Failed");
      });
  }

  return (
    <LoginContext.Provider value={{login,user, checkLogin, mockLogin, signin, companyLogout}}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
