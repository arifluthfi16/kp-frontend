import React from "react";
import "./draft-table.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faEdit, faDownload, faSignature} from "@fortawesome/free-solid-svg-icons";


const DraftTable = (props) =>{

  console.log(props.data)

  const conditionallyPrintTable = () =>{
    if(!props.data || !props.data.envelopes){
      return <tr>
        <td colSpan={5}><h3>Too bad it's empty</h3></td>
      </tr>
    }else{
      return props.data.envelopes.map((listValue, index)=>{
        return (
          <tr key={index}>
            <td>{listValue.emailSubject}</td>
            <td>{dateParser(listValue.lastModifiedDateTime)}</td>
            <td>{listValue.recipients.signers[0].name}</td>
            <td>{conditionallyPrintButton(listValue.status)}</td>
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

  const conditionallyPrintButton = (status) =>{
    switch (status) {
      case "completed" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faDownload}/>}
            >Download</Button>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faInfo}/>}
            >Detail</Button>
          </div>
        )
      case "sent" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faSignature}/>}
            >Sign</Button>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faInfo}/>}
            >Detail</Button>
          </div>
        )
      case "created" :
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faDownload}/>}
            >Lanjutkan</Button>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faInfo}/>}
            >Detail</Button>
            <Button
              kind={"danger"}
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Hapus</Button>
          </div>
        )
      case "delivered":
        // Sudah Di Tanda Tangan
        return (
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faDownload}/>}
            >Download</Button>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faInfo}/>}
            >Detail</Button>
          </div>
        )
      default:
        return status
    }
  }

  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Terakhir Diubah</th>
        <th width="20%">Penerima</th>
        <th width="15%">Aksi</th>
      </tr>
      {conditionallyPrintTable()}
    </table>
  )
}

export default DraftTable;
