import React from 'react';
import "./dashboard-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";

const AdminDashboardPage = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Admin Dashboard"}
      >
      </Content>
    </div>
  )
}

export default AdminDashboardPage;
