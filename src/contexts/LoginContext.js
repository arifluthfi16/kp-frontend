import React,{createContext, useState} from 'react';
import axios from 'axios';
export const LoginContext = createContext();

const PORT_CONFIG = {
  BACKEND_DEV : 3000
}

const LoginContextProvider = (props) => {

  const [login, setLogin] = useState(undefined);
  const [jwt, setJWT] = useState("");
  const [error, setError] = useState(undefined);

  const checkLogin = (username, password) => {
    axios.post("/login",
        {
          username,
          password
        }
      ).then((data)=>{
        alert("SUCCEED FETCH LOGIN DATA", data)
    }).catch((err)=>{
      alert("ERROR FAILED FETCH LOGIN", err)
    })
  }

  const mockLogin = (username, password) => {
    if(username === "admin" && password === "admin"){
      setLogin(true);
      setJWT("ASdadasdasd");
      setError(null);
    }
  }

  return (
    <LoginContext.Provider value={{login, jwt, checkLogin, mockLogin}}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginContextProvider;
