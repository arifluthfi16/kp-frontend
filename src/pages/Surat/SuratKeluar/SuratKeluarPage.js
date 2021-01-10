import React, {useContext, useEffect, useState} from 'react';
import "./surat-keluar-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSearch} from "@fortawesome/free-solid-svg-icons";
import TableContent from "../../../components/TableContent/TableContent";
import SuratKeluarTable from "./SuratKeluarTable";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios";
import RotateLoader from "react-spinners/RotateLoader";

const SuratKeluarPage = () =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const [dataSurat, setDataSurat] = useState({
    data : null,
    isFetching : true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    data : null
  });

  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const setFetch = (newStatus) =>{
    setDataSurat(prevState => ({
        ...prevState,
        isFetching: newStatus
      })
    )}

  useEffect(()=>{
    if(docuContext.login && docuContext.profile.accounts){
      fetchDataSurat();
    }
  }, [docuContext.login]);

  useEffect(()=>{
    if(dataSurat.data) {
      const filteredData = dataSurat.data.envelopes.filter(item => {
        return item.emailSubject.toLowerCase().includes(searchTerm) || item.sender.userName.toLowerCase().includes(searchTerm)
      })
      setSearchResults({
        data : {
          ...dataSurat,
          envelopes : filteredData
        }
      })
    }
  }, [searchTerm])

  const fetchDataSurat = async () =>{
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/surat/keluar";
    let data = {
      access_token : docuContext.auth.access_token,
      account_id : docuContext.profile.accounts[0].account_id
    }

    try{
      setFetch(true);
      let response =  await axios({url, method : "post", data});
      setDataSurat({
        data: response.data,
        isFetching: false
      })
    }catch(error){
      setDataSurat({
        data: null,
        isFetching: false
      })
    }
  }

  const conditionallyPrintTable = () =>{
    if(dataSurat.isFetching && !dataSurat.data){
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
        return <SuratKeluarTable data={dataSurat.data}/>
      }else{
        return <SuratKeluarTable data={searchResults.data}/>
      }
    }
  }

  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content
        header_title={"Surat Keluar"}
        crumbList = {[{
          name : "Surat Keluar",
          link : "/surat-keluar"
        }]}
      >
        <Tabs>
          <TabList>
            <Tab>
              <div className="react-tabs-title-name">Surat Terkirim</div>
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
                  {/*<Button*/}
                  {/*  icon={<FontAwesomeIcon icon={faPlusSquare}/>}*/}
                  {/*>Buat Surat</Button>*/}
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

export default SuratKeluarPage;
