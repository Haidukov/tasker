import React, { Component } from 'react';
import Router from './router';
import UserContext from './contexts/UserContext';
import './App.scss';

class App extends Component {
    state = {
        user: null,
    };

    setUser = user => {
        this.setState({ user });
    };

    render() {
        const userContextValue = {
            user: this.state.user,
            setUser: this.state.setUser
        };
        return (
            <UserContext.Provider value={userContextValue}>
                <Router/>
            </UserContext.Provider>
        );
    }
}

export default App;
