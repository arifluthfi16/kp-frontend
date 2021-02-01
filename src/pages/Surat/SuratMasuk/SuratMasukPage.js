import React, {useContext, useEffect, useState} from 'react';
import "./surat-masuk-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faPlusSquare, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import TableSuratMasuk from "./TableSuratMasuk";
import {DocusignLoginContext} from "../../../contexts/DocusignLoginContext";
import axios from "axios"
import { css } from "@emotion/core";
import RotateLoader from "react-spinners/RotateLoader";
import SuratKeluarTable from "../SuratKeluar/SuratKeluarTable";
import Select from "react-select";

const SuratMasukPage = (props) =>{
  const {docuContext} = useContext(DocusignLoginContext);
  const [dataSurat, setDataSurat] = useState({
    data : null,
    isFetching : true,
    access_token : null,
    account_id : null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchComponent, setSearchComponent] = useState("");
  const [searchResults, setSearchResults] = useState({
    data : null
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

    console.log("USE EFFECT CALLED")

    return (()=>{
      console.log("UNMOUNTED")
    })
  }, [docuContext.login]);

  useEffect(()=>{
    if(dataSurat.data) {
      const filteredData = dataSurat.data.envelopes.filter(item => {

        let mappedComponent = ['perihal','email','tanggal']

        if(searchComponent && searchComponent.length > 0){
          mappedComponent = searchComponent.map((el)=> el.value)
        }

        let flags = {
          perihal : false,
          nama : false,
          tanggal :false
        }

        if (!searchComponent || searchComponent.length === 0) {
          console.log("Search component is null, search by all element")
          flags.perihal = item.emailSubject.toLowerCase().includes(searchTerm.toLowerCase())
          flags.nama = item.sender.userName.toLowerCase().includes(searchTerm.toLowerCase())
          flags.tanggal = dateParser(item.sentDateTime).toLowerCase().includes(searchTerm.toLowerCase())
        }else {
          // Map Search component
          if(mappedComponent.includes("perihal")){
            flags.perihal = item.emailSubject.toLowerCase().includes(searchTerm.toLowerCase())
          }

          if(mappedComponent.includes("nama")){
            flags.nama = item.sender.userName.toLowerCase().includes(searchTerm.toLowerCase())
          }

          if(mappedComponent.includes("tanggal")){
            flags.tanggal = dateParser(item.sentDateTime).toLowerCase().includes(searchTerm.toLowerCase())
          }
        }

        let evalString = ""
        for (let i=0; i < mappedComponent.length ; i++) {
          if(i===mappedComponent.length-1){
            evalString += `${flags[mappedComponent[i]]}`
          }else{
            evalString += `${flags[mappedComponent[i]]} ||`
          }
        }

        console.log(`Final Eval String : ${evalString} => ${eval(evalString)}`)
        return eval(evalString)
      })
      setSearchResults({
        data : {
          ...dataSurat,
          envelopes : filteredData
        }
      })
    }
  }, [searchTerm, searchComponent])

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

  const handleSearchChange = (event) =>{
    setSearchTerm(event.target.value)
  }

  const fetchDataSurat = async () =>{
    if(!docuContext.profile.accounts[0].account_id) return;

    let url = "http://localhost:3001/api/surat/masuk";
    let data = {
      access_token : docuContext.auth.access_token,
      account_id : docuContext.profile.accounts[0].account_id
    }

    try{
      setFetch(true);
      let response =  await axios({url, method : "post", data});
      setDataSurat({
        data: response.data,
        isFetching: false,
        access_token : docuContext.auth.access_token,
        account_id : docuContext.profile.accounts[0].account_id,
        signerEmail : docuContext.profile.email,
        signerName : docuContext.profile.family_name
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
        return <TableSuratMasuk data={dataSurat.data}/>
      }else{
        console.log(searchResults.data)
        return <TableSuratMasuk data={searchResults.data}/>
      }
    }
  }

  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content
        header_title = {"Surat Masuk"}
        crumbList = {[{
          name : "Surat Masuk",
          link : "/surat-masuk"
        }]}
      >
        <Tabs>
          <TabList>
            <Tab>
              <div className="react-tabs-title-name">Surat Masuk</div>
            </Tab>
            {/*<Tab>*/}
            {/*  <div className="react-tabs-title-name">Sudah Dibaca</div>*/}
            {/*</Tab>*/}
          </TabList>
          <div className="ml-3 mr-3 pb-3 pt-1 mt-2 mb-2">
            <TabPanel>
              <div className="tab-content-wrapper">
                <div className="row pb-1 mb-1" style={{justifyContent : "start"}}>
                  <Input
                    placeholder={"Cari surat.."}
                    outline
                    icon={<FontAwesomeIcon icon={faSearch}/>}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  <div
                    className={"ml-1"}
                    style={{minWidth : "200px"}}
                  >
                    <Select
                      onChange={(e)=> {
                        setSearchComponent(e)
                      }}
                      isMulti
                      placeholder={'Cari Berdasarkan'}
                      options={[
                        { value: 'perihal', label: 'Perihal' },
                        { value: 'nama', label: 'Nama' },
                        { value: 'tanggal', label: 'Tanggal' }
                      ]}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          // borderStyle: 'none',
                          border: '1px solid #9daabf', // default border color
                        }),
                      }}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 4,
                        colors: {
                          ...theme.colors,
                          primary25: '#F5F8FF',
                          primary: '#748ba9',
                        },
                        spacing : {
                          baseUnit : 4,
                          controlHeight: 40,
                        }
                      })}
                    />
                  </div>
                </div>
                {conditionallyPrintTable()}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </Content>
    </div>
  )
}

export default SuratMasukPage;
