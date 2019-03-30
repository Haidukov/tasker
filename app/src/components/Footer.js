import React from 'react'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    footer: {
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit,
    },
});


const Footer = ({ classes }) => (
    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            Tasker App
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Made by Rostyslav Haidukov
        </Typography>
    </footer>
);

export default withStyles(styles)(Footer);
