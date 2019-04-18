import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withFileUpload from '../hocs/withFileUpload';

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 1
    },
    img: {
        width: '100%',
        height: '100%'
    },
    card: {
        width: '300px',
        height: '200px'
    }
});

const ImageUpload = React.forwardRef((
    {
        classes,
        file,
        id,
        label,
        onChange,
        name,
        openFileDialog
    }, ref) => (
    <>
        <Grid
            container
            direction='column'
            alignItems='center'>
            <Card className={classes.card}>
                <img
                    className={classes.img}
                    src={file}
                />
            </Card>
            <label htmlFor={id}>
                <Button
                    onClick={openFileDialog}
                    className={classes.button}
                    variant='contained'
                >
                    {label}
                </Button>
            </label>
            <input
                ref={ref}
                id={id}
                name={name}
                onChange={onChange}
                hidden accept='image/*'
                type='file'/>
        </Grid>
    </>
));

ImageUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(withFileUpload(ImageUpload));
