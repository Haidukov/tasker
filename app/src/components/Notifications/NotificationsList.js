import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
    <TransitionGroup className={classes.notifications}>
        {
            notifications.map(notification => (
                <CSSTransition
                    key={notification.id}
                    timeout={500}
                    classNames='item'
                >
                    <NotificationMessage
                        id={notification.id}
                        variant={notification.type}
                        message={notification.message}
                        onClose={closeNotification}
                    />
                </CSSTransition>
            ))
        }
    </TransitionGroup>
);

export default withStyles(styles)(withNotifications(NotificationsList));
