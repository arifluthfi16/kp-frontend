import React from 'react';
import "./content.css";
import "./react-tabs.css";
import UserProfileBadge from "../UserProfileBadge/UserProfileBadge";
import BreadcrumbWrapper from "../BreadcrumbWrapper/BreadcrumbWrapper";
import Warning from "../Notification/Warning/Warning";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TableContent from "../TableContent/TableContent";
import { Button, Input,Alert, Link} from 'bima-design';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faSearch, faPlusSquare} from "@fortawesome/free-solid-svg-icons";


const Content = (props)=>{
  return(
    <div className={"content-body-container"}>
      <div className="inner-wrapper">
        <div className="content-header">
          <div className="header-title">
            Surat Masuk
          </div>
          <div className="row">
            <Alert type={"default"}>
              <div className={"align-items-center"}>Login Docusign terlebih dahulu! <Link style={{margin: 0, cursor: "pointer"
              }}>Login</Link>
              </div>
            </Alert>
            <UserProfileBadge
              profile_picture = "../../images/sample.png"
              name = "Stella Jang"
              email = "stella@gmail.com"
            />
          </div>
        </div>
        <BreadcrumbWrapper />
        <Alert className={"mr-3 ml-3 mt-2"} closable title="Notification Title">
          <p>This is subtitle text goes here</p>
          <Link href="/">Lear More</Link>
        </Alert>
        <div className="content-wrapper">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Content;
