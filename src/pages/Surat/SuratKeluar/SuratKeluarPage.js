import React from 'react';
import "./surat-keluar-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";

const SuratKeluarPage = () =>{
  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content>
        <h1>Surat Keluar</h1>
      </Content>
    </div>
  )
}

export default SuratKeluarPage;
