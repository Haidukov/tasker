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
import { Http } from '../utils/http';


const styles = theme => ({
    card: {
        padding: theme.spacing.unit * 3,
        margin: `150px 15%`,
        [theme.breakpoints.down('xs')]: {
            margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
        }
    },
    title: {
        textAlign: 'center'
    },
    button: {
        margin: `${theme.spacing.unit * 5}px 0 ${theme.spacing.unit * 2}px`,
    },
    input: {
        marginTop: theme.spacing.unit * 5
    }
});

class SignUp extends React.Component {
    state = {
        form: {
            username: '',
            password: '',
        },
        repeatPassword: ''
    };

    onSubmit = () => {
        Http.post('/public/sign-up', this.state.form)
            .then(() => Http.post('/public/login', this.state.form))
            .then(response => console.log(response));
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
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.form.password) {
                return false;
            }
            return true;
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <Typography
                    className={classes.title}
                    variant='display1'>Sign Up</Typography>
                <ValidatorForm onSubmit={this.onSubmit}>
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
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        className={classes.button}
                        fullWidth
                        >
                        Submit
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
        )
    }

    static propTypes = {
        classes: PropTypes.object.isRequired
    }
}


export default withStyles(styles)(SignUp);




