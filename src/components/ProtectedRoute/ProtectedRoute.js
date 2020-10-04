import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {LoginContext} from  "../../contexts/LoginContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  // Check For Login
  let login = null;
  let user = JSON.parse(localStorage.getItem("auth"));
  if(user){
    login = true;
  }else{
    login = false;
  }

  return (
    <Route exact {...rest} render={
      props => {
        if (login) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
