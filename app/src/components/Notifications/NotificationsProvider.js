import React from 'react';
import { Notification, NotificationTypes } from './Notification';
import NotificationsContext from '../../contexts/NotificationsContext';
import NotificationsList from './NotificationsList';

class NotificationsProvider extends React.Component {
    state = {
        notifications: [],
    };

    showNotification = (message, type) => {
        const newNotification = new Notification(message, type);
        const { id, time } = newNotification;
        newNotification.timer = setTimeout(() => {
            this.removeNotification(id);
        }, time);
        this.setState(({ notifications }) => ({
            notifications: [...notifications, newNotification]
        }));
    };

    showSuccessNotification = message => {
        this.showNotification(message, NotificationTypes.SUCCESS);
    };

    showErrorNotification = message => {
        this.showNotification(message, NotificationTypes.ERROR);
    };

    showWarningNotification = message => {
        this.showNotification(message, NotificationTypes.WARNING);
    };

    showInfoNotification = message => {
        this.showNotification(message, NotificationTypes.INFO);
    };

    closeNotification = id => () => {
        this.removeNotification(id);
    };

    removeNotification = id => {
        const notification = this.state.notifications.find(notification => notification.id === id);
        if (notification) {
            clearInterval(notification.timer);
            this.setState(({ notifications }) => ({
                notifications: notifications.filter(notification => notification.id !== id)
            }));
        }
    };

    render() {
        const { children } = this.props;
        const { notifications } = this.state;
        const context = {
            notifications,
            showSuccessNotification: this.showSuccessNotification,
            showErrorNotification: this.showErrorNotification,
            showWarningNotification: this.showWarningNotification,
            showInfoNotification: this.showInfoNotification,
            closeNotification: this.closeNotification
        };
        return (
            <NotificationsContext.Provider value={context}>
                <NotificationsList/>
                {children}
            </NotificationsContext.Provider>
        );
    }
}

export default NotificationsProvider;
