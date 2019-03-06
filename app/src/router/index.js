import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import Login from '../containers/Auth/Login';
import withUser from '../hocs/withUser';

const Router = props => {
    const user = props.user.user;
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
            </Switch>
        </BrowserRouter>
    );
}

export default withUser(Router);
