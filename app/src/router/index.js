import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import Login from '../containers/Auth/Login';
import UserContext from '../contexts/UserContext';

const Router = () => (
    <UserContext.Consumer>
        {user => (
            <BrowserRouter>
                <Switch>
                    <Route path='/sign-up' component={SignUp}/>
                    <Route path='/login' component={Login}/>
                    <Route exact path='/' render={() => (
                        user ?
                            <Redirect to='/dashboard'/> :
                            <Redirect to='/login'/>
                    )}/>
                </Switch>
            </BrowserRouter>
        )}
    </UserContext.Consumer>
);

export default Router;
