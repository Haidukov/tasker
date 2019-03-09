import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WorkspacesList from './WorkspacesList';
import WorkspaceForm from './WorkspaceForm';

const router = ({ match }) => {
    return (
    <BrowserRouter>
        <Switch>
            <Route
                path={`${match.path}/add`}
                component={WorkspaceForm}
                match={match}
            />
            <Route
                exact
                path={match.path}
                component={WorkspacesList}
                match={match}
            />
        </Switch>
    </BrowserRouter>
)};

export default router;

