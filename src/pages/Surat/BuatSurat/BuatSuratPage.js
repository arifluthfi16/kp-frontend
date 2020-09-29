import React from 'react';
import "./buat-surat-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";

const BuatSuratPage = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content>
        <h1>Buat Surat</h1>
      </Content>
    </div>
  )
}

export default BuatSuratPage;
