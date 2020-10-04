import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bima-design/lib/bima.min.css';
import LoginContextProvider from "./contexts/LoginContext";
import DocusignLoginContextProvider from "./contexts/DocusignLoginContext";

ReactDOM.render(
  <React.StrictMode>
    <DocusignLoginContextProvider>
      <LoginContextProvider>
        <App/>
      </LoginContextProvider>
    </DocusignLoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
