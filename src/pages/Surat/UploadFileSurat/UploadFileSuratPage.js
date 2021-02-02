import React, {useEffect, useContext, useState} from 'react';
import "./upload-file-surat-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Input, Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare,faPlus, faUpload, faFileUpload, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios"
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import UploadFileButton from "./UploadFileButton";
import {LoginContext} from "../../../contexts/LoginContext";
import Swal from 'sweetalert2'

const UploadFileSuratPage = () =>{
  const history = useHistory();
  const {docuContext} = useContext(DocusignLoginContext);
  const {user, login} = useContext(LoginContext)
  const [file, setFile] = useState([]);
  const [perihal, setPerihal] = useState("")
  const [formSurat, setFormSurat] = useState([
    {email : "", recipient_type : "", name :""}
  ])
  const [selectedValues, setSelectedValues] = useState("");
  const [contactList, setContactList] = useState({
    contact : [],
    pushedContact : [],
    isLoaded : false
  })

  useEffect( ()=>{
    // If contact list is not loaded then
    if(user){
      if(contactList.isLoaded === false && contactList.contact.length <= 0){
        // Fetch contact list data and append
        getContactList()
        if(contactList.contact.length >= 0){

          setContactList((prevState => ({
            ...prevState,
            isLoaded: true
          })))
        }
      }
    }else{
      console.log("USER IS NULL")
    }
  }, [contactList.isLoaded, login])

  const options = [
    { value: 'signer', label: 'Signer' },
    { value: 'cc', label: 'Carbon Copy' },
  ];

  const renderFormsurat = () =>{
    return formSurat.map((element, index)=>{
      return (
        <div className="recipients-form-wrapper mb-1">
          <div className="form-item-wrapper mr-1">
            <Select
              value={{label : getSelectedValueLabel(index, "email")}}
              name={"email"}
              onChange={(e)=>handleValueChange(e,index, "email")}
              options={parseContactList()}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor : "#F5F8FF",
                  borderStyle: 'none',
                  borderWidth: 0,
                  '&:hover': {
                    borderColor: 'none',
                    backgroundColor : "#eff2f9"
                  }, // border style on hover
                  boxShadow: 'inset 0 -1px #748ba9', // no box-shadow
                }),
              }}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#F5F8FF',
                  primary: '#748ba9',
                },
                spacing : {
                  baseUnit : 4,
                  controlHeight: 40,
                }
              })}
            />
          </div>
          <div className="form-item-wrapper ml-1">
            <Select
              value={{label : getSelectedValueLabel(index, "recipient_type")}}
              name={"recipient_type"}
              onChange={(e)=>handleValueChange(e,index, "recipient_type")}
              options={options}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor : "#F5F8FF",
                  borderStyle: 'none',
                  borderWidth: 0,
                  '&:hover': {
                    borderColor: 'none',
                    backgroundColor : "#eff2f9"
                  }, // border style on hover
                  boxShadow: 'inset 0 -1px #748ba9', // no box-shadow
                }),
              }}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#F5F8FF',
                  primary: '#748ba9',
                },
                spacing : {
                  baseUnit : 4,
                  controlHeight: 40,
                }
              })}
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

  const getSelectedValueLabel = (index, name) =>{
    if(name == "recipient_type"){
      switch(formSurat[index][name]){
        case "cc":
          return "Carbon Copy"
        case "signer":
          return "Signer"
        default:
          return "-"
      }
    }else{
      return formSurat[index][name]
    }
  }

  const getContactList = async (userId) => {
    try{
      console.log("Getting Contact List")
      let request = await axios.post(`http://localhost:3001/api/get-assigned-contactbook`, {
        user_id : user.id
      });
      setContactList((prevState =>
        ({
          ...prevState,
          contact : request.data.data
        })
      ))
    }catch(error){
      console.log(error)
    }
  }

  const parseContactList = () =>{
    if (contactList.contact === null) return
      // Parse original contact
      let temp = []

      temp = contactList.contact.map((el, index)=>{
        return {
          value : {
            email : el.email,
            name : el.nama_lengkap
          },
          label : `${el.nama_lengkap} - ${el.email}`
        }
      }).filter((el)=> !contactList.pushedContact.includes(el.value.email))
      return temp
  }

  const handleAddNew = () => {
    setFormSurat((prevState => ([
      ...prevState,
      {
        email : '',
        recipient_type: '',
        name : ''
      }
    ])))
  }

  const handleValueChange = (event,index, name) =>{
    // Check if the the index is already filled
    if(formSurat[index].email === ""){

    }else{
      setContactList((prevState => ({
        ...prevState,
        pushedContact: prevState.pushedContact.filter((el) => el !== formSurat[index].email)
      })))
    }

    if(name === "email"){
      // if its email remove a thing and add to push array
      // console.log("Handle email changes")
      setContactList((prevState => ({
        contact: contactList.contact,
        pushedContact: [...prevState.pushedContact, event.value.email]
      })))

      // Handle to attach name and email
      const values  = [...formSurat];
      values[index][name] = event.value.email;
      values[index]["name"] = event.value.name;
      setFormSurat(values);
    }else{
      const values  = [...formSurat];
      values[index][name] = event.value;
      setFormSurat(values);
    }
  }

  const handleDelete = (removeIndex) =>{
    setFormSurat((prevState => (
      prevState.filter((element,index)=>{
        if(index !== removeIndex) return element
      })
    )))

    setContactList((prevState => ({
      ...prevState,
      pushedContact: prevState.pushedContact.filter((el) => el !== formSurat[removeIndex].email)
    })))
  }

  const checkForEmpty = async () =>{
    let emptyFlag = false;
    console.log(formSurat)
    formSurat.forEach(element => {
      console.log(element)
      if(!element.email || !element.recipient_type){
        emptyFlag = true;
      }
    })

    if(perihal === "") {
      emptyFlag = true
    }

    return emptyFlag
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const url = "http://localhost:3001/api/create-surat";

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    if(await checkForEmpty()){
      Swal.fire({
        icon: 'error',
        title: 'Ada Data Kosong!',
        text: 'Mohon cek kembali input data anda!',
      })
    }else{
      // IF ALL PASSES
      const data = await fabricateFormData();
      await Swal.fire({
        title: 'Submit pembuatan surat?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const res = await axios.post(url, data, config);
          if(res.data.url){
            Swal.fire({
              icon: 'success',
              title: 'Surat Berhasil Dibuat, mengalihkan halaman . . .',
              showConfirmButton: false,
              timer: 1500
            }).then((results)=>{
              window.location.replace(`${res.data.url}`)
            })
          }else{
            console.log(res.data.error)
            Swal.fire({
              icon: 'error',
              title: 'Gagal Upload Surat!',
              text: 'Ada kendala di server',
            })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    }

  }

  const fabricateFormData = async () =>{
    const formData = new FormData();
    let documentList = await createBase64Document(file)

    const data = {
      access_token : docuContext.auth.access_token,
      account_id : docuContext.profile.accounts[0].account_id,
      recipients : formSurat,
      subject : perihal,
      dokumen : documentList,
    }

    await formData.append('account_id',docuContext.profile.accounts[0].account_id)
    await formData.append('recipients', JSON.stringify(formSurat));
    await formData.append('subject',perihal)
    await formData.append('dokumen',JSON.stringify(documentList))
    await formData.append('access_token',docuContext.auth.access_token)

    return data;
  }

  // Create Base 64 Document
  const createBase64Document = async (files) => {
    let tempDocument = [];

    for (const [index, element] of files.entries()){
      let documentBase64 = await toBase64(element)
      let documentObject = {
        documentBase64: `${documentBase64}`,
        documentId: `${index+1}`,
        fileExtension: element.name.split('.').pop(),
        name: `${element.name}`,
      }
      tempDocument[index] = documentObject;
    }
    return tempDocument;
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });

  // React Drop Zone File Handling
  const onDrop = (files) =>{
    if(files.length >= 1){
      files.forEach((file,index) => {
        addFile(file)
      })
    }else{
      addFile(files)
    }
  }

  const onRemoveFile = (file) => {
    removeFile(file.name)
  }

  const addFile = (file) =>{
    setFile((prevState) => [
      ...prevState,
      file
    ])
  }

  const removeFile = (file_to_remove) => {
    setFile(prevState => [
      ...prevState.filter((el) => el.name !== file_to_remove)
    ])
  }

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Kirim Surat"}
        crumbList = {[{
          name : "Buat Surat",
          link : "/buat-surat"
        },{
          name : "Upload Surat",
          link : "/upload-surat"
        }
        ]}
      >
        <div className={"upload-surat-wrapper"}>
          {
            contactList.pushedContact.map((el)=> <label>{el.email}</label>)
          }
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
                  Perihal:
                </p>
                <Input
                  size={"default"}
                  placeholder={"Perihal"}
                  onChange={(e)=> setPerihal(e.target.value)}
                />

              </div>

              <div style={{margin: "24px 0px"}}>
                <UploadFileButton
                  handleOnDrop={onDrop}
                  handleOnRemove = {onRemoveFile}
                />
              </div>

              <div className="upload-file-button-action">
                <Button
                  htmlType={'submit'}
                  onClick={(e)=>handleSubmit(e)}
                  kind={"primary"}
                >
                  Kirim
                </Button>

                <Button
                  kind={"tertiary"}
                  onClick={()=>{
                    console.log(file)
                  }}
                >
                  Check File <p style={{color: "#CCCC00"}}><strong>[DEV]</strong></p>
                </Button>

                <Button
                  kind={"tertiary"}
                  onClick={()=>{
                    console.log(formSurat)
                  }}
                >
                  Check Users <p style={{color: "#CCCC00"}}><strong>[DEV]</strong></p>
                </Button>
              </div>
            </div>
          </form>

        </div>

      </Content>
    </div>
  )
}

export default UploadFileSuratPage;
