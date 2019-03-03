import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SignUp from '../components/SignUp';

const Router = () => (
    <BrowserRouter>
        <Route path='/sign-up' component={SignUp} />
    </BrowserRouter>
);

export default Router;
