import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import Login from '../containers/Auth/Login';
import withUser from '../hocs/withUser';
import Layout from '../containers/Main/Layout';

const Router = props => {
    const user = props.user.user;
    console.log(props.user.user);
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' component={SignUp}/>
                <Route path='/login' component={Login}/>
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
