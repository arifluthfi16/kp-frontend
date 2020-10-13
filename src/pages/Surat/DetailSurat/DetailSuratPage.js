import React, {useContext, useEffect} from 'react';
import "./detail-surat-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faPrint, faSearch, faTrash, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios"
import UserProfileBadge from "../../../components/UserProfileBadge/UserProfileBadge";
import { useHistory } from "react-router-dom";
import DownloadPDFButton from "../../../components/DownloadPDFButton/DonwloadPDFButton";

const DetailSuratPage = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const history = useHistory();

  // useEffect(()=>{
  //   checkDocuLogin();
  // }, [docuContext.login])

  const fetchDetailSurat= () => {
    return null
  }

  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content header_title={"Detail Surat"}>
        <div className={"detail-surat-wrapper"}>
          <div className="header-bar">
            <div className="back-button-wrapper" onClick={()=> history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size="md"/>
              <span className={"back-button"}>Kembali</span>
            </div>
          </div>
          <div className="action-bar row justify-space-between">
            <UserProfileBadge name={"Sender"} email={"sender@gmail.com"}/>
            <div className="action-wrapper">
              <div className="action-item-wrapper">
                <FontAwesomeIcon icon={faTrash} size={"lg"} color={"maroon"}/>
              </div>
              <div className="action-item-wrapper">
                <FontAwesomeIcon icon={faPrint} size={"lg"}/>
              </div>
            </div>
          </div>
          <div className="detail-content">
            <div className={"title-surat-wrapper"}>
                <div className="title-surat">
                  Titel Surat
                </div>
                <div className="tanggal-kirim">
                  Dikirim 02 Des 2020 19:00 WIB
                </div>
            </div>
            <div className="envelope-item-wrapper">
              <DownloadPDFButton
                downloadUrl = "fileurl.com"
                filename = "file.pdf"
                handleDownload = {()=>{
                  alert("DOWNLOAD HANDLING")
                }}
              />
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

export default DetailSuratPage;
