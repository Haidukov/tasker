import React, { Component } from 'react';
import Router from './router';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import UserContext from './contexts/UserContext';
import { getUserFromLocalStorage } from './services/local-storage.service';
import NotificationsProvider from './components/Notifications/NotificationsProvider';
import './App.scss';
import ProgressProvider from './components/Progress/ProgressProvider';

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
                    <NotificationsProvider>
                        <ProgressProvider>
                            <Router/>
                        </ProgressProvider>
                    </NotificationsProvider>
                </UserContext.Provider>
            </DragDropContextProvider>
        );
    }
}

export default App;
