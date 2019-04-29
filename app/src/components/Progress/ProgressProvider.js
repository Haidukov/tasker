import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingContext from '../../contexts/LoadingContext';
import classNames from 'classnames';

const styles = theme => ({
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100000000
    },
    colorPrimary: {
        backgroundColor: 'white'
    },
});

class ProgressProvider extends React.Component {
    state = {
        isLoading: false
    };

    showProgress = () => {
        this.setState({ isLoading: true });
    };

    hideProgress = () => {
        this.setState({ isLoading: false });
    };

    render() {
        const { isLoading } = this.state;
        const { children, classes } = this.props;
        const { showProgress, hideProgress } = this;
        const context = {
            isLoading,
            showProgress,
            hideProgress
        };
        return (
            <LoadingContext.Provider value={context}>
                {isLoading && <LinearProgress
                    classes={{
                        root: classes.progress,
                    }}
                    variant='query'/>}
                {children}
            </LoadingContext.Provider>
        )
    }
}

export default withStyles(styles)(ProgressProvider);
