import React,{createContext, useState, useContext} from 'react';
import axios from 'axios';
export const DocusignLoginContext = createContext();

const PORT_CONFIG = {
  BACKEND_DEV : 3001
}

const DocusignLoginContextProvider = (props) => {

  const [docuLogin, setDocuLogin] = useState(null);
  const [docuAuth, setDocuAuth] = useState(null);
  const [docuError, setDocuError] = useState(null);

  const checkDocuLogin = (username, password) => {
    let user = JSON.parse(localStorage.getItem("docusign_auth"));
    if(user){
      // Need to verify if the token still valid
      setDocuLogin(true);
      setDocuAuth(user);
      setDocuError(null);
    }else{
      setDocuLogin(false);
    }
  }

  const getAccessCode = (loginCode) =>{
    // const auth = localStorage.getItem("docusign_auth");
    let data = {
      code: loginCode
    }

    axios.post('http://localhost:3001/api/get-docusign-acces-code',
      data)
      .then(function (response) {

        console.log(JSON.stringify(response.data))
        if(response.data.error){
          localStorage.setItem("docusign_auth", null);
          setDocuLogin(false);
          setDocuAuth(null);
          setDocuError(response.data.error);
        }else{
          localStorage.setItem("docusign_auth", JSON.stringify(response.data));
          setDocuLogin(true);
          setDocuAuth(JSON.stringify(response.data));
          setDocuError(null);
          window.location.replace("/")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const docusignLogout = () =>{
    localStorage.removeItem("docusign_auth");
    setDocuLogin(false);
    setDocuAuth(null);
    setDocuError(null);
  }

  return (
    <DocusignLoginContext.Provider value={{docuLogin, docuAuth, checkDocuLogin, getAccessCode}}>
      {props.children}
    </DocusignLoginContext.Provider>
  );
}

export default DocusignLoginContextProvider;
