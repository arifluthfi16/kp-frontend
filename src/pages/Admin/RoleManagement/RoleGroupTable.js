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
const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

const RoleGroupTable = (props) =>{
  const history = useHistory()
  const conditionallyPrintTable = () =>{
    if(!props.data || props.data.length <= 0){
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
                className={listValue.id === props.activeRow ? "active" : ""}
                onClick={()=>{
                  props.setActiveRow(listValue.id)
                }}
              >
                <td>{listValue.group_name}</td>
                <td>{listValue.jumlah_user_terdaftar}</td>
                <td>{conditionallyPrintButton({id : listValue.id, group_name : listValue.group_name})}</td>
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
        {hapusButton(data.id)}
        {editButton(data.id, data.group_name)}
      </div>
    )
  }

  const hapusButton = (group_id) => {
    return (
      <Button
        kind={"danger"}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faTrash}/>}
        onClick={()=>{
          handleDeleteButton(group_id)
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
      >Tambah Group Baru</Button>
    )
  }

  const editButton = (group_id, group_name) => {
    return (
      <Button
        kind={"primary"}
        size={"small"}
        icon={<FontAwesomeIcon icon={faEdit}/>}
        onClick={()=>{
          handleEditButton(group_id, group_name)
        }}
      >
        Edit
      </Button>
    )
  }

  const handleTambahButton = () => {
    Swal.fire({
      title: 'Tambah Group Baru',
      html: `<input type="text" id="group-name" class="swal2-input" placeholder="Nama grup baru">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        const group_name = Swal.getPopup().querySelector('#group-name').value
        if (!group_name) {
          Swal.showValidationMessage(`Nama grup tidak boleh kosong`)
        }
        return { group_name }
      }
    }).then(async (result) => {
      if(result.values){
        const REQUEST_URL = `${BACKEND_BASE_PATH}/api/group`
        const createGroupResponse = await axios.post(REQUEST_URL, {
          group_name : result.value.group_name
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
      }
    })
  }

  const handleDeleteButton = async (group_id) => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/group/${group_id}`

    await Swal.fire({
      title: `Hapus Group ${group_id}?`,
      text: "Group yang hapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(REQUEST_URL)

        if(response.status === 200 && response.data.success ===1){
          props.removeItem(group_id)
          Swal.fire(
            'Berhasil Dihapus',
            `Group ${group_id} Berhasil Dihapus`,
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

  const handleEditButton = (group_id, old_group_name) => {
    Swal.fire({
      title: 'Edit Group',
      html: `<input type="text" id="group-name" class="swal2-input" value="${old_group_name}">`,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        const group_name = Swal.getPopup().querySelector('#group-name').value
        if (!group_name) {
          Swal.showValidationMessage(`Nama grup tidak boleh kosong`)
        }
        return { group_name }
      }
    }).then(async (result) => {
      console.log(result)
      if(result.value){
        const REQUEST_URL = `${BACKEND_BASE_PATH}/api/group/${group_id}`
        const editGroupResponse = await axios.put(REQUEST_URL, {
          group_name : result.value.group_name
        })

        console.log(editGroupResponse)

        if(editGroupResponse.status === 200 && editGroupResponse.data.success === 1){
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
      <div className={"row justify-end mb-1"}>
        {tambahButton()}
      </div>

      <table className={"table-content"} width={"100%"}>
        <tr>
          <th width="25%">Nama Group</th>
          <th width="25%">Jumlah User Terdaftar</th>
          <th width="20%">Aksi</th>
        </tr>
        {conditionallyPrintTable()}
      </table>

    </>
  )
}

export default RoleGroupTable;
