import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Router from './Router';
import Footer from '../../components/Footer';
import Heading from '../../components/Heading';

const Layout = ({ match }) => (
        <>
            <CssBaseline/>
            <Heading/>
            <Router match={match}/>
            <Footer/>
        </>
);

export default Layout;
