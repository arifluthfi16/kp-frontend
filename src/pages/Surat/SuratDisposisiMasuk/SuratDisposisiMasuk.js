import React, {useContext, useEffect, useState} from 'react';
import "./surat-disposisi-masuk-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faPlusSquare, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import TableDisposisi from "./TableDisposisi";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios"
import { css } from "@emotion/core";
import RotateLoader from "react-spinners/RotateLoader";
import {LoginContext} from "../../../contexts/LoginContext";

const SuratDisposisiMasuk = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const {user} = useContext(LoginContext);
  const [dataDisposisi, setDataDisposisi] = useState({
    data : null,
    isFetching : true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    data : null
  });

  const setFetch = (newStatus) =>{
    setDataDisposisi(prevState => ({
        ...prevState,
        isFetching: newStatus
      })
  )}

  useEffect(()=>{
    if(docuContext.login && docuContext.profile.accounts){
      fetchDataSurat();
    }

    return (()=>{
      console.log("UNMOUNTED")
    })
  }, [docuContext.login]);

  useEffect(()=>{
    if(dataDisposisi.data) {
      const filteredData = dataDisposisi.data.envelopes.filter(item => {
        return item.emailSubject.toLowerCase().includes(searchTerm) || item.sender.userName.toLowerCase().includes(searchTerm)
      })
      setSearchResults({
        data : {
          ...dataDisposisi,
          envelopes : filteredData
        }
      })
    }
  }, [searchTerm])

  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const fetchDataSurat = async () =>{
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/surat/get-disposisi";
    let data = {
      userId : user.id
    }

    try{
      setFetch(true);
      let response =  await axios({url, method : "post", data});
      console.log(response.data.data)
      setDataDisposisi({
        data: response.data.data,
        isFetching: false,
      })
    }catch(error){
      setDataDisposisi({
        data: null,
        isFetching: false
      })
    }
  }

  const conditionallyPrintTable = () =>{
    if(dataDisposisi.isFetching && !dataDisposisi.data){
      return (
        <div className={"loading-spinner-container"}>
          <RotateLoader
            color={"#001D3A"}
            size={20}
            margin={20}
          />
        </div>
      )
    }else{
      if(searchTerm === ""){
        return <TableDisposisi data={dataDisposisi.data}/>
      }else{
        return <TableDisposisi data={searchResults.data}/>
      }
    }
  }

  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content
        header_title = {"Surat Disposisi Masuk"}
        crumbList = {[{
          name : "Surat Disposisi Masuk",
          link : "/surat-disposisi-masuk"
        }]}
      >
        <Tabs>
          <TabList>
            <Tab>
              <div className="react-tabs-title-name">Surat Disposisi Masuk</div>
            </Tab>
            {/*<Tab>*/}
            {/*  <div className="react-tabs-title-name">Sudah Dibaca</div>*/}
            {/*</Tab>*/}
          </TabList>
          <div className="ml-3 mr-3 pb-3 pt-1 mt-2 mb-2">
            <TabPanel>
              <div className="tab-content-wrapper">
                <div className="row pb-1 mb-1" style={{justifyContent : "space-between"}}>
                  <Input
                    placeholder={"Cari surat.."}
                    outline
                    icon={<FontAwesomeIcon icon={faSearch}/>}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                {conditionallyPrintTable()}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="tab-content-wrapper">
                HEYOOOOOOOOOOOOOOOO
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </Content>
    </div>
  )
}

export default SuratDisposisiMasuk;
