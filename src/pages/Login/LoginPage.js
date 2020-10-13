import React, {useContext, useEffect, useState} from 'react';
import "./login-page.css";
// import Logo from "../../src/images/logo-unikom.png";
import Logo from "../../images/logo-unikom.png";
import {LoginContext} from "../../contexts/LoginContext";
import {Button, Input} from "bima-design";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {login, user, checkLogin, signin} = useContext(LoginContext);

  useEffect(()=>{
    // Check if user already logged in
    checkLogin();
    if(login){
      window.location.replace("/");
    }
  }, [login])

  function renderButton(){
    if(loading){
      return(
        <Button
          className={"child login-page-item-size"}
          onClick={()=>{signin(username, password)}}
          disabled
        >Loading</Button>
      )
    }else{
      return(
        <Button
          className={"child login-page-item-size"}
          onClick={()=>{
            signin(username, password)
          }}
        >Login</Button>
      )
    }
  }

  return (
    <div className={"container-login"}>
      <div className={"login-block"}>
        <div className="container-column">
          {/*{login ? <h6>Already Loggedin</h6> : <h6 style={{color:"red"}}>Not Login</h6>}*/}
          <img src={Logo} className={"login-logo"} alt="Logo Unikom"/>

          <Input
            type="text"
            placeholder={"Username"}
            className="input-style"
            onChange={(e)=> setUsername(e.target.value)}
            required
            outline
          />

          <Input
            type="password"
            placeholder={"Password"}
            className="input-style"
            onChange={(e)=> setPassword(e.target.value)}
            required
            outline
          />

          {renderButton()}

          <div className={["row", "justify-center"]} style={{margin: "8px 0px"}}>
            <input type="checkbox"/>
            <label htmlFor="" className={"ml-1"}>Remember Me?</label>
          </div>

          <hr  style={{
            color: '#243E5A',
            backgroundColor: '#243E5A',
            height: .5,
            width : "378px"
          }} className={"mb-2 mt-2"}/>

          <Button
              className={"child login-page-item-size mt-2"}
              kind={"tertiary"}
              icon={<FontAwesomeIcon icon={faGoogle} />}
          >
            Login menggunakan Email UNIKOM
          </Button>
          {/*<Button className={"child"} onClick={checkLoginAndJWT}>Check login and JWT</Button>*/}
          {/*<Button className={"child"} onClick={setLoadState}>Set button to loading</Button>*/}
        </div>
      </div>
    </div>
  )
}



export default LoginPage;
