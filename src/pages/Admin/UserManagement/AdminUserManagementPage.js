import React, {useState, useEffect} from 'react';
import "./user-management-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {
  faEnvelope,
  faPlusSquare,
  faInbox,
  faPaperPlane,
  faFileWord,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import UserTable from "./UserTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHistory} from "react-router-dom";
import axios from "axios";

const BACKEND_BASE_PATH=process.env.REACT_APP_LOCAL_BACKEND_SERVER;

const AdminUserManagementPage = () =>{
  const history = useHistory()
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const REQUEST_URL = `${BACKEND_BASE_PATH}/api/users-role`
    const result = await axios.get(REQUEST_URL);
    setData(result.data.data)
  }

  const removeData = async (removeIndex) => {
    setData((prevState => (
      prevState.filter((element,index)=>{
        if(index !== removeIndex) return element
      })
    )))
  }

  useEffect(()=>{
    fetchData()
  }, [])

  const conditionallyCreateTable = () => {
    if(data !== null && typeof data !== "undefined"){
      return  <UserTable data={data} setData={setData} removeData={removeData}/>
    }else{
      return <div style={{display: "flex", alignContent:"center"}}>Data Kosong</div>
    }
  }

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content
        header_title={"User Management"}
      >
        <div className={"upload-surat-header"}>
          <div className="back-button-wrapper" onClick={()=> history.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size="md"/>
            <span className={"back-button ml-2"}>Kembali</span>
          </div>
        </div>
        {conditionallyCreateTable()}
      </Content>
    </div>
  )
}

export default AdminUserManagementPage;
