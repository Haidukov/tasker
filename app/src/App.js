import React, { Component } from 'react';
import Router from './router';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import UserContext from './contexts/UserContext';
import { getUserFromLocalStorage } from './services/local-storage.service';
import NotificationsProvider from './components/Notifications/NotificationsProvider';
import ProgressProvider from './components/Progress/ProgressProvider';
import TitleContext from './contexts/TitleContext';

class App extends Component {

    state = {
        user: getUserFromLocalStorage(),
        title: ''
    };

    setUser = user => {
        this.setState({ user });
    };

    setHeadingTitle = title => {
        this.setState({ title })
    };

    render() {
        const { user, title } = this.state;
        const { setUser, setHeadingTitle } = this;
        const userContext = { user, setUser };
        const titleContext = { title, setHeadingTitle };
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <UserContext.Provider value={userContext}>
                    <NotificationsProvider>
                        <ProgressProvider>
                            <TitleContext.Provider value={titleContext}>
                                <Router/>
                            </TitleContext.Provider>
                        </ProgressProvider>
                    </NotificationsProvider>
                </UserContext.Provider>
            </DragDropContextProvider>
        );
    }
}

export default App;
