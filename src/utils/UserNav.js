import {faEnvelope, faPlusSquare, faInbox, faPaperPlane, faFileWord} from "@fortawesome/free-solid-svg-icons";
import React from "react"

const userNav = [
  {
    path : "/buat-surat",
    icon : faPlusSquare,
    label : "Buat Surat"
  },
  {
    path : "/surat-masuk",
    icon : faInbox,
    label : "Surat Masuk"
  },
  {
    path : "/surat-Keluar",
    icon : faPaperPlane,
    label : "Surat Keluar"
  },
  {
    path : "/surat-disposisi-masuk",
    icon : faInbox,
    label : "Surat Disposisi Masuk"
  },
  {
    path : "/docusign-profile",
    icon : faPlusSquare,
    label : (<>Profile Docusign <strong style={{color:"yellow"}}>[DEV]</strong></>)
  },
]

export default userNav;
