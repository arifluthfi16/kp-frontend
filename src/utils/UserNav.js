import {
  faEnvelope,
  faPlusSquare,
  faInbox,
  faPaperPlane,
  faFileWord,
  faArchive
} from "@fortawesome/free-solid-svg-icons";
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
    path : "/surat-keluar",
    icon : faPaperPlane,
    label : "Surat Keluar"
  },
  // {
  //   path : "/arsip-surat",
  //   icon : faArchive,
  //   label : "Arsip Surat"
  // },
  {
    path : "/surat-disposisi-masuk",
    icon : faInbox,
    label : "Surat Disposisi Masuk"
  },
  {
    path : "/surat-disposisi-keluar",
    icon : faPaperPlane,
    label : "Surat Disposisi Keluar"
  },
  // {
  //   path : "/arsip-disposisi",
  //   icon : faArchive,
  //   label : "Arsip Disposisi"
  // },
  {
    path : "/docusign-profile",
    icon : faPaperPlane,
    label : (<>Profile Docusign <strong style={{color:"yellow"}}>[DEV]</strong></>)
  },

]

export default userNav;
