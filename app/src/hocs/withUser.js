import React from 'react';
import UserContext from '../contexts/UserContext';

export default function withUser(WrappedComponent) {
    return props => (
        <UserContext.Consumer>
            {user => (
                <WrappedComponent {...props} user={user}/>
            )}
        </UserContext.Consumer>
    );
}
