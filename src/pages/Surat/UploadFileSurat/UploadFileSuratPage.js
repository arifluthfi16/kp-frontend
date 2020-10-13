import React, {useState} from 'react';
import "./upload-file-surat-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Input, Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare,faPlus, faUpload, faFileUpload, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios"
import { useHistory } from "react-router-dom";

const UploadFileSuratPage = () =>{
  const history = useHistory();

  const [dataUpload, setDataUpload] = useState(null);

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Kirim Surat"}
      >
        <div className={"upload-surat-wrapper"}>

          <div className={"upload-surat-header"}>
            <div className="back-button-wrapper" onClick={()=> history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size="md"/>
              <span className={"back-button ml-2"}>Kembali</span>
            </div>
          </div>

          <div className="upload-surat-body-wrapper">
            <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
              Kirim Kepada:
            </p>
            <div className="more-wrapper mb-2">
              <div className="recipients-form-wrapper mb-1">
                <div className="form-item-wrapper mr-1">
                  <Input size={"default"} placeholder={"Email Penerima"}/>
                </div>
                <div className="form-item-wrapper ml-1">
                  <Input size={"default"} placeholder={"Perlu Tanda Tangan / CC"}/>
                </div>
              </div>
              <Button kind={"tertiary"} icon={(<FontAwesomeIcon icon={faPlus}/>)}>Tambah Penerima</Button>
            </div>

            <div className="perihal-wrapper mb-2">
              <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                Perihal:
              </p>
              <Input size={"default"} placeholder={"Perihal"} />
            </div>

            <div className="upload-file-wrapper">
              <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                Upload File Dokumen:
              </p>
              <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro', color:"#748BA9"}} className={'mb-1'}>
                Maximum file size <spam style={{fontWeight:"bold"}}>14 MB</spam>
              </p>

              <div className="upload-box">
                <FontAwesomeIcon icon={faFileUpload} size={'2x'} className={"mb-2"} color={"#758DA9"}/>
                <p>Click to Add or</p>
                <p>Drop Document here</p>
              </div>
            </div>

            <div className="upload-file-button-action">
              <Button>
                Persiapkan Markah Tandatangan
              </Button>
              <Button>
                Simpan
              </Button>
            </div>
          </div>

        </div>

      </Content>
    </div>
  )
}

export default UploadFileSuratPage;
