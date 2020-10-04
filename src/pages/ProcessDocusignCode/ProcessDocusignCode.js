import React, {useState, useEffect, useContext} from "react";
import "./process-docusign-code.css";
import SideNav from "../../components/SideNav/SideNav";
import Content from "../../components/Content/Content";
import qs from "qs";
import axios from "axios";
import {DocusignLoginContext} from "../../contexts/DocusignLoginContext";


const ProcessDocusignCode = (props) =>{
  const {docuAuth, docuLogin, getAccessCode} = useContext(DocusignLoginContext);

  // Get URL value
  let url = props.location.search;
  let loginCode = qs.parse(url, {ignoreQueryPrefix : true}).code;

  useEffect(()=>{
    getAccessCode(loginCode);
  }, [docuLogin])

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Proses Login"}
      >
        <div className="proses-login-wrapper">
          <h2>Please Wait</h2>
        </div>
      </Content>
    </div>
  )
}

export default ProcessDocusignCode;
