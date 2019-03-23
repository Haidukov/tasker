import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import Login from '../containers/Auth/Login';
import withUser from '../hocs/withUser';
import Layout from '../containers/Main/Layout';
import ConfirmInvite from '../containers/Auth/ConfirmInvite';

const Router = props => {
    const { user: user } = props;
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' component={SignUp}/>
                <Route path='/login' component={Login}/>
                <Route path='/confirm/:id' component={ConfirmInvite}/>
                <Route exact path='/' render={() => (
                    user ?
                        <Redirect to='/dashboard'/> :
                        <Redirect to='/login'/>
                )}/>
                <Route path='/dashboard' component={Layout}/>
            </Switch>
        </BrowserRouter>
    );
}

export default withUser(Router);
