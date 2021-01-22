import React, {useState, useEffect, useContext} from 'react';
import "./sidenav.css";
import Logo from "../../images/logo-dashboard.png";
import {Accordion, AccordionItem, Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import userNav from "../../utils/UserNav";
import adminNav from "../../utils/AdminNav";
import {LoginContext} from "../../contexts/LoginContext";

const SideNav = (props)=>{

  const {user} = useContext(LoginContext)
  let listToRender = null;

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

  // useEffect(()=>{
  //   listToRender = renderList()
  //   console.log(listToRender)
  // })

  const renderList = () =>{
    if(!user) return
    if(user.roles[0] === "admin"){
      return adminNav.map((el,index)=>{
        return (
          <li>
            <Link to={`${el.path}`} style={{textDecoration : "none", color: "#fff"}}>
              <div className="row">
                <FontAwesomeIcon icon={el.icon} className="mr-2" color={"#748BA9"}/>
                <label className={"cursor-pointer"}>{el.label}</label>
              </div>
            </Link>
          </li>
        )
      })
    }else if(user.roles[0] === "user"){
      return userNav.map((el,index)=>{
        return (
          <li>
            <Link to={`${el.path}`} style={{textDecoration : "none", color: "#fff"}}>
              <div className="row">
                <FontAwesomeIcon icon={el.icon} className="mr-2" color={"#748BA9"}/>
                <label className={"cursor-pointer"}>{el.label}</label>
              </div>
            </Link>
          </li>
        )
      })
    }else{
      return null
    }

  }

  return(
    <div className={"sidenav"}>
      <div className="row align-items-center nav-border-bottom pt-2 pb-3 pl-3">
        <Link to={props.homePath}>
          <img src={Logo} alt="Home"/>
        </Link>
      </div>
      <div className="ml-1 mt-2">
        <ul className={""}>
          {renderList()}
        </ul>
      </div>

    </div>
  )
}

export default SideNav;
