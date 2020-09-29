import React from 'react';
import "./sidenav.css";
import Logo from "../../images/logo-dashboard.png";
import {Accordion, AccordionItem} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const SideNav = ()=>{
  return(
    <div className={"sidenav"}>

      <div className="row align-items-center nav-border-bottom pt-2 pb-3 pl-3">
        <Link to={"/"}>
          <img src={Logo} alt="Home"/>
        </Link>
      </div>
      <Accordion className="accordion-style">
          <AccordionItem className="accordion-style" title="Surat" id="surat-sidenav-btn">
            <ul>
              <li>
                  <Link to={"/buat-surat"} style={{textDecoration : "none", color: "#fff"}}>
                    <div className="row">
                      <FontAwesomeIcon icon={faPlusSquare} className="mr-2" color={"#748BA9"}/>
                      <label className={"cursor-pointer"}>Buat Surat</label>
                    </div>
                  </Link>
              </li>
              <li>
                <Link to={"/surat-masuk"} style={{textDecoration : "none", color: "#fff"}}>
                  <div className="row">
                    <FontAwesomeIcon icon={faInbox} className="mr-2" color={"#748BA9"}/>
                    <label className={"cursor-pointer"}>Surat Masuk</label>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={"/surat-keluar"} style={{textDecoration : "none", color: "#fff"}}>
                  <div className="row">
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" color={"#748BA9"}/>
                    <label className={"cursor-pointer"}>Surat Keluar</label>
                  </div>
                </Link>
              </li>
              <li>
                <Link to={"/draft"} style={{textDecoration : "none", color: "#fff"}}>
                  <div className="row">
                    <FontAwesomeIcon icon={faFileWord} className="mr-2" color={"#748BA9"}/>
                    <label className={"cursor-pointer"}>Draft</label>
                  </div>
                </Link>
              </li>
            </ul>
          </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SideNav;
