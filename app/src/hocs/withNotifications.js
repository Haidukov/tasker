import React from 'react';
import NotificationsContext from '../contexts/NotificationsContext';

export default function withNotifications(WrappedComponent) {
    return props => (
      <NotificationsContext.Consumer>
          {notificationsContext =>
              <WrappedComponent
                  {...props}
                  {...notificationsContext}
              />
          }
      </NotificationsContext.Consumer>
    );
}
