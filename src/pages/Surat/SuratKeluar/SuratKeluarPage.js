import React from 'react';
import "./surat-keluar-page.css";
import SideNav from "../../../components/SideNav/SideNav";
import Content from "../../../components/Content/Content";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {Button, Input} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faSearch} from "@fortawesome/free-solid-svg-icons";
import TableContent from "../../../components/TableContent/TableContent";
import SuratKeluarTable from "./SuratKeluarTable";

const SuratKeluarPage = () =>{
  return (
    <div className={"dashboard-container"}>
        <SideNav/>
      <Content header_title={"Surat Keluar"}>
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
                  />
                  <Button
                    icon={<FontAwesomeIcon icon={faPlusSquare}/>}
                  >Buat Surat</Button>
                </div>
                <SuratKeluarTable/>
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
