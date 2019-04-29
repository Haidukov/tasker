import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import { addWorkspace } from '../../services/workspace.service';
import withUser from '../../hocs/withUser'
import ImageUpload from '../../components/ImageUpload';
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

class WorkspaceForm extends React.Component {
    state = {
        form: {
            name: '',
            description: '',
            image: {}
        },
        error: null
    };

    onSubmit = async () => {
        try {
            this.props.showProgress();
            await addWorkspace(this.state.form)
            this.props.showSuccessNotification('You have successfully added a workspace');
            window.history.back();
        } catch (e) {
            this.props.showErrorNotification('Failed to add a workspace. Try again please');
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
                        Workspace Form
                    </Typography>
                    <ValidatorForm onSubmit={this.onSubmit}>
                        <ImageUpload
                            validators={['image']}
                            errorMessages={['This field is required']}
                            name='image'
                            id='workspace-logo'
                            onChange={this.handleChange}
                            label='Upload Workspace Logo'
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
                            Add Workspace
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


export default withNotifications(withLoading(withUser(withStyles(styles)(WorkspaceForm))));




