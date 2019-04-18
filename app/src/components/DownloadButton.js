import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const styles = theme => ({
    downloadButton: {
        margin: theme.spacing.unit,
    },
    downloadIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const DownloadButton = React.forwardRef(({ classes, children, onClick }, ref) => (
    <Button
        variant='contained'
        color='primary'
        ref={ref}
        onClick={onClick}
        className={classes.downloadButton}
    >
        {children}
        <CloudDownloadIcon className={classes.downloadIcon}/>
    </Button>
));

export default withStyles(styles)(DownloadButton);
