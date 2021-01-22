import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {LoginContext} from  "../../contexts/LoginContext";

const AdminRoute = ({ component: Component, ...rest }) => {

  // Check For Login
  let isAdminLogin = null;
  let user = JSON.parse(localStorage.getItem("auth"));
  if(user){
    isAdminLogin = true;
  }else{
    isAdminLogin = false;
  }

  return (
    <Route exact {...rest} render={
      props => {
        if (isAdminLogin) {
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

export default AdminRoute;
