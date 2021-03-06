import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import withUser from '../../hocs/withUser'
import ImageUpload from '../../components/ImageUpload';
import { addSprint } from '../../services/sprint.service';
import withLoading from '../../hocs/withLoading';
import withNotifications from '../../hocs/withNotifications';

const styles = theme => ({
    card: {
        padding: theme.spacing.unit * 3,
        margin: `${theme.spacing.unit * 5}px 15%`,
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        },
        maxWidth: 700
    },
    title: {
        textAlign: 'center'
    },
    button: {
        margin: `0 0 ${theme.spacing.unit * 2}px`,
    },
    input: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

class SprintForm extends React.Component {
    state = {
        form: {
            name: '',
            description: '',
            image: {}
        },
        error: null
    };

    onSubmit = async () => {
        const { id } = this.props.match.params;
        try {
            this.props.showProgress();
            await addSprint(id, this.state.form);
            this.props.showSuccessNotification('You have added a sprint');
            window.history.back();
        } catch (e) {
            this.props.showErrorNotification('Failed to add a sprint');
        } finally {
            this.props.hideProgress();
        }
    };

    handleChange = (event) => {
        const { form } = this.state;
        form[event.target.name] = event.target.value;
        this.setState({ form });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction='row'
                justify='center'
            >
                <Card className={classes.card}>
                    <Typography
                        className={classes.title}
                        variant='display1'
                    >
                        Sprint Form
                    </Typography>
                    <ValidatorForm onSubmit={this.onSubmit}>
                        <ImageUpload
                            validators={['image']}
                            errorMessages={['This field is required']}
                            name='image'
                            id='Sprint-logo'
                            onChange={this.handleChange}
                            label='Upload Sprint Logo'
                        />
                        <TextValidator
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                            fullWidth
                            type='text'
                            placeholder='Name'
                            name='name'
                            value={this.state.form.name}
                            onChange={this.handleChange}
                            className={classes.input}
                        />
                        <TextValidator
                            validators={['required']}
                            errorMessages={['This field is required']}
                            required
                            fullWidth
                            multiline
                            rows={3}
                            rowsMax={5}
                            type='text'
                            placeholder='Description'
                            name='description'
                            value={this.state.form.description}
                            onChange={this.handleChange}
                            className={classes.input}
                        />
                        <div className='error'>{ this.state.error }</div>
                        <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            className={classes.button}
                            fullWidth
                        >
                            Add Sprint
                        </Button>
                    </ValidatorForm>
                </Card>
            </Grid>
        )
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
}


export default withNotifications(withLoading(withUser(withStyles(styles)(SprintForm))));




