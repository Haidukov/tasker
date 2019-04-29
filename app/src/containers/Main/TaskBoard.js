import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { changeTaskStatus, getTasksByWorkspaceAndStudent } from '../../services/tasks.service';
import * as Statuses from '../../constants/task-statuses';
import TasksColumn from './TasksColumn';
import withLoading from '../../hocs/withLoading';
import withNotifications from '../../hocs/withNotifications';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit * 6
    }
});

class TaskBoard extends React.PureComponent {
    state = {
        tasks: []
    };

    componentDidMount() {
        this.getTasks();
    }

    async getTasks() {
        const { id, studentId } = this.props.match.params;
        try {
            this.props.showProgress();
            const { data: tasks } = await getTasksByWorkspaceAndStudent(id, studentId);
            this.setState({ tasks });
        } finally {
            this.props.hideProgress();
        }
    }

    onDrop = async (taskId, newStatus) => {
        const { studentId } = this.props.match.params;
        try {
            this.props.showProgress();
            changeTaskStatus(taskId, newStatus, studentId);

            const changedTask = this.state.tasks.find(task => task._id === taskId);
            const previousStatus = changedTask.status;

            changedTask.status = newStatus;
            const tasks = [
                ...this.state.tasks.filter(task => task._id !== taskId),
                changedTask
            ];
            this.setState({ tasks });

            changedTask.status !== previousStatus &&
            this.props.showSuccessNotification('You have moved a task');
        }
        catch (e) {
            await this.getTasks();
            this.props.showErrorNotification('Failed to move a task');
        }
         finally {
            this.props.hideProgress();
        }
    };

    render() {
        const { classes } = this.props;
        const { tasks } = this.state;
        return (
            <main className={classes.container}>
                <Grid container spacing={24}>
                    {Object.values(Statuses)
                        .map((status, index) =>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={index}
                                md={12 / Object.values(Statuses).length}
                            >
                                <TasksColumn
                                    tasks={tasks}
                                    status={status}
                                    onDrop={this.onDrop}
                                />
                            </Grid>
                        )
                    }
                </Grid>
            </main>
        )
    }
}

export default withNotifications(withLoading(withStyles(styles)(TaskBoard)));
