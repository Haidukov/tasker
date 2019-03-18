import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WorkspacesList from './WorkspacesList';
import WorkspaceForm from './WorkspaceForm';
import Workspace from './WorkspacePage';
import SprintForm from './SprintForm';
import SprintsList from './SpintsList';
import StudentsList from './StudentsList';

const workspaceRouter = ({ match }) => {
    return (
    <BrowserRouter>
        <Switch>
            <Route
                path={`${match.path}/add`}
                component={WorkspaceForm}
                match={match}
            />
            <Route
                path={`${match.path}/:id/add`}
                component={SprintForm}
                match={match}
            />
            <Route
                path={`${match.path}/:id/sprints`}
                component={SprintsList}
                match={match}
            />
            <Route
                path={`${match.path}/:id/students`}
                component={StudentsList}
                match={match}
            />
            <Route
                path={`${match.path}/:id`}
                component={Workspace}
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

export default workspaceRouter;

