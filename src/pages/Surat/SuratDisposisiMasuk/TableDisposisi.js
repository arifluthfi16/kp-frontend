import React, {useContext} from "react";
import "./table-content.css";
import {Button} from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faTrash, faSignature, faDownload} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Link} from "react-router-dom";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import download from "downloadjs"
import {LoginContext} from "../../../contexts/LoginContext";

const TableDisposisi = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const {user} = useContext(LoginContext)
  console.log(props.data)

  const conditionallyPrintTable = () =>{
    if(!props.data){
      return <tr>
        <td colSpan={5}><h3>Too bad it's empty</h3></td>
      </tr>
    }else{
      return props.data.map((listValue, index)=>{
        return (
          <tr
            key={index}
            onClick={()=>{
              console.log(`Row ${index} clicked`)
            }}
          >
            <td>{listValue.perihal}</td>
            <td>{listValue.isi_note}</td>
            <td>{dateParser(listValue.tanggal_dibuat)}</td>
            <td>{listValue.nama_pengirim}</td>
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

  const conditionallyPrintButton = (envelopeData) =>{
    let {id_disposisi} = envelopeData
    console.log("ID DISPOSISI : ",id_disposisi)

    return (<div className="row justify-space-between" style={{margin: "0px 16px"}}>
      {createDownloadButton(id_disposisi)}
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

  return  (
    <table className={"table-content"} width={"100%"}>
      <thead>
      <tr>
        <th width="20%">Perihal</th>
        <th width="20%">Catatan</th>
        <th width="25%">Tanggal Dikirim</th>
        <th width="20%">Pengirim</th>
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
