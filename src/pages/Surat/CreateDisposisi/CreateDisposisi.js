import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./create-disposisi-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Input, Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare,faPlus, faUpload, faFileUpload, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import {LoginContext} from "../../../contexts/LoginContext";
import axios from "axios"
import { useHistory } from "react-router-dom";

const CreateDisposisi = (props) =>{
  const history = useHistory();
  const {docuContext} = useContext(DocusignLoginContext);
  const {user} = useContext(LoginContext);
  const [perihal, setPerihal] = useState("")
  const [formSurat, setFormSurat] = useState([
    {email : "", note : ""}
  ])

  const envelopeId = props.match.params.id;

  const renderFormsurat = () =>{
    return formSurat.map((element, index)=>{
      return (
        <div className="recipients-form-wrapper mb-1">
          <div className="form-item-wrapper mr-1">
            <Input
              size={"default"}
              name={"email"}
              placeholder={"Email Penerima*"}
              value={element.email}
              onChange={(e)=>handleValueChange(e,index)}
            />
          </div>
          <div className="form-item-wrapper ml-1">
            <Input
              size={"default"}
              name={"note"}
              placeholder={"Catatan"}
              value={element.note}
              onChange={(e)=>handleValueChange(e,index)}
            />
          </div>
          {formSurat.length > 1 &&
              <Button
                onClick={()=> handleDelete(index)}
                style={{
                  marginLeft: "16px"
                }}
              >
                Delete
              </Button>
          }
        </div>
      )
    })
  }

  const handleAddNew = () => {
    setFormSurat((prevState => ([
      ...prevState,
      {
        email : '',
        note: ''
      }
    ])))
  }

  const handleValueChange = (event,index) =>{
    const values  = [...formSurat];
    values[index][event.target.name] = event.target.value;
    setFormSurat(values);
  }

  const handleDelete = (removeIndex) =>{
    setFormSurat((prevState => (
      prevState.filter((element,index)=>{
        if(index !== removeIndex) return element
      })
    )))
  }

  const checkForEmpty = async () =>{
    let emptyFlag = false;
    formSurat.forEach(element => {
      if(!element.email || !element.note){
        emptyFlag = true;
      }
    })
    return emptyFlag
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(await checkForEmpty()){
      alert("ADA DATA KOSONG")
    }else{
      // IF ALL PASSES
      const url = "http://localhost:3001/api/surat/create-disposisi";

      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }

      console.log("ALL PASSES")
      const data = {
        envelopeId,
        access_token : docuContext.auth.access_token,
        accountId : docuContext.profile.accounts[0].account_id,
        userId : user.id,
        recipientData : formSurat,
        perihal
      }
      const res = await axios.post(url, data, config);

      if(res.status === 200){
        // props.history.push('/surat-masuk');
        console.log("Response : 200")
      }else{
        console.log(res.data.err)
      }
    }

  }

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Disposisi Surat"}
        crumbList = {[{
          name : "Buat Disposisi",
          link : "/buat-disposisi"
        }]}
      >
        <div className={"upload-surat-wrapper"}>

          <div className={"upload-surat-header"}>
            <div className="back-button-wrapper" onClick={()=> history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size="md"/>
              <span className={"back-button ml-2"}>Kembali</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="upload-surat-body-wrapper">
              <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                Kirim Kepada:
              </p>

              {renderFormsurat()}
              <div className="more-wrapper mb-2">
                <Button
                  kind={"tertiary"}
                  icon={(<FontAwesomeIcon icon={faPlus}/>)}
                  onClick={handleAddNew}
                >Tambah Penerima</Button>
              </div>

              <div className="perihal-wrapper mb-2">
                <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                  Perihal Disposisi:
                </p>
                <Input
                  size={"default"}
                  placeholder={"Perihal Disposisi"}
                  onChange={(e)=> setPerihal(e.target.value)}
                />
              </div>

              <div className="upload-file-button-action">
                <Button
                  htmlType={'submit'}
                  onClick={(e)=>handleSubmit(e)}
                  // kind={"primary"}
                >
                  Kirim
                </Button>

                <Button
                  kind={"tertiary"}
                  onClick={()=>{
                    console.log(user)
                  }}
                >
                  Check Data
                </Button>
              </div>
            </div>
          </form>

        </div>

      </Content>
    </div>
  )
}

export default CreateDisposisi;
