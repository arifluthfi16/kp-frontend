import React, {useEffect, useState} from 'react'
import SideNav from "../../../../components/SideNav/SideNav";
import Content from "../../../../components/Content/Content";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import {Button, Input} from "bima-design"
import "./upload-file-surat-page.css"
import Select from "react-select";
import axios from "axios";
import {equals} from "react-table/src/filterTypes";
import Swal from "sweetalert2";
const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

const EditUserPage = (props) => {
  const [roleGroupData, setRoleGroupData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const { state } = props.location;
  const history = useHistory();
  const [selectedGroup, setSelectedGroup] = useState(state.group_id);
  const [selectedRole, setSelectedRole] = useState({
    role_name : state.role_name,
    role_id : state.role_id
  });

  useEffect( ()=>{
    fetchGroupData()
  }, [])

  useEffect(()=>{
    fetchRoleData(selectedGroup)
  }, [selectedGroup])

  const fetchGroupData = async () => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/group`;
    const result = await axios.get(REQUEST_URL)
    setRoleGroupData(result.data.data)
  }

  const fetchRoleData = async (group_id) => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/${group_id}/roles/`;
    const result = await axios.get(REQUEST_URL)
    setRoleData(result.data.data)
  }

  const loadGroupOptions = () => {
    if(roleGroupData.length > 0){
      let temp = roleGroupData.map((el)=>{
        return {
          label : el.group_name,
          value : el.id
        }
      }).filter((el)=> el.value !== selectedGroup)
      return temp
    }else{
      return []
    }
  }

  const loadRoleOptions = () => {
    if(roleData.length > 0){
      let temp = roleData.map((el)=>{
        return {
          label : el.name,
          value : el.id
        }
      }).filter((el)=> selectedRole ? el.value !== selectedRole.role_id : true)
      return temp
    }else{
      return []
    }
  }

  const loadSelectedRole = () => {
    if(selectedRole){
      return {
        label : selectedRole.role_name,
        value : selectedRole.role_id
      }
    }else{
      return null
    }

  }

  const handleGroupValueChange = (event) =>{
    setSelectedGroup(event.value)
    setSelectedRole(null)
  }

  const handleRoleValueChange = (event) => {
    setSelectedRole({
      role_name: event.label,
      role_id: event.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const REQUEST_DATA = {
      newRoleId : selectedRole.role_id,
      username : state.username
    }
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/users/edit`;

    await Swal.fire({
      title: `Edit data user?`,
      text: "Apakah anda yakin untuk melakukan edit data user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.put(REQUEST_URL, REQUEST_DATA)
        console.log(response)

        if(response.status === 200 && response.data.success === 1){
          Swal.fire(
            'Berhasil Edit Data',
            `Edit data user berhasil`,
            'success'
          ).then(()=>{
            history.goBack()
          })
        }else{
          Swal.fire(
            "Gagal Edit Data",
            "Data gagal diubah",
            "Warning"
          ).then(()=>{
            history.goBack()
          })
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Batal',
          'Edit data dibatalkan',
          'error'
        ).then(()=>{
          history.goBack()
        })
      }
    })
  }



  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Edit User Data"}
      >
        <div className="upload-surat-wrapper">
          <div className={"upload-surat-header"}>
            <div className="back-button-wrapper" onClick={()=> history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size="md"/>
              <span className={"back-button ml-2"}>Kembali</span>
            </div>
          </div>

          <form>
            <div className="upload-surat-body-wrapper">
              <div className="mb-2">
                <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                  Username
                </p>
                <Input
                  value={state.username}
                  disabled
                />
              </div>
              <div className="mb-2">
                <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                  Email
                </p>
                <Input
                  value={state.email}
                  disabled
                />
              </div>
              <div className="mb-2">
                <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                  Nama Lengkap
                </p>
                <Input
                  value={state.nama_lengkap}
                  disabled
                />
              </div>

              <p style={{textSize:'16px', fontWeight:"SemiBold", fontFamily: 'Source Sans Pro'}} className={'mb-1'}>
                Role
              </p>
              <div className="recipients-form-wrapper mb-1">

                <div className="form-item-wrapper mr-1">
                  <div className="mb-2">
                    <Select
                      defaultValue={{ label: state.group_name, value: state.group_id }}
                      name={"email"}
                      options={loadGroupOptions()}
                      onChange={(e)=>handleGroupValueChange(e)}
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
                </div>

                <div className="form-item-wrapper mr-1">
                  <div className="mb-2">
                    <Select
                      // defaultValue={{ label: state.role_name, value: state.role_id }}
                      value={loadSelectedRole()}
                      name={"email"}
                      options={loadRoleOptions()}
                      onChange={(e)=>handleRoleValueChange(e)}
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
                </div>
              </div>

              <div className="upload-file-button-action">
                <Button
                  htmlType={'submit'}
                  onClick={(e)=>handleSubmit(e)}
                  kind={"primary"}
                >
                  Edit Data
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Content>
    </div>
  )
}

export default  EditUserPage
