import React, {useContext} from "react";
import "./table-content.css";
import {Button} from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faTrash, faSignature, faDownload} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import download from "downloadjs"

const TableSuratMasuk = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);

  let signerInfo = {
    access_token : docuContext.auth.access_token,
    account_id : docuContext.profile.accounts[0].account_id,
    signerEmail : docuContext.profile.email,
    signerName : docuContext.profile.family_name
  }

  const conditionallyPrintTable = () =>{
    if(!props.data || !props.data.envelopes){
      return <tr>
        <td colSpan={5}><h3>Too bad it's empty</h3></td>
      </tr>
    }else{
      return props.data.envelopes.map((listValue, index)=>{
        if(listValue.status === "voided") return null

        let thisDataSigned = listValue.recipients.signers.filter((el)=> el.email === docuContext.profile.email && el.status === "completed").map((el) => el.status)
        return (
          <tr
            key={index}
            onClick={()=>console.log("Tab Clicked Open Detail")}
          >
            <td>{listValue.emailSubject}</td>
            <td>{dateParser(listValue.sentDateTime)}</td>
            <td>{listValue.sender.userName}</td>
            <td>{statusTranslator(listValue.status, thisDataSigned.length)}</td>
            <td>{conditionallyPrintButton(listValue, thisDataSigned.length)}</td>
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

  const statusTranslator = (status, signedByUser = false) =>{
    if(signedByUser && status !== "completed") return "Anda Sudah Tanda tangan"

    switch (status) {
      case "sent" :
        return "Perlu Tanda Tangan"
      case "completed" :
        return "Proses Tanda Tangan Selesai"
      case "created" :
        return "Draft"
      case "delivered":
        return "Sudah Ditandatangan"
      default:
        return status
    }
  }

  const createDisposisiButton = (envelopeId, isDisabled = false) =>{
    return (
        <Link
          to={`/buat-disposisi/${envelopeId}`}
          style={{
            textDecoration : "none",
            cursor : "auto"
          }}
        >
          <Button
            disabled={isDisabled}
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

  // const createDisposisiButton = (envelopeId) =>{
  //   return (
  //     <Link to={`/detail-surat/${envelopeId}`}>
  //       <Button
  //         className="mr-2"
  //         size={"small"}
  //         icon={<FontAwesomeIcon icon={faInfo}/>}
  //       >
  //         Disposisi
  //       </Button>
  //     </Link>
  //   )
  // }

  const createDownloadButton = (envelopeId, isDisabled = false) =>{
    return (
      <Button
        disabled={isDisabled}
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faDownload}/>}
        onClick={async ()=>{
          await handleDownloadButton({envelopeId})
        }}
      >Download</Button>
    )
  }

  const createHapusButton = (envelopeId) =>{
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

  const handleHapusSurat = async (envelope_id) =>{
    const url = `http://localhost:3001/api/surat/hapus-surat`

    console.log(docuContext.auth)

    let data = {
      account_id : docuContext.profile.accounts[0].account_id,
      envelope_id,
      access_token : docuContext.auth.access_token
    }

    try{
      let response =  await axios.post(url, data, {

      })
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  const createSignButton = (envelopeData) => {
    let {envelopeId} = envelopeData
    const RETURN_URL = "http://localhost:3000/surat-masuk"

    let payload = {
      access_token : signerInfo.access_token,
      accountId : signerInfo.account_id,
      return_url: RETURN_URL,
      signerEmail : signerInfo.signerEmail,
      signerName : signerInfo.signerName,
      envelopeId
    }

    return (
      <Button
        className="mr-2"
        size={"small"}
        icon={<FontAwesomeIcon icon={faSignature}/>}
        onClick={()=>handleSignClick(payload)}
      >Sign</Button>
    )
  }

  const handleSignClick = async (payload) =>{
    const REQUEST_URL = "http://localhost:3001/api/buat-view-tandatangan";

    const result = await axios.post(REQUEST_URL, payload);
    if(result.status === 200){
      if(result.data.url === undefined){
        alert("Failed to create signer view")
      }else {
        window.location.replace(result.data.url)
      }
    }else{
      console.log("Failed to fetch data")
    }
  }

  const conditionallyPrintButton = (envelopeData, isSigned = false) =>{
    let {envelopeId, status} = envelopeData

    if(isSigned && status !== "completed") status = "personally_completed";

    switch (status) {
      case "completed" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelopeId)}
            {createDisposisiButton(envelopeId)}
          </div>
        )
      case "sent" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createSignButton(envelopeData)}
          </div>
        )
      case "created" :
        return "Draft"
      case "delivered":
        // Sudah Di Tanda Tangan
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelopeId)}
            {createDisposisiButton(envelopeId)}
          </div>
        )
      case "personally_completed":
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            {createDownloadButton(envelopeId, true)}
            {createDisposisiButton(envelopeId, true)}
          </div>
        )
      default:
        return status
    }
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
      await download(response.data, `${"Surat Masuk"} - ${timeConverter(Date.now())}.zip`);
    }catch(error){
      console.log(error)
    }
  }

  return  (
    <table className={"table-content"} width={"100%"}>
      <thead>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Tanggal Dikirim</th>
        <th width="20%">Nama Pengirim</th>
        <th width="10%">Status Terakhir</th>
        <th width="15%">Aksi</th>
      </tr>
      </thead>
      <tbody>
      {conditionallyPrintTable()}
      </tbody>
    </table>
  )
}

export default TableSuratMasuk;
