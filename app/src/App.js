import React, { Component } from 'react';
import Router from './router';
import UserContext from './contexts/UserContext';
import './App.scss';
import { getUserFromLocalStorage } from './services/local-storage.service';

class App extends Component {

    state = {
        user: getUserFromLocalStorage(),
    };

    setUser = user => {
        this.setState({ user });
    };

    render() {
        const userContextValue = {
            user: this.state.user,
            setUser: this.setUser
        };
        return (
            <UserContext.Provider value={userContextValue}>
                <Router/>
            </UserContext.Provider>
        );
    }
}

export default App;
