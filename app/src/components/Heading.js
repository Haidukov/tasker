import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import withTitle from '../hocs/withTitle';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    }
});

const Heading = ({ classes, title, ...rest }) => (
    <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                {title}
            </Typography>
        </Toolbar>
    </AppBar>
)

export default withTitle(withStyles(styles)(withRouter(Heading)));
