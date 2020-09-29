import React from "react";
import "./table-content.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faDownload, faSignature} from "@fortawesome/free-solid-svg-icons";


const TableContent = (props) =>{
  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Tanggal Kirim</th>
        <th width="20%">Pengirim</th>
        <th width="10%">Status Terakhir</th>
        <th width="15%">Aksi</th>
      </tr>
      <tr>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>UNIKOM</td>
        <td>Belum Ditandatangani</td>
        <td>
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
            <Button
              size={"small"}
              kind={"danger"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Delete</Button>
          </div>
        </td>
      </tr>
      <tr>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>UNIKOM</td>
        <td>Belum Ditandatangani</td>
        <td>
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
            <Button
              size={"small"}
              kind={"danger"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Delete</Button>
          </div>
        </td>
      </tr>
      <tr className={"viewed"}>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>UNIKOM</td>
        <td>Selesai</td>
        <td>
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
            <Button
              size={"small"}
              kind={"danger"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Delete</Button>
          </div>
        </td>
      </tr>
      <tr>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>UNIKOM</td>
        <td>Belum Ditandatangani</td>
        <td>
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
            <Button
              size={"small"}
              kind={"danger"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Delete</Button>
          </div>
        </td>
      </tr>
    </table>
  )
}

export default TableContent;
