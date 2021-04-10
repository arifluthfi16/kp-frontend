import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {LoginContext} from "./LoginContext";
import Swal from "sweetalert2";
import {useHistory} from "react-router-dom";
export const DocusignLoginContext = createContext();

const DocusignLoginContextProvider = (props) => {
  const history = useHistory();

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

  const checkEmailLink = async (access_token) =>{
    // Fetch Docusign Email
    let url ="http://localhost:3001/api/get-profile";
    let data = {
      access_token
    }

    let finalResult = await axios({
      url : url,
      method : "post",
      data : data
    }).then(async (response)=>{
      let docuEmail = response.data.email;
      let user = await JSON.parse(localStorage.getItem("auth"));
      let emailUser = user.email;

      console.log(`${docuEmail} === ${emailUser} = ${docuEmail === emailUser}`)
      if(docuEmail === emailUser){
        console.log("Account Link established")
        return true
      }
    }).catch((error)=>{
      console.log("Failed To Validate Account Link")
      console.log(error)
      return false
    })

    return finalResult
  }

  const getAccessCode = (loginCode) =>{
    // const auth = localStorage.getItem("docusign_auth");
    let data = {
      code: loginCode
    }

    console.log("GETTING DOCUSIGN ACCESS CODE")

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
          checkEmailLink(response.data.access_token).then((res)=>{
            if(res){
              console.log("Account link is true, redirecting")
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
            }else{
              console.log("Account link is false, logout")
              docusignLogout()
            }
          })
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
          Swal.fire({
            title: 'Login kembali',
            text: "Masa login anda sudah habis mohon lakukan login kembali!",
            icon: 'danger',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Login'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await docusignLogout();
              window.location.replace("/login")
            }
          })
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
        console.error(error);
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
