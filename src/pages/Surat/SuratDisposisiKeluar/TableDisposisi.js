import React, {useContext} from "react";
import { useHistory } from 'react-router-dom';
import "./table-content.css";
import {Button} from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faTrash, faSignature, faDownload} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import download from "downloadjs"
import {LoginContext} from "../../../contexts/LoginContext";
import Swal from 'sweetalert2'

const TableDisposisi = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const {user} = useContext(LoginContext)
  let history = useHistory();

  const conditionallyPrintTable = () =>{
    const data = props.data;

    if(!data){
      return <tr>
        <td colSpan={5}><h4>Daftar Disposisi kosong, belum ada Disposisi Keluar</h4></td>
      </tr>
    }else{
      return data.map((listValue, index)=>{
        return (
          <tr
            key={index}
            onClick={()=>{
              console.log(`Row ${index} clicked`)
            }}
          >
            <td>{listValue.perihal}</td>
            <td>{listValue.nama_penerima}</td>
            <td>{listValue.email_penerima}</td>
            <td>{dateParser(listValue.tanggal_dibuat)}</td>
            <td>{conditionallyPrintButton(listValue)}</td>
          </tr>
        )
      })
    }
  }

  const dateParser = (dateInput) =>{
    if(!dateInput) return "-"

    let date = new Date( Date.parse(dateInput));

    let tahun = date.getFullYear();
    let bulan = date.getMonth();
    let tanggal = date.getDate();
    let hari = date.getDay();
    let jam = date.getHours();
    let menit = date.getMinutes();
    let detik = date.getSeconds();

    switch(hari) {
      case 0: hari = "Minggu"; break;
      case 1: hari = "Senin"; break;
      case 2: hari = "Selasa"; break;
      case 3: hari = "Rabu"; break;
      case 4: hari = "Kamis"; break;
      case 5: hari = "Jum'at"; break;
      case 6: hari = "Sabtu"; break;
    }

    switch(bulan) {
      case 0: bulan = "Januari"; break;
      case 1: bulan = "Februari"; break;
      case 2: bulan = "Maret"; break;
      case 3: bulan = "April"; break;
      case 4: bulan = "Mei"; break;
      case 5: bulan = "Juni"; break;
      case 6: bulan = "Juli"; break;
      case 7: bulan = "Agustus"; break;
      case 8: bulan = "September"; break;
      case 9: bulan = "Oktober"; break;
      case 10: bulan = "November"; break;
      case 11: bulan = "Desember"; break;
    }

    return `${hari}, ${tanggal} ${bulan} ${tahun}. ${jam}:${menit}`
  }

  const statusTranslator = (status) =>{
    switch (status) {
      case "completed" :
        return "Sudah Ditandatangan"
      case "sent" :
        return "Perlu Tanda Tangan"
      case "created" :
        return "Draft"
      case "delivered":
        return "Sudah Ditandatangan"
      default:
        return status
    }
  }

  const createDetailButton = (envelopeId) =>{
    return (
      <Link to={`/detail-surat/${envelopeId}`}>
        <Button
          className="mr-2"
          size={"small"}
          icon={<FontAwesomeIcon icon={faInfo}/>}
        >
          Detail
        </Button>
      </Link>
    )
  }

  const createDownloadButton = (id_disposisi) =>{
    return (
      <Button
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faDownload}/>}
        onClick={async ()=>{
          await handleDownloadButton({id_disposisi})
        }}
      >Download</Button>
    )
  }

  const createDeleteButton = (id_disposisi) => {
    return (
      <Button
        kind={"danger"}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faTrash}/>}
        onClick={async ()=>{
          await handleHapusButton({id_disposisi})
        }}
      >Delete</Button>
    )
  }

  const conditionallyPrintButton = (envelopeData) =>{
    let {id} = envelopeData
    console.log("ID DISPOSISI : ",id)

    return (<div className="row justify-space-between" style={{margin: "0px 16px"}}>
      {createDownloadButton(id)}
      {createDeleteButton(id)}
      {/*{createDetailButton(id_disposisi)}*/}
      {/*<Button*/}
      {/*  kind={"danger"}*/}
      {/*  className="mr-2"*/}
      {/*  size={"small"}*/}
      {/*  icon={<FontAwesomeIcon icon={faTrash}/>}*/}
      {/*>Hapus</Button>*/}
    </div>)
  }

  const handleDownloadButton = async (payload) =>{
    console.log("Download Disposisi Intitiated with Disp id : ", payload)
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/surat/download-disposisi";

    let data = {
      id_disposisi : payload.id_disposisi,
      userId : user.id
    }

    try{
      let response =  await axios({url, method : "post", data, responseType: 'blob'});
      console.log(response)
      await download(response.data, `Disposisi - ${Date.now()}.zip`);
    }catch(error){
      console.log(error)
    }
  }

  const handleHapusButton = async (payload) => {
    console.log("Handling Hapus for Disposisi with id: ", payload)

    let url = "http://localhost:3001/api/surat/hapus-disposisi";

    let data = {
      id_disposisi : payload.id_disposisi,
      ini_payload : "ini payload"
    }

    try{

      await Swal.fire({
        title: 'Hapus Disposisi?',
        text: "Disposisi yang hapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response =  await axios({url, method : "post", data, responseType: 'blob'});
          Swal.fire(
            'Berhasil Dihapus',
            'Disposisi Berhasil Dihapus',
            'success'
          ).then(()=>{
            window.location.reload();
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  return  (
    <table className={"table-content"} width={"100%"}>
      <thead>
      <tr>
        <th width="20%">Perihal</th>
        <th width="20%">Nama Penerima</th>
        <th width="20%">Email Penerima</th>
        <th width="25%">Tanggal Dikirim</th>
        <th width="15%">Aksi</th>
      </tr>
      </thead>
      <tbody>
      {conditionallyPrintTable()}
      </tbody>
    </table>
  )
}

export default TableDisposisi;
