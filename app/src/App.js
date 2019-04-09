import React, { Component } from 'react';
import Router from './router';
import UserContext from './contexts/UserContext';
import './App.scss';
import { getUserFromLocalStorage } from './services/local-storage.service';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
            <DragDropContextProvider backend={HTML5Backend}>
                <UserContext.Provider value={userContextValue}>
                    <Router/>
                </UserContext.Provider>
            </DragDropContextProvider>
        );
    }
}

export default App;
