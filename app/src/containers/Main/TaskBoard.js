import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { changeTaskStatus, getTasksByWorkspace, getTasksByWorkspaceAndStudent } from '../../services/tasks.service';
import * as Statuses from '../../constants/task-statuses';
import TasksColumn from './TasksColumn';

const styles = theme => ({
    container: {
        padding: theme.spacing.unit * 6
    }
});

class TaskBoard extends React.Component {
    state = {
        tasks: []
    };

    componentDidMount() {
        const { id, studentId } = this.props.match.params;
        getTasksByWorkspaceAndStudent(id, studentId)
            .then(({ data }) => {
                this.setState({
                    tasks: data
                })
            });
    }

    onDrop = (taskId, newStatus) => {
        const { studentId } = this.props.match.params;
        changeTaskStatus(taskId, newStatus, studentId)
            .then(() => {
                const changedTask = this.state.tasks.find(task => task._id === taskId);
                changedTask.status = newStatus;
                const tasks = [
                    ...this.state.tasks.filter(task => task._id !== taskId),
                    changedTask
                ];
                this.setState({ tasks })
            });
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

export default withStyles(styles)(TaskBoard);
