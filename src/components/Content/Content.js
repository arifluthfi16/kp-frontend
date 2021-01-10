import React, {useEffect, useContext, useState} from 'react';
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
  const {docuContext, docusignLogout, DSLoad} = useContext(DocusignLoginContext);
  const {companyLogout, user} = useContext(LoginContext);

  const logoutAll = () =>{
    companyLogout()
    docusignLogout()
  }

  const docusignLoginAlert = () =>{
    if(DSLoad && !docuContext.login){
      return <Alert type={"warning"}>
        <div className={"align-items-center"}>
          LOADING
        </div>
      </Alert>
    }

    if(docuContext.login){
      return (
        <Alert type={"success"}>
          <div className={"align-items-center"}>Akun Terhubung! <label
            style={
              {
                margin: 0,
                cursor: "pointer",
                textDecoration : "none",
                fontSize : "16px",
                fontWeight : "600",
                color : "#0A62A9"
              }}
            onClick={()=>{logoutAll()}}
          >
            Logout
          </label>

          </div>
        </Alert>
      )
    }else{
      return (
        <Alert type={"default"}>
          <div className={"align-items-center"}>Login Docusign terlebih dahulu! <a href={
            "https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=f7957d60-d674-4874-8984-a7eb55839f3d&redirect_uri=http://localhost:3000/proses-login"
          }
           style={
             {
               margin: 0,
               textDecoration : "none",
               fontSize : "16px",
               fontWeight : "600",
               color : "#0A62A9",
           ...(props.turnoff_login ? {cursor: "default",pointerEvents: "none"} : {
               cursor: "pointer",})
             }}>Login Docusign</a>
          </div>
        </Alert>
      )
    }

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
              name = {user ? user.username : "-"}
              email = {user ? user.email : "-"}
              className={"ml-3"}
            />
          </div>
        </div>
        <BreadcrumbWrapper
          data = {props.crumbList}
        />
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Content;
