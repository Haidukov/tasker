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

const ImageUpload = React.forwardRef((props, ref) => (
    <>
        <Grid
            container
            direction='column'
            alignItems='center'>
            <Card className={props.classes.card}>
                <img
                    className={props.classes.img}
                    src={props.file}
                />
            </Card>
            <label htmlFor={props.id}>
                <Button
                    onClick={props.openFileDialog}
                    className={props.classes.button}
                    variant='contained'
                >
                    {props.label}
                </Button>
            </label>
            <input
                ref={ref}
                id={props.id}
                name={props.name}
                onChange={props.onChange}
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
