import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import { Login } from '../components/EnviarEmail/EnviarEmail';
import { Dashboard } from '../page/Dashboard/Dashboard';
import { UsuariosForm } from '../page/PasswordForm/PasswordForm';

export default function PrivateRoute(){
    return(
        <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/updatepassword" component={UsuariosForm} />
        </Switch>
    )
}