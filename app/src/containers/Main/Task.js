import React from 'react';
import Typography from '@material-ui/core/es/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/es/Button/Button';
import DownloadButton from '../../components/DownloadButton';
import { DragSource } from 'react-dnd';

const styles = theme => ({
    task: {
        padding: theme.spacing.unit,
        cursor: 'pointer',
        marginBottom: theme.spacing.unit
    },
    content: {
        padding: `${theme.spacing.unit}px ${2 * theme.spacing.unit}px 0`
    }
});

const cardSource = {
    beginDrag: props => ({
        id: props.id
    }),
    endDrag: (props, monitor) => {
        if (monitor.didDrop()) {
            const { status } = monitor.getDropResult();
            const { id, onDrop } = props;
            onDrop(id, status);
        }
    }
};

const collect = (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
);

const Task = ({ classes, name, sprint, fileUrl, isDragging, connectDragSource }) =>
    connectDragSource(
        <div>
            <Card className={classes.task}>
                <div className={classes.content}>
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                    <Typography variant='body2'>
                        {sprint}
                    </Typography>
                </div>
                <DownloadButton onClick={() => {
                    const url = `${process.env.REACT_APP_BACKEND_URL}/${fileUrl}`;
                    window.open(url);
                }}>
                    Download
                </DownloadButton>
            </Card>
        </div>
    );

export default withStyles(styles)(DragSource('Card', cardSource, collect)(Task));
