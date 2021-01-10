import React, {useState, useEffect, useContext} from 'react';
import "./sidenav.css";
import Logo from "../../images/logo-dashboard.png";
import {Accordion, AccordionItem, Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const SideNav = ()=>{

  const [navOpen, setNavOpen] = useState(()=>{
    let curState = localStorage.getItem("sidenav");
    if(curState === "true"){
      return true
    }
    return false
  });

  function handleSidenavOnClick(){
    let curState = localStorage.getItem("sidenav");
    if(curState === null){
      setNavOpen(true)
      localStorage.setItem("sidenav", true);
    }else{
      let newState = !navOpen;
      setNavOpen(newState)
      localStorage.setItem("sidenav", newState);
    }
  }

  function handleChildOnClick(e){
    e.stopPropagation();
    return;
  }

  return(
    <div className={"sidenav"}>
      <div className="row align-items-center nav-border-bottom pt-2 pb-3 pl-3">
        <Link to={"/"}>
          <img src={Logo} alt="Home"/>
        </Link>
      </div>
      <div className="ml-1 mt-2">
        <ul className={""}>
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
            <Link to={"/surat-disposisi-masuk"} style={{textDecoration : "none", color: "#fff"}}>
              <div className="row">
                <FontAwesomeIcon icon={faInbox} className="mr-2" color={"#748BA9"}/>
                <label className={"cursor-pointer"}>Surat Disposisi Masuk</label>
              </div>
            </Link>
          </li>
          {/*<li>*/}
          {/*  <Link to={"/draft"} style={{textDecoration : "none", color: "#fff"}}>*/}
          {/*    <div className="row">*/}
          {/*      <FontAwesomeIcon icon={faFileWord} className="mr-2" color={"#748BA9"}/>*/}
          {/*      <label className={"cursor-pointer"}>Draft</label>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</li>*/}
          <li>
            <Link to={"/docusign-profile"} style={{textDecoration : "none", color: "#fff"}}>
              <div className="row">
                <FontAwesomeIcon icon={faPlusSquare} className="mr-2" color={"#748BA9"}/>
                <label className={"cursor-pointer"}>Profile Docusign <strong style={{color:"yellow"}}>[DEV]</strong></label>
              </div>
            </Link>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default SideNav;
