import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

class ImageUpload extends React.Component {
    ref = React.createRef();

    state = {
        image: null
    };

    onClick = () => {
        this.ref.current.click();
    };

    onChange = e => {
        if (e.target.files && e.target.files.length) {
            this.setState({
                image: URL.createObjectURL(e.target.files[0])
            });
            const event = {
                ...e
            };
            event.target = {
                ...event.target,
                value: e.target.files[0],
                name: this.props.name
            }
            this.props.onChange(event);
        }
    };

    render() {
        const { classes, id, label, name } = this.props;
        const { image } = this.state;
        return (
            <>
                <Grid
                    container
                    direction='column'
                    alignItems='center'>
                    <Card className={classes.card}>
                        <img className={classes.img}
                             src={image}/>
                    </Card>
                    <label htmlFor={id}>
                        <Button
                            onClick={this.onClick}
                            className={classes.button}
                            variant='contained'>
                            {label}
                        </Button>
                    </label>
                    <input
                        ref={this.ref}
                        id={id}
                        name={name}
                        onChange={this.onChange}
                        hidden accept='image/*'
                        type='file'/>
                </Grid>
            </>
        );
    }
}

ImageUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(ImageUpload);
