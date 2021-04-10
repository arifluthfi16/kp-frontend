import React from 'react'
import Button from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from 'sweetalert2'
import "./button.css";
import {useHistory} from "react-router-dom";
import Input from "bima-design"


const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

const ActionButtons = (props) => {
  const history = useHistory()
  const {username, email, group_id, role_id, role_name} = props.data

  const deleteUser = async (username) => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/users/delete/${username}`

    await Swal.fire({
      title: `Hapus User ${username}?`,
      text: "User yang hapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(REQUEST_URL)

        if(response.status === 200 && response.data.success ===1){
          props.removeData(props.index)
          Swal.fire(
            'Berhasil Dihapus',
            `User ${username} Berhasil Dihapus`,
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

  const editUser = async (data) =>{
    history.push({
      pathname: '/admin/manage-user/edit',
      state: data // your data array of objects
    })
  }

  return (
    <div>
      <button
        className={"delete-button mr-1"}
        onClick={async ()=> {
          await deleteUser(username)
        }}
      >
        Delete
      </button>
      <button
        className={"edit-button"}
        onClick={async ()=> {
          console.log("INI LAGI DI CALL ")
          await editUser(props.data)
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default ActionButtons
