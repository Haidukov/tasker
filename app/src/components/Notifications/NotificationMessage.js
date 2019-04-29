import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { NotificationTypes } from './Notification';

const variantIcon = {
    [NotificationTypes.SUCCESS]: CheckCircleIcon,
    [NotificationTypes.WARNING]: WarningIcon,
    [NotificationTypes.ERROR]: ErrorIcon,
    [NotificationTypes.INFO]: InfoIcon,
};

const styles = theme => ({
    notification: {
        marginBottom: theme.spacing.unit,
        minWidth: '410px'
    },
    [NotificationTypes.SUCCESS]: {
        backgroundColor: green[600],
    },
    [NotificationTypes.ERROR]: {
        backgroundColor: theme.palette.error.dark,
    },
    [NotificationTypes.WARNING]: {
        backgroundColor: theme.palette.primary.dark,
    },
    [NotificationTypes.INFO]: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const NotificationMessage = ({ id, classes, className, message, onClose, variant, ...rest }) => {
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className, classes.notification)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose(id)}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...rest}
        />
    );
}


export default withStyles(styles)(NotificationMessage);
