import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NotificationMessage from './NotificationMessage';
import withNotifications from '../../hocs/withNotifications';

const styles = theme => ({
    notifications: {
        position: 'fixed',
        top: `${theme.spacing.unit * 2}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        right: 0,
        zIndex: 10000
    }
});

const NotificationsList = ({ notifications, classes, closeNotification }) => (
    <div className={classes.notifications}>
        {
            notifications.map(notification => (
                <NotificationMessage
                    key={notification.id}
                    id={notification.id}
                    variant={notification.type}
                    message={notification.message}
                    onClose={closeNotification}
                />
            ))
        }
    </div>
);

export default withStyles(styles)(withNotifications(NotificationsList));
