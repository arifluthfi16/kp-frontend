import React from "react";
import "./draft-table.css";
import { Button } from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faInfo, faEdit} from "@fortawesome/free-solid-svg-icons";


const DraftTable = (props) =>{
  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Terakhir Diubah</th>
        <th width="20%">Penerima</th>
        <th width="15%">Aksi</th>
      </tr>
      <tr className={"viewed"}>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>-</td>
        <td>
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faEdit}/>}
            >Lanjutkan</Button>
            <Button
              size={"small"}
              kind={"danger"}
              icon={<FontAwesomeIcon icon={faTrash}/>}
            >Delete</Button>
          </div>
        </td>
      </tr>
      <tr >
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>-</td>
        <td>
          <div className="row justify-space-between" style={{margin: "0px 16px"}}>
            <Button
              className="mr-2"
              size={"small"}
              icon={<FontAwesomeIcon icon={faEdit}/>}
            >Lanjutkan</Button>
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

export default DraftTable;
