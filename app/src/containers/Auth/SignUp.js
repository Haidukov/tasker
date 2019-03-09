import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { signUp } from '../../services/auth.service';
import withUser from '../../hocs/withUser';

class SignUp extends React.Component {
    state = {
        form: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
        },
        repeatPassword: '',
        error: null
    };

    onSubmit = () => {
        signUp(this.state.form)
            .then(this.props.user.setUser)
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
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', value => value !== this.state.form.password);
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
                        Sign Up
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
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            required
                            fullWidth
                            type='text'
                            placeholder='Your username'
                            onChange={this.handleChange}
                            name='username'
                            value={this.state.form.username}
                            className={classes.input}
                        />
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
                            Sign Up
                        </Button>
                    </ValidatorForm>
                    <Link component={RouterLink} to='/login'>
                        <Grid
                            container
                            direction='row'
                            justify='center'
                        >
                            Already have an account
                        </Grid>
                    </Link>
                </Card>
            </Grid>
        )
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
}


export default withUser(withStyles(styles)(SignUp));




