import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import WorkspacesList from './WorkspacesList';
import WorkspaceForm from './WorkspaceForm';
import Workspace from './WorkspacePage';
import SprintForm from './SprintForm';
import SprintsList from './SpintsList';
import StudentsList from './StudentsList';
import TasksList from './TasksList';
import TaskForm from './TaskForm';
import TaskBoard from './TaskBoard';
import PropsRoute from '../../hocs/PropsRoute';

const MainRouter = ({ match }) => (
    <BrowserRouter>
        <Switch>
            <PropsRoute
                path={`${match.path}/add`}
                component={WorkspaceForm}
                match={match}
                routeTitle='Add workspace'
            />
            <PropsRoute
                path={`${match.path}/:id/add`}
                component={SprintForm}
                match={match}
                routeTitle='Add sprint'
            />
            <PropsRoute
                path={`${match.path}/:id/sprints/:sprintId/add`}
                component={TaskForm}
                match={match}
                routeTitle='Add task'
            />
            <PropsRoute
                path={`${match.path}/:id/sprints/:sprintId`}
                component={TasksList}
                match={match}
                routeTitle='Tasks'
            />
            <PropsRoute
                path={`${match.path}/:id/sprints`}
                component={SprintsList}
                match={match}
                routeTitle='Sprints'
            />
            <PropsRoute
                path={`${match.path}/:id/students/:studentId`}
                component={TaskBoard}
                match={match}
                routeTitle='Kanban Board'
            />
            <PropsRoute
                path={`${match.path}/:id/students`}
                component={StudentsList}
                match={match}
                routeTitle='Students'
            />
            <PropsRoute
                path={`${match.path}/:id`}
                component={Workspace}
                match={match}
                routeTitle='Workspace'
            />
            <PropsRoute
                exact
                path={match.path}
                component={WorkspacesList}
                match={match}
                routeTitle='Workspaces'
            />
        </Switch>
    </BrowserRouter>
);

export default MainRouter;

