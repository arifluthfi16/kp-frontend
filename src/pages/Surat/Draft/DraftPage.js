import React, {useContext, useEffect, useState} from 'react';
import "./draft-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSearch} from "@fortawesome/free-solid-svg-icons";
import DraftTable from "./DraftTable";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios";
import RotateLoader from "react-spinners/RotateLoader";

const Draft = () =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const [dataSurat, setDataSurat] = useState({
    data : null,
    isFetching : true
  });

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

  const fetchDataSurat = async () =>{
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/surat/draft";
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
      return <DraftTable data={dataSurat.data}/>
    }
  }

  return (
    <div className={"dashboard-container"}>
      <SideNav/>
      <Content header_title={"Draft"}>
        <Tabs>
          <TabList>
            <Tab>
              <div className="react-tabs-title-name">Semua Draft</div>
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
                  />
                  <Button
                    icon={<FontAwesomeIcon icon={faPlusSquare}/>}
                  >Buat Surat</Button>
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

export default Draft;
