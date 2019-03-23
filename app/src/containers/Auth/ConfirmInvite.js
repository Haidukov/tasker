import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import withUser from '../../hocs/withUser';
import { withRouter } from 'react-router-dom';
import { confirmInvite } from '../../services/students.service';

class ConfirmInvite extends React.Component {
    state = {
        form: {
            firstName: '',
            lastName: '',
            password: '',
        },
        repeatPassword: '',
        error: null
    };

    onSubmit = () => {
        const inviteId = this.props.match.params.id;
        confirmInvite(inviteId, this.state.form)
            .then(() => this.props.history.push('/dashboard'))
            .catch(({ response }) => this.setState({error: response.data.message}))
    };

    handleChange = (event) => {
        if (event.target.name === 'repeatPassword') {
            const repeatPassword = event.target.value;
            this.setState({ repeatPassword });
        }
        else {
            const { form } = this.state;
            form[event.target.name] = event.target.value;
            this.setState({ form });
        }
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.form.password);
    }

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
                        Confirm Invite
                    </Typography>
                    <ValidatorForm onSubmit={this.onSubmit}>
                        <Grid container spacing={24}
                        >
                            <Grid item xs={6}>
                                <TextValidator
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                    fullWidth
                                    type='text'
                                    placeholder='First Name'
                                    onChange={this.handleChange}
                                    name='firstName'
                                    value={this.state.form.firstName}
                                    className={classes.input}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextValidator
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                    fullWidth
                                    type='text'
                                    placeholder='Last Name'
                                    name='lastName'
                                    value={this.state.form.lastName}
                                    onChange={this.handleChange}
                                    className={classes.input}
                                />
                            </Grid>
                        </Grid>
                        <TextValidator
                            validators={['required', 'minStringLength:8']}
                            errorMessages={['This field is required', 'Password should me more than 8 symbols']}
                            required
                            fullWidth
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={this.state.form.password}
                            onChange={this.handleChange}
                            className={classes.input}
                        />
                        <TextValidator
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['This field is required', 'Passwords should match']}
                            required
                            fullWidth
                            type='password'
                            placeholder='Repeat Password'
                            name='repeatPassword'
                            value={this.state.repeatPassword}
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
                            Confirm
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


export default withRouter(withUser(withStyles(styles)(ConfirmInvite)));




