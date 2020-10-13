import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
export const DocusignProfileContext = createContext();

const DocusignProfileContextProvider = (props) => {

  const [docuContext, setDocuContext] = useState({
    login: false,
    auth: null,
    profile : null,
    error: {
      status : false,
      message : null
    }
  })

  useEffect(()=>{
    console.log("Docusign Context Called")
  }, [])

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

  const getUserProfile = (access_code) => {
    let data = {
      access_code
    }

    axios.post('localhost:3001/api/get-profile',data)
      .then(function (response) {
        if(response.data.error){
          setDocuContext((prevState => {

          }));
        }else{
          localStorage.setItem("docusign_auth", JSON.stringify(response.data));
          setDocuContext({
            login: true,
            auth: JSON.stringify(response.data),
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

  return (
    <DocusignProfileContextProvider.Provider value={{docuContext, checkDocuLogin, getAccessCode, docusignLogout}}>
      {props.children}
    </DocusignProfileContextProvider.Provider>
  );
}

export default DocusignProfileContextProvider;
