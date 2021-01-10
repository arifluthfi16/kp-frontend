import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
export const DocusignLoginContext = createContext();

const DocusignLoginContextProvider = (props) => {

  const [docuContext, setDocuContext] = useState({
    login: false,
    auth: null,
    profile : null,
    error: {
      status : false,
      message : null
    }
  })

  const [DSLoad, setDSLoad] = useState(()=>{
    if(docuContext.login){
      return false
    }
    return true
  });

  const resetStateDefault = () =>{
    setDocuContext(
      {
        login: false,
        auth: null,
        profile : null,
        error: {
          status : false,
          message : null
        }
      }
    )
  }

  const getRefreshToken = () => {

  }

  const getAccessCode = (loginCode) =>{
    // const auth = localStorage.getItem("docusign_auth");
    let data = {
      code: loginCode
    }

    console.log("RUN GET ACCESS CODE")

    axios.post('http://localhost:3001/api/get-docusign-acces-code',
      data)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        if(response.data.error){
          localStorage.setItem("docusign_auth", null);
          setDocuContext({
            login: false,
            auth: null,
            profile: null,
            error: {
              status : true,
              message : response.data.error
            }
          });
        }else{
          localStorage.setItem("docusign_auth", JSON.stringify(response.data));
          setDocuContext({
            login: true,
            auth: response.data,
            profile : null,
            error: {
              status : false,
              message : null
            }
          });
          window.location.replace("/")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fetchDSProfile = () =>{
    let url ="http://localhost:3001/api/get-profile";
    let data = {
      access_token : docuContext.auth.access_token
    }

    axios({
      url : url,
      method : "post",
      data : data
    }).then((response)=>{
      setDocuContext((prevState)=> ({
        ...prevState,
        profile: response.data,
      }));
    }).catch((error)=>{
      setDocuContext((prevState)=> ({
        ...prevState,
        profile: null,
      }));
      console.log("FAILED TO FETCH PROFILE")
      console.log(error)
    })
  }

  const docusignLogout = () =>{
    localStorage.removeItem("docusign_auth");
    resetStateDefault();
    setDSLoad(false);
    window.location.replace("/")
  }

  const checkDocuLogin = async () =>{
    setDSLoad(true);
    // console.log("CHECK DOCU LOGIN CALLED",new Date().getTime())

    let user = JSON.parse(localStorage.getItem("docusign_auth"));
    // Check if user login exists
    if(user){
      // Now check the access_token
      // Check if the token still active by getting profile
      let getProfileURL ="http://localhost:3001/api/get-profile";
      // Using awaits
      try{
        let response = await axios({
          url : getProfileURL,
          method : "post",
          data : {
            access_token : user.access_token
          }
        });

        // Failed to fetch profile EXPIRE or wrong access token
        if(response.data.error){
          // Try to renew token
          console.log("Should renew token")
        }else{
          setDocuContext((prevState)=> ({
            ...prevState,
            login: true,
            auth: user,
            profile: response.data,
          }));
        }
        setDSLoad(false);

      }catch(error){
        console.log("LOCAL SERVER ERROR")
        resetStateDefault();
        setDSLoad(false)
      }
    }else{
      resetStateDefault();
      setDSLoad(false)
    }
  }

  const renewToken = async (refresh_token) =>{
    let renewTokenURL = "http://localhost:3001/api/renew-docusign-access-token";

    try{
      let response = await axios({
        url : renewTokenURL,
        method : "post",
        data : {
          refresh_token : refresh_token
        }
      });
      localStorage.setItem("docusign_auth", JSON.stringify(response.data));
      setDocuContext({
        login: true,
        auth: response.data,
        profile : null,
        error: {
          status : false,
          message : null
        }
      });
    }catch(error){
      console.log(error)
    }
  }

  return (
      <DocusignLoginContext.Provider value={{docuContext,DSLoad, checkDocuLogin, getAccessCode, docusignLogout, fetchDSProfile, setDSLoad}}>
      {props.children}
    </DocusignLoginContext.Provider>
  );
}

export default DocusignLoginContextProvider;
