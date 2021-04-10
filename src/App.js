import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SuratMasukPage from "./pages/Surat/SuratMasuk/SuratMasukPage";
import axios from 'axios';
import BuatSuratPage from "./pages/Surat/BuatSurat/BuatSuratPage";
import SuratKeluarPage from "./pages/Surat/SuratKeluar/SuratKeluarPage";
import DocusignProfilePage from "./pages/DocusignProfile/DocusignProfilePage";
import DetailSuratPage from "./pages/Surat/DetailSurat/DetailSuratPage";
import UploadFileSuratPage from "./pages/Surat/UploadFileSurat/UploadFileSuratPage";
import Draft from "./pages/Surat/Draft/DraftPage";
import ProcessDocusignCode from "./pages/ProcessDocusignCode/ProcessDocusignCode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminDashboardPage from "./pages/Admin/Dashboard/AdminDashboardPage";
import EditUserPage from "./pages/Admin/UserManagement/EditUser/EditUserPage";
import { createBrowserHistory } from "history";



// Context and Providers
import {LoginContext} from "./contexts/LoginContext";
import {DocusignLoginContext} from "./contexts/DocusignLoginContext";
import SuratDisposisiMasuk from "./pages/Surat/SuratDisposisiMasuk/SuratDisposisiMasuk";
import SuratDisposisiKeluar from "./pages/Surat/SuratDisposisiKeluar/SuratDisposisiKeluar";
import CreateDisposisi from "./pages/Surat/CreateDisposisi/CreateDisposisi";
import AdminContactBookManagementPage from "./pages/Admin/ContactBookManagement/AdminContactBookManagementPage";
import AdminUserManagementPage from "./pages/Admin/UserManagement/AdminUserManagementPage";
import AdminRoleManagementPage from "./pages/Admin/RoleManagement/AdminRoleManagementPage";

const App = () => {
  const {docuContext, checkDocuLogin} = useContext(DocusignLoginContext);
  const {login, checkLogin} = useContext(LoginContext)

  useEffect(()=>{
    checkDocuLogin();
  }, [docuContext.login]);

  useEffect(()=>{
    checkLogin()
  }, [login])

  const history = createBrowserHistory();
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path={"/login"} component={LoginPage}/>
          <ProtectedRoute exact path={"/"} component={DashboardPage}/>
          <ProtectedRoute exact path={"/surat-masuk"} component={SuratMasukPage}/>
          <ProtectedRoute exact path={"/buat-surat"} component={BuatSuratPage}/>
          <ProtectedRoute path={"/buat-disposisi/:id"} component={CreateDisposisi}/>
          <ProtectedRoute exact path={"/surat-keluar"} component={SuratKeluarPage}/>
          <ProtectedRoute exact path={"/draft"} component={Draft}/>
          <ProtectedRoute exact path={"/proses-login"} component={ProcessDocusignCode}/>
          <ProtectedRoute exact path={"/docusign-profile"} component={DocusignProfilePage}/>
          <ProtectedRoute exact path={"/buat-surat/upload-surat"} component={UploadFileSuratPage}/>
          <ProtectedRoute exact path={"/surat-disposisi-masuk"} component={SuratDisposisiMasuk}/>
          <ProtectedRoute exact path={"/surat-disposisi-keluar"} component={SuratDisposisiKeluar}/>
          <ProtectedRoute path={"/detail-surat/"} component={DetailSuratPage}/>
          <AdminRoute exact path="/admin" component={AdminDashboardPage}/>
          <AdminRoute exact path={"/admin/manage-contact-book"} component={AdminContactBookManagementPage}/>
          <AdminRoute exact path={"/admin/manage-user"} component={AdminUserManagementPage}/>
          <AdminRoute exact path={"/admin/manage-roles"} component={AdminRoleManagementPage}/>
          <AdminRoute exact path={"/admin/manage-user/edit"} component={EditUserPage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
