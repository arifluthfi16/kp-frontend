import React from 'react';
import "./user-profile-badge.css";
import SampleImage from "../../images/sample.png"

const UserProfileBadge = (props) =>{
  return (
    <div className="profile-badge ml-3 align-items-center">
      <img src={SampleImage} alt="" className="profile-picture"/>
      <div className="profile-badge-info-wrapper ml-2">
        <div className="name" style={{marginBottom: "4px"}}>
          {props.name}
        </div>
        <div className="email">
          {props.email}
        </div>
      </div>
    </div>
  )
}

export default UserProfileBadge;
