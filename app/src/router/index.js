import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import Login from "../containers/Auth/Login";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/sign-up' component={SignUp} />
            <Route path='/login' component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Router;
