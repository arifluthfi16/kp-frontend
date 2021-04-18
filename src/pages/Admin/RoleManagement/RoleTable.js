import React, {useContext, useEffect, useState} from "react";
import "./table-content.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faDownload, faSignature, faEdit} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import {Link, useHistory} from "react-router-dom";
import download from "downloadjs";
import Swal from 'sweetalert2'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import  {useTable} from "react-table"
const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

const RoleTable = (props) =>{
  const history = useHistory();
  const conditionallyPrintTable = () =>{
    if(!props.activeRow){
      return <tr>
        <td colSpan={3}><h5>Grup Belum Dipilih</h5></td>
      </tr>
    }
    if(!props.data){
      return <tr>
        <td colSpan={3}><h5>Data Kosong</h5></td>
      </tr>
    }else{
      return <tbody className={"parent-table"}>
      {
        props.data.map((listValue, index)=>{
          return (
            <tr
              key={index}
            >
              <td>{listValue.name}</td>
              <td>{listValue.jumlah_user_terdaftar}</td>
              <td>{conditionallyPrintButton({id : listValue.id, name : listValue.name})}</td>
            </tr>
          )
        })
      }
      </tbody>
    }
  }

  const conditionallyPrintButton = (data) =>{
    return (
      <div>
        {hapusButton(data)}
        {editButton(data)}
      </div>
    )
  }

  const hapusButton = (data) => {
    return (
      <Button
        kind={"danger"}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faTrash}/>}
        onClick={()=>{
          handleDeleteButton(data)
        }}
      >
        Hapus
      </Button>
    )
  }

  const tambahButton = (isDisabled = false) => {
    return (
      <Button
        kind={"primary"}
        size={"small"}
        icon={<FontAwesomeIcon icon={faPlus}/>}
        disabled={isDisabled}
        onClick={()=>{
          handleTambahButton()
        }}
      >Tambah Role</Button>
    )
  }

  const editButton = (data) => {
    return (
      <Button
        kind={"primary"}
        size={"small"}
        icon={<FontAwesomeIcon icon={faEdit}/>}
        onClick={()=>{
          handleEditButton(data)
        }}
      >
        Edit
      </Button>
    )
  }

  const handleTambahButton = () => {
    Swal.fire({
      title: 'Tambah Role Baru',
      html: `<input type="text" id="role-name" class="swal2-input" placeholder="Nama role baru">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        const role_name = Swal.getPopup().querySelector('#role-name').value
        if (!role_name) {
          Swal.showValidationMessage(`Nama role tidak boleh kosong`)
        }
        return { role_name }
      }
    }).then(async (result) => {
      const REQUEST_URL = `${BACKEND_BASE_PATH}/api/role`
      const createGroupResponse = await axios.post(REQUEST_URL, {
        role_name : result.value.role_name,
        group_id : props.activeRow
      })

      if(createGroupResponse.status === 200 && createGroupResponse.data.success === 1){
        Swal.fire({
          title : "Berhasil!",
          html : `Berhasil membuat group baru`,
          icon : 'success'
        }).then(()=>{
          history.go(0)
        })
      }else{
        Swal.fire({
          title : "Gagal",
          html : `Gagal membuat group baru`,
          icon : 'error'
        })
      }

    })
  }

  const conditionallyPrintAddButton = () =>{
    if(!props.activeRow){
      return (
        <div className={"row justify-end mb-1"}>
          {tambahButton(true)}
        </div>
      )
    }else{
      return (
        <div className={"row justify-end mb-1"}>
          {tambahButton()}
        </div>
      )
    }
  }

  const handleDeleteButton = async (data) => {
    const {id, name} = data
    let role_id = id
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/role/${role_id}`

    await Swal.fire({
      title: `Hapus Role ${name}?`,
      text: "Role yang hapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(REQUEST_URL)

        if(response.status === 200 && response.data.success ===1){
          props.removeItem(role_id)
          Swal.fire(
            'Berhasil Dihapus',
            `Role ${name} Berhasil Dihapus`,
            'success'
          )
        }else{
          Swal.fire(
            "Penghapusan gagal",
            "User Gagal Dihapus",
            "Warning"
          )
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Batal',
          'Penghapusan dibatalkan',
          'error'
        )
      }
    })
  }

  const handleEditButton = (data) => {
    const {id, name} = data
    let old_role_name = name

    Swal.fire({
      title: 'Edit Role',
      html: `<input type="text" id="role-name" class="swal2-input" value="${old_role_name}">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        const role_name = Swal.getPopup().querySelector('#role-name').value
        if (!role_name) {
          Swal.showValidationMessage(`Nama grup tidak boleh kosong`)
        }
        return { role_name }
      }
    }).then(async (result) => {
      console.log(result)
      if(result.value){
        console.log("Masuk value")
        const REQUEST_URL = `${BACKEND_BASE_PATH}/api/role/${id}`
        console.log(REQUEST_URL)
        const editRoleResponse = await axios.put(REQUEST_URL, {
          role_name : result.value.role_name,
          group_id : props.activeRow
        })

        console.log(editRoleResponse)

        if(editRoleResponse.status === 200 && editRoleResponse.data.success === 1){
          Swal.fire({
            title : "Berhasil!",
            html : `Berhasil melakukan edit grup`,
            icon : 'success'
          }).then(()=>{
            history.go(0)
          })
        }else{
          Swal.fire({
            title : "Gagal",
            html : `Gagal melakukan edit`,
            icon : 'error'
          })
        }
      }
    })
  }

  return  (
  <>
    {conditionallyPrintAddButton()}
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="25%">Nama Role</th>
        <th width="25%">Jumlah User Terdaftar</th>
        <th width="20%">Aksi</th>
      </tr>
      {conditionallyPrintTable()}
    </table>
  </>
  )
}

export default RoleTable;
