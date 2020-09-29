import React from 'react';
import "./draft-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";

const Draft = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content>
        <h1>Draft</h1>
      </Content>
    </div>
  )
}

export default Draft;
