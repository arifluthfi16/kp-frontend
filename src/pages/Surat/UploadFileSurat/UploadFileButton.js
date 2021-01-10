import React, {useCallback} from "react";
// import Dropzone ,{useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

// const UploadFileButton = (props) => {
//
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     isDragAccept,
//     isDragReject
//   } = useDropzone();
//
//   const getColor = (props) => {
//     if (props.isDragAccept) {
//       return '#00e676';
//     }
//     if (props.isDragReject) {
//       return '#ff1744';
//     }
//     if (props.isDragActive) {
//       return '#2196f3';
//     }
//     return '#eeeeee';
//   }
//
//   const Container = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   border-width: 2px;
//   border-radius: 2px;
//   border-color: ${props => getColor(props)};
//   border-style: dashed;
//   background-color: #fafafa;
//   color: #bdbdbd;
//   outline: none;
//   transition: border .24s ease-in-out;
// `;
//
//   return (
//     <div className="container">
//       <Container>
//         <Dropzone onDrop={acceptedFiles => props.handleOnDrop(acceptedFiles)}>
//           {({getRootProps, getInputProps}) => (
//             <section>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <p>Drag file atau klik untuk mengupload file</p>
//               </div>
//             </section>
//           )}
//         </Dropzone>
//       </Container>
//     </div>
//   )
// }

const UploadFileButton = (props) => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  const handleFileWhenStatusReady = ({ meta, file }, status) => {
    if(status === "done"){
      props.handleOnDrop(file)
    }

    if(status === "removed"){
      props.handleOnRemove(file)
    }

  }

  // receives array of files that are done uploading when submit button is clicked

  return (
    <Dropzone
      onChangeStatus={handleFileWhenStatusReady}
      autoUpload={false}
      accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
    />
  )
}

export default UploadFileButton;
