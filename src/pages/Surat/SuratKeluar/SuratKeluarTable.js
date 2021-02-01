import React, {useContext, useEffect, useState} from "react";
import "./table-content.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faDownload, faSignature} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import {Link} from "react-router-dom";
import download from "downloadjs";
import Swal from 'sweetalert2'

const SuratKeluarTable = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const [data, setData] = useState(props.data)
  useEffect(()=>{
    setData(props.data)
  }, [props.data])

  const conditionallyPrintTable = () =>{
    if(!data || !data.envelopes){
      return <tr>
        <td colSpan={5}><h3>Too bad it's empty</h3></td>
      </tr>
    }else{
      return data.envelopes.map((listValue, index)=>{
        if(listValue.status === "voided") return null
        return (
          <tr key={index}>
            <td>{listValue.emailSubject}</td>
            <td>{dateParser(listValue.sentDateTime)}</td>
            {/*<td>{(listValue.recipients.signers.length === 0 ? listValue.recipients.carbonCopies[0].name : listValue.recipients.signers[0].name)}</td>*/}
            <td>{recipientParser(listValue.recipients)}</td>
            <td>{statusTranslator(listValue.status)}</td>
            <td>{conditionallyPrintButton({status : listValue.status, envelope_id : listValue.envelopeId})}</td>
          </tr>
        )
      })
    }
  }

  const recipientParser = (recipientList) => {
    return recipientList.signers.map((el, index)=> (
        <p>{`${index+1} - ${el.name}`}</p>
      ))
  }

  const createDisposisiButton = (envelopeId, disableStatus=false) =>{
    return (
      <Link
        to={`/buat-disposisi/${envelopeId}`}
        style={{
          textDecoration : "none",
          cursor : "auto"
        }}
      >
        <Button
          disabled={disableStatus}
          className="mr-2"
          size={"small"}
          icon={<FontAwesomeIcon icon={faInfo}/>}
          onClick={(e)=> {
            e.stopPropagation()
            console.log(`/buat-disposisi/${envelopeId}`)
          }}
        >
          Disposisi
        </Button>
      </Link>
    )
  }

  const removeData = (value) =>{
    setData((prevState)=>{
      return {
        ...prevState,
        envelopes : prevState.envelopes.filter((el) => el.envelopeId !== value)
      }
    })
  }

  const createHapusButton = (envelopeId, index) =>{
    return (
      <Button
        kind={"danger"}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faTrash}/>}
        onClick={()=>handleHapusSurat(envelopeId)}
      >Hapus</Button>
    )
  }


  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = `${date} ${month} ${year}`;
    return time;
  }

  const handleDownloadButton = async (payload) =>{
    console.log("Download Initiated")
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/document/download";

    let data = {
      access_token : docuContext.auth.access_token,
      accountId : docuContext.profile.accounts[0].account_id,
      envelopeId: payload.envelopeId,
    }

    try{
      let response =  await axios({url, method : "post", data, responseType: 'blob'});
      console.log(response)
      await download(response.data, `${"Surat Keluar"} - ${timeConverter(Date.now())}.zip`);
    }catch(error){
      console.log(error)
    }
  }

  const createDownloadButton = (envelopeId) =>{
    return (
      <Button
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faDownload}/>}
        onClick={async ()=>{
          await handleDownloadButton({envelopeId})
        }}
      >Download</Button>
    )
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
        return "Penerima Belum Tandatangan"
      case "created" :
        return "Draft"
      case "delivered":
        return "Penerima Sudah Tandatangan"
      case "voided":
        return "Surat Sudah Dihapus"
      default:
        return status
    }
  }

  const handleHapusSurat = async (envelope_id) =>{
    const url = `http://localhost:3001/api/surat/hapus-surat`

    let data = {
      account_id : docuContext.profile.accounts[0].account_id,
      envelope_id,
      access_token : docuContext.auth.access_token
    }

    try{
      await Swal.fire({
        title: 'Apakah anda yakin untuk menghapus surat?',
        text: "Action ini tidak bisa dikembalikkan, penghapusan bersifat permanen",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response =  await axios.post(url, data, {})
          removeData(envelope_id)

          Swal.fire(
            'Berhasil Dihapus',
            'Surat Berhasil Dihapus',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Batal',
            'Penghapusan Surat Dibatalkan',
            'error'
          )
        }
      })
    }catch(err){
      console.log(err)
      Swal.fire(
        'Gagal',
        'Terjadi Kesalahan',
        'error'
      )
    }
  }

  const conditionallyPrintButton = (envelopeData) =>{
    const {status, envelope_id} = envelopeData

    switch (status) {
      case "completed" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelope_id)}
            {createDisposisiButton(envelope_id)}
            {createHapusButton(envelope_id)}
          </div>
        )
      case "sent" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelope_id)}
            {createDisposisiButton(envelope_id, true)}
            {createHapusButton(envelope_id)}
          </div>
        )
      case "created" :
        return "Draft"
      case "delivered":
        // Sudah Di Tanda Tangan
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelope_id)}
            {createDisposisiButton(envelope_id)}
            {createHapusButton(envelope_id)}
          </div>
        )
      case "voided":
        return "Dihapus"
      default:
        return status
    }
  }

  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Tanggal Kirim</th>
        <th width="20%">Penerima</th>
        <th width="10%">Status Terakhir</th>
        <th width="15%">Aksi</th>
      </tr>
      {conditionallyPrintTable()}
    </table>
  )
}

export default SuratKeluarTable;
