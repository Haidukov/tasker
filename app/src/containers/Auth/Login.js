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
import { login } from '../../services/auth.service';
import withUser from '../../hocs/withUser';
import { withRouter } from 'react-router-dom';
import withNotifications from '../../hocs/withNotifications';
import withLoading from '../../hocs/withLoading';

class SignUp extends React.Component {
    state = {
        form: {
            username: '',
            password: '',
        },
        error: null
    };

    onSubmit = async () => {
        this.props.showProgress();
        try {
            const data = await login(this.state.form);
            this.props.user.setUser(data);
            this.props.showSuccessNotification('login');
            this.props.history.push('/dashboard');
        } catch ({ response }) {
            response && this.setState({error: response.data.message});
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
                        Login
                    </Typography>
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
                            validators={[
                                'required', 'minStringLength:8'
                            ]}
                            errorMessages={[
                                'This field is required',
                                'Password should me more than 8 symbols'
                            ]}
                            required
                            fullWidth
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={this.state.form.password}
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
                            Login
                        </Button>
                    </ValidatorForm>
                    <Link component={RouterLink} to='/sign-up'>
                        <Grid
                            container
                            direction='row'
                            justify='center'
                        >
                            Don`t have an account?
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


export default withLoading(withNotifications(withRouter(withUser(withStyles(styles)(SignUp)))));




