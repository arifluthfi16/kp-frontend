import React from 'react';
import "./breadcrumb.css";
import {Link} from 'react-router-dom'

const Breadcrumb = (props) =>{
  return (
    <div className="content-breadcrumb">
      <Link to={"/"}>Home</Link>
    </div>
  )
}

export default Breadcrumb;
