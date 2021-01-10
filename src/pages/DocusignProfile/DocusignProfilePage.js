import React, {useContext, useEffect, useState} from 'react';
import "./docusign-profile-page.css";
import SideNav from "../../components/SideNav/SideNav";
import Content from "../../components/Content/Content";
import axios from "axios";
import {DocusignLoginContext} from "../../contexts/DocusignLoginContext";
import {LoginContext} from "../../contexts/LoginContext";

const DocusignProfilePage = (props) =>{
  const {docuContext, checkDocuLogin} = useContext(DocusignLoginContext);
  const {user} = useContext(LoginContext)

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
              <td width="50%">Account ID :</td>
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
            <tr>
              <td>Auth Code : </td>
              <td>{docuContext.auth.access_token}</td>
            </tr>
            <tr>
              <td>username : </td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email : </td>
              <td>{user.email} </td>
            </tr>
            <tr>
              <td>User ID : </td>
              <td>{user.id}</td>
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
