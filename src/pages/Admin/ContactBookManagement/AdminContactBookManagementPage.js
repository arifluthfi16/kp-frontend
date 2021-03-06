import React from 'react';
import "./contact-book-management-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";

const AdminContactBookManagementPage = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Contact Book Management"}
      >
        Contact Book Management
      </Content>
    </div>
  )
}

export default AdminContactBookManagementPage;
