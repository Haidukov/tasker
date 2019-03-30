import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Router from './Router';
import Footer from '../../components/Footer';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    }
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
            <Footer/>
        </>
    );
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
