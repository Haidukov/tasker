import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as _ from 'lodash';
import Task from './Task';
import { withStyles } from '@material-ui/core/styles';
import { DropTarget } from 'react-dnd';
import * as Statuses from '../../constants/task-statuses';

const styles = theme => ({
    paper: {
        padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit * 0.002}px`,
        minHeight: '70vh',
        height: '100%',
        minWidth: '200px'
    }
});

const listTarget = {
    drop: props => {
        return {
            status: props.status
        };
    },
    hover: (props, monitor, component) => {
        console.log(component);
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    target: monitor.getDropResult()
});

const TasksColumn = ({ tasks, status, classes, connectDropTarget, isOver, onDrop, onDrag }) =>
    connectDropTarget(
        <div>
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    {formatStatus(status)}
                </Typography>
                {tasks
                    .filter(task => task.status === status)
                    .filter(task => {
                        if (task.status === Statuses.TODO) {
                            const anotherTaskWithThatSprint = tasks.find(anotherTask => {
                                return task._id !== anotherTask._id && anotherTask.sprint._id === task.sprint._id &&
                                    anotherTask.status !== task.status
                            });
                            return !!!anotherTaskWithThatSprint;
                        } else return true;
                    })
                    .map(task =>
                        <Task
                            id={task._id}
                            key={task._id}
                            name={task.name}
                            sprint={task.sprint.name}
                            fileUrl={task.fileUrl}
                            onDrop={onDrop}
                        />
                    )}
            </Paper>
        </div>
    );

function formatStatus(status) {
    const words = status.split('_');
    let result = '';
    words.forEach(word => {
        result += _.capitalize(word) + ' ';
    });
    return result.trim();
}

export default withStyles(styles)(DropTarget('Card', listTarget, collect)(TasksColumn));
