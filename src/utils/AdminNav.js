import {faUser, faToolbox, faArchive} from "@fortawesome/free-solid-svg-icons";
import React from "react"

const adminNav = [
  {
    path : "/admin/manage-user",
    icon : faUser,
    label : "Manage User"
  },
  {
    path : "/admin/manage-contact-book",
    icon : faToolbox,
    label : "Manage Contact book "
  },
  {
    path : "/admin/manage-roles",
    icon : faArchive,
    label : "Manage Roles"
  }
]

export default adminNav;
