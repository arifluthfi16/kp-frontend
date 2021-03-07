import React from 'react';
import "./user-management-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";

const AdminUserManagementPage = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"User Management"}
      >
        User Management
      </Content>
    </div>
  )
}

export default AdminUserManagementPage;
