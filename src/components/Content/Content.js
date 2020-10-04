import React, {useEffect, useContext} from 'react';
import "./content.css";
import "./react-tabs.css";
import UserProfileBadge from "../UserProfileBadge/UserProfileBadge";
import BreadcrumbWrapper from "../BreadcrumbWrapper/BreadcrumbWrapper";
import Warning from "../Notification/Warning/Warning";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TableContent from "../TableContent/TableContent";
import { Button, Input,Alert, Link} from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faSearch, faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {DocusignLoginContext} from "../../contexts/DocusignLoginContext";
import {LoginContext} from "../../contexts/LoginContext";

const Content = (props)=>{

  const {docuLogin, docuAuth, checkDocuLogin} = useContext(DocusignLoginContext);
  const {login, auth} = useContext(LoginContext);

  useEffect(()=>{
    checkDocuLogin()
  }, [docuLogin])

  const docusignLoginAlert = (props) =>{
    if(docuLogin){
      return (
        <Alert type={"success"}>
          <div className={"align-items-center"}>Docusign Terhubung! <label
            style={
              {
                margin: 0,
                cursor: "pointer",
                textDecoration : "none",
                fontSize : "16px",
                fontWeight : "600",
                color : "#0A62A9"
              }}

          >
            Logout Docusign
          </label>

          </div>
        </Alert>
      )
    }
    return (
      <Alert type={"default"}>
        <div className={"align-items-center"}>Login Docusign terlebih dahulu! <a href={
          "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=f7957d60-d674-4874-8984-a7eb55839f3d&redirect_uri=http://localhost:3000/proses-login"
        }
         style={
           {
             margin: 0,
             cursor: "pointer",
             textDecoration : "none",
             fontSize : "16px",
             fontWeight : "600",
             color : "#0A62A9"
           }}>Login Docusign</a>
        </div>
      </Alert>
    )
  }

  return(
    <div className={"content-body-container"}>
      <div className="inner-wrapper">
        <div className="content-header">
          <div className="header-title">
            {props.header_title}
          </div>
          <div className="row">
            {docusignLoginAlert()}
            <UserProfileBadge
              profile_picture = "../../images/sample.png"
              name = "Stella Jang"
              email = "stella@gmail.com"
            />
          </div>
        </div>
        <BreadcrumbWrapper />
        {/*<Alert className={"mr-3 ml-3 mt-2"} closable title="Notification Title">*/}
        {/*  <p>This is subtitle text goes here</p>*/}
        {/*  <Link href="/">Lear More</Link>*/}
        {/*</Alert>*/}
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Content;
