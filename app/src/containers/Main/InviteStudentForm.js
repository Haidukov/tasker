import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/es/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { createStudentInvite } from '../../services/students.service';
import withLoading from '../../hocs/withLoading';
import withNotifications from '../../hocs/withNotifications';

const styles = theme => ({
    paper: {
        position: 'fixed',
        left: '50%',
        transform: `translateX(-50%)`,
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        marginTop: theme.spacing.unit * 20,
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    input: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    }
});

class InviteStudentForm extends React.Component {
    state = {
        email: '',
    };

    onSubmit = async event => {
        event.preventDefault();
        const workspaceId = this.props.match.params.id;
        try {
            this.props.showProgress();
            await createStudentInvite(workspaceId, this.state.email);
            this.props.showSuccessNotification('You have invited a student to workspace');
            this.props.close();
        } catch ({ response }) {
            response && response.status === 400 ?
                this.props.showErrorNotification(response.data.message) :
                this.props.showErrorNotification('Failed to invite a student to workspace');
        } finally {
            this.props.hideProgress();
        }
    };

    handleChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify='center'>
                <ValidatorForm onSubmit={this.onSubmit}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" id="modal-title">Invite a student</Typography>
                        <TextValidator
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            required
                            fullWidth
                            type='text'
                            placeholder='Student username'
                            onChange={this.handleChange}
                            name='username'
                            value={this.state.email}
                            className={classes.input}
                        />
                        <Button
                            type='submit'
                            color='primary'
                            variant='contained'
                            className={classes.button}
                            fullWidth
                        >
                            Invite
                        </Button>
                    </Paper>
                </ValidatorForm>
            </Grid>
        );
    }
}

InviteStudentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
};

export default withNotifications(withLoading(withStyles(styles)(InviteStudentForm)));
