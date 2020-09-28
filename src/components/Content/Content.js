import React from 'react';
import "./content.css";
import "./react-tabs.css";
import UserProfileBadge from "../UserProfileBadge/UserProfileBadge";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Warning from "../Notification/Warning/Warning";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TableContent from "../TableContent/TableContent";
import { Button, Input,Alert} from 'bima-design';
import {Link} from "react-router-dom";

const Content = ()=>{
  return(
    <div className={"content-body-container"}>
      <div className="inner-wrapper">
        <div className="content-header">
          <div className="header-title">
            Surat Masuk
          </div>
          <UserProfileBadge
            profile_picture = "../../images/sample.png"
            name = "Stella Jang"
            email = "stella@gmail.com"
          />
        </div>
        <Breadcrumb />
        <Alert className={"mr-3 ml-3 mt-2"} closable title="Notification Title">
          <p>This is subtitle text goes here</p>
          <Link href="/">Lear More</Link>
        </Alert>
        <div className="tabs-wrapper">
          <Tabs>
            <TabList>
              <Tab>
                <div className="react-tabs-title-name">Semua Surat</div>
              </Tab>
              <Tab>
                <div className="react-tabs-title-name">Sudah Dibaca</div>
              </Tab>
            </TabList>
            <div className="ml-3 mr-3 pb-3 pt-1">
              <TabPanel>
                <div className="tab-content-wrapper">
                  <div className="row pb-1" style={{justifyContent : "space-between"}}>
                    <Input placeholder={"Cari surat.."} outline/>
                    <Button >Buat Surat</Button>
                  </div>
                  <TableContent/>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-content-wrapper">
                  HEYOOOOOOOOOOOOOOOO
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Content;
