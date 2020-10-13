import React from 'react';
import "./buat-surat-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const BuatSuratPage = () =>{
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content header_title={"Kirim Surat"}>
        <div className="buat-surat-wrapper">
          <div className="row pt-3 pb-3 ml-3">
            <p style={{fontSize: "24px"}}>Pilih Metode Pengiriman Surat</p>
          </div>
          <div className="row justify-center pt-3 pb-3">
            <Link to={"/buat-surat/upload"} style={{textDecoration : "none"}}>
              <div className="card" style={{backgroundColor : "#0A62A9"}}>
                <div className="card-title">
                  Buat Surat Baru
                </div>
              </div>
            </Link>
            <Link to={"/buat-surat/upload-surat"} style={{textDecoration : "none"}}>
              <div className="card" style={{backgroundColor : "#E0AE24"}}>
                <div className="card-title">
                  Upload File Surat
                </div>
              </div>
            </Link>
            <Link to={"/buat-surat/template"} style={{textDecoration : "none"}}>
              <div className="card" style={{backgroundColor : "#05B3AF"}}>
                <div className="card-title">
                  Gunakan Template
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default BuatSuratPage;
