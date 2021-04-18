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
import axios from "axios";
import RoleTable from "./RoleTable";
const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

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
];

const AdminRoleManagementPage = () =>{
  const [activeRoleGroupRow, setActiveRoleGroupRow] = useState(null);
  const [roleGroupData, setRoleGroupData] = useState([]);
  const [roleData, setRoleData] = useState(null);

  useEffect( ()=>{
    fetchGroupData()
  }, [])

  useEffect(()=>{
    fetchRoleData(activeRoleGroupRow)
  }, [activeRoleGroupRow])

  const fetchGroupData = async () => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/group`;
    const result = await axios.get(REQUEST_URL)
    setRoleGroupData(result.data.data)
  }

  const fetchRoleData = async (group_id) => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/${group_id}/roles/`;
    const result = await axios.get(REQUEST_URL)
    setRoleData(result.data.data)
  }

  const removeGroupData = async (group_id) => {
    setActiveRoleGroupRow(null)
    setRoleGroupData((prevState => (
      prevState.filter((element,index)=>{
        if(element.id !== group_id) return element
      })
    )))
  }

  const removeRoleData = async (role_id) => {
    setRoleData((prevState => (
      prevState.filter((element,index)=>{
        if(element.id !== role_id) return element
      })
    )))
  }

  const conditionallyPrintRoleGroupTable = () =>{
    return (
      <RoleGroupTable
        data={roleGroupData}
        activeRow = {activeRoleGroupRow}
        setActiveRow = {setActiveRow}
        removeItem = {removeGroupData}
      />
    )
  }

  const setActiveRow = (id) =>{
    setActiveRoleGroupRow(id)
  }

  const conditionallyPrintRoleTable = () =>{
    return (
      <RoleTable
        activeRow = {activeRoleGroupRow}
        data={roleData}
        removeItem = {removeRoleData}
      />
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
