import React from 'react';
import "./dashboard-page.css";
import SideNav from "../../components/SideNav/SideNav";
import Content from "../../components/Content/Content";

const DashboardPage = () =>{
  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content>
        <h1>Dashboard Page</h1>
      </Content>
    </div>
  )
}

export default DashboardPage;
