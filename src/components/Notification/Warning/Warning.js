import React from 'react';
import "./warning.css";
import "../notif.css";
import WarningLogo from "../../../images/warning-logo.png";
import CrossFrom from "../../../images/icon-close.png";
import {Link} from "react-router-dom";

const Warning = (props) => (
  <div className={"warning-container"}>
    <div className="warning-inner-wrapper">
      <div className="warning-title-wrapper pt-1">
        <div className="row align-items-center justify-center pb-2">
          <div className="notif-icon mr-2">
            <img src={WarningLogo} alt=""/>
          </div>
          <div className="warning-title">
            Informasi Penting!
          </div>
        </div>
        <div className="cross">
          <img src={CrossFrom} alt=""/>
        </div>
      </div>
      <div style={{marginLeft : "40px"}}>
        <div className="warning-info pb-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, obcaecati?
        </div>
        <Link to={"/"} className="notif-link pb-3">Learn More</Link>
      </div>
    </div>
  </div>
);

export default Warning;
