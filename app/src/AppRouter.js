import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import SignUp from './containers/SignUp';

const AppRouter = () => (
    <Router>
        <Route path="/sign-up" component={SignUp} />
    </Router>
);

export default AppRouter;