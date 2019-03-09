import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Router from './Router';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    footer: {
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 3,
    },
});

const Layout = ({ classes, match }) => {
    return (
        <>
            <CssBaseline/>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Router match={match}/>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Tasker App
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Made by Rostyslav Haidukov
                </Typography>
            </footer>
        </>
    );
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
