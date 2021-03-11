import React, {useContext, useEffect, useState} from "react";
import "./table-content.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faDownload, faSignature, faEdit} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import {Link} from "react-router-dom";
import download from "downloadjs";
import Swal from 'sweetalert2'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

const RoleTable = (props) =>{
  const conditionallyPrintTable = () =>{
    if(!props.data){
      return <tr>
        <td colSpan={3}><h5>Grup Belum Dipilih</h5></td>
      </tr>
    }
    if(props.data.length <= 0){
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
              <td>{conditionallyPrintButton({id : listValue.id})}</td>
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
        {hapusButton()}
        {editButton()}
      </div>
    )
  }

  const hapusButton = () => {
    return (
      <Button
        kind={"danger"}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faTrash}/>}
      />
    )
  }

  const tambahButton = () => {
    return (
      <Button
        kind={"primary"}
        size={"small"}
        icon={<FontAwesomeIcon icon={faPlus}/>}
      />
    )
  }

  const editButton = () => {
    return (
      <Button
        kind={"primary"}
        size={"small"}
        icon={<FontAwesomeIcon icon={faEdit}/>}
      />
    )
  }

  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="25%">Nama Group</th>
        <th width="25%">Jumlah User Terdaftar</th>
        <th width="20%">Aksi</th>
      </tr>
      {conditionallyPrintTable()}
    </table>
  )
}

export default RoleTable;
