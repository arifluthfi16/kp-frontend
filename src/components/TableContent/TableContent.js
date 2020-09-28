import React from "react";
import "./table-content.css";
import { Button } from 'bima-design';


const TableContent = () =>{
  return  (
    <table className={"table-content"} width={"100%"}>
      <tr>
        <th width="30%">Perihal</th>
        <th width="25%">Tanggal Kirim</th>
        <th width="20%">Penerima</th>
        <th width="10%">Status</th>
        <th width="15%">Aksi</th>
      </tr>
      <tr>
        <td>Info Beasiswa BNI - Unikom..</td>
        <td>2 Des 2020</td>
        <td>UNIKOM</td>
        <td>Terikim</td>
        <td>
          <div className="row justify-center" style={{margin: "0px 16px"}}>
            <Button className="mr-2" size={"small"}>Detail</Button>
            <Button size={"small"} kind={"danger"}>Delete</Button>
          </div>
        </td>
      </tr>
    </table>
  )
}

export default TableContent;
