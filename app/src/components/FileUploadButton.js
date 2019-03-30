import React from 'react';
import withFileUpload from '../hocs/withFileUpload';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    file: {
        display: 'none'
    }
});

const FileUploadButton = React.forwardRef((props, ref) => (
    <>
        <Grid container justify='center'>
            <Button
                onClick={props.openFileDialog}
                variant="contained"
                color="default"
                className={props.classes.button}
            >
                Upload
                <CloudUploadIcon className={props.classes.rightIcon}/>
            </Button>
            <input
                ref={ref}
                className={props.classes.file}
                onChange={props.onChange}
                type='file'
                accept='*'
            />
        </Grid>
    </>
));

export default (withStyles(styles)(withFileUpload(FileUploadButton)));
