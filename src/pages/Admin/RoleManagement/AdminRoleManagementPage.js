import React, {useEffect, useState} from 'react';
import "./role-management-page.css";
import "./table-content.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {
  faEnvelope,
  faPlusSquare,
  faInbox,
  faPaperPlane,
  faFileWord,
  faSearch,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {useHistory} from "react-router-dom";
import RoleGroupTable from "./RoleGroupTable";


const mockData = [
  {
    group_id : 1,
    group_name : "Rektorat",
    jumlah_user_terdaftar : "20"
  },
  {
    group_id : 2,
    group_name : "Rektorat",
    jumlah_user_terdaftar : "20"
  },
  {
    group_id : 3,
    group_name : "Rektorat",
    jumlah_user_terdaftar : "20"
  },
  {
    group_id : 4,
    group_name : "Rektorat",
    jumlah_user_terdaftar : "20"
  }
]

const AdminRoleManagementPage = () =>{
  const [activeRoleGroupRow, setActiveRoleGroupRow] = useState(null);
  const [roleGroupData, setRoleGroupData] = useState([]);
  const [roleData, setRoleData] = useState(null);

  useEffect(()=>{
    setRoleGroupData(mockData)
  }, [roleGroupData])

  useEffect(()=>{
    console.log("Fetching new role data by group id : ", activeRoleGroupRow)
  }, [activeRoleGroupRow])

  const conditionallyPrintRoleGroupTable = () =>{
    return (
      <RoleGroupTable
        data={roleGroupData}
        activeRow = {activeRoleGroupRow}
        setActiveRow = {setActiveRow}
      />
    )
  }

  const setActiveRow = (id) =>{
    setActiveRoleGroupRow(id)
  }

  const conditionallyPrintRoleTable = () =>{
    return (
      <table className={"table-content"} width={"100%"}>
        <tr>
          <th width="25%">Nama Role</th>
          <th width="25%">Jumlah User Terdaftar</th>
          <th width="20%">Aksi</th>
        </tr>
        <tr>
          <td>Rektorat</td>
          <td>10</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Rektorat</td>
          <td>10</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Rektorat</td>
          <td>10</td>
          <td>10</td>
        </tr>
        {/*{conditionallyPrintTable()}*/}
      </table>
    )
  }

  const history = useHistory();
  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"Role Management"}
      >
        <div className={"upload-surat-header"}>
          <div className="back-button-wrapper" onClick={()=> history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size="md"/>
            <span className={"back-button ml-2"}>Kembali</span>
          </div>
        </div>

        <div className="table-container">
          <div className={"column"}>
              {conditionallyPrintRoleGroupTable()}
          </div>
          <div className={"column"}>
              {conditionallyPrintRoleTable()}
          </div>

        </div>

      </Content>
    </div>
  )
}

export default AdminRoleManagementPage;
