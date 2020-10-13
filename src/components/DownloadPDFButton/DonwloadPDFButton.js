import React from 'react';
import {Button} from "bima-design";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";
import "./download-pdf-button.js.css"

const DownloadPDFButton = (props) =>{
  // Create Default Download Handler

  return (
    <div className="download-pdf-button-wrapper" onClick={props.handleDownload}>
      <div className="row justify-center mb-2">
        <FontAwesomeIcon icon={faFilePdf} size={"5x"}/>
      </div>

      <div className="row justify-center mb-1">
        <Button
          kind={"primary"}
          size={"default"}
        >
          Download File
        </Button>
      </div>

      <div className="row justify-center">
        <p className={"filename"}>
          {props.filename}
        </p>
      </div>
    </div>
  )
}

export default DownloadPDFButton;

