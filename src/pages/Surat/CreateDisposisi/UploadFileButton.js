import React, {useCallback} from "react";
import Dropzone ,{useDropzone} from 'react-dropzone';
import styled from 'styled-components';


const UploadFileButton = (props) => {

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone();

  const getColor = (props) => {
    if (props.isDragAccept) {
      return '#00e676';
    }
    if (props.isDragReject) {
      return '#ff1744';
    }
    if (props.isDragActive) {
      return '#2196f3';
    }
    return '#eeeeee';
  }

  const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

  return (
    <div className="container">
      <Container>
        <Dropzone onDrop={acceptedFiles => props.handleOnDrop(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag file atau klik untuk mengupload file</p>
              </div>
            </section>
          )}
        </Dropzone>
      </Container>
    </div>
  )
}

export default UploadFileButton;
