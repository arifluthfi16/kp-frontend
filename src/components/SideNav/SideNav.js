import React from 'react';
import "./sidenav.css";
import Logo from "../../images/logo-dashboard.png";
import {Accordion, AccordionItem} from "bima-design";


const SideNav = ()=>{
  return(
    <div className={"sidenav"}>

      <div className="row align-items-center nav-border-bottom pt-2 pb-2 pl-3">
        <img src={Logo} alt="asdasd"/>
      </div>
      <Accordion className="accordion-style">
        <AccordionItem className="accordion-style" title="Surat" id="surat-sidenav-btn">
            <ul>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
            </ul>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default SideNav;
