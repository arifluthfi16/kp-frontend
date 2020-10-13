import React, {useContext, useEffect, useState} from 'react';
import "./docusign-profile-page.css";
import SideNav from "../../components/SideNav/SideNav";
import Content from "../../components/Content/Content";
import axios from "axios";
import {DocusignLoginContext} from "../../contexts/DocusignLoginContext";

const DocusignProfilePage = (props) =>{
  const {docuContext, checkDocuLogin} = useContext(DocusignLoginContext);

  useEffect(()=>{
    checkDocuLogin();
  }, [docuContext.login]);

  const conditionallyPrintProfileData = () =>{
    let profileData = docuContext.profile;
    if(profileData){
      return (
        <div>
          <h3>Profile Data</h3>
          <table>
            <tr>
              <td>Account ID :</td>
              <td>{profileData.accounts[0].account_id}</td>
            </tr>
            <tr>
              <td>Fullname :</td>
              <td>{profileData.name}</td>
            </tr>
            <tr>
              <td>Email :</td>
              <td>{profileData.email}</td>
            </tr>
          </table>
        </div>
      )
    }
    return (
      <h3>Profile is not loaded</h3>
    )
  }

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content>
        {conditionallyPrintProfileData()}
      </Content>
    </div>
  )
}

export default DocusignProfilePage;
