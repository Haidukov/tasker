import UserContext from '../contexts/UserContext';
import React from 'react';

export default function withUser(WrappedComponent) {
    return props => (
        <UserContext.Consumer>
            {user => (
                <WrappedComponent {...props} user={user}/>
            )}
        </UserContext.Consumer>
    );
}
