import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
        margin: `${theme.spacing.unit * 9}px auto 0`,
        padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px`
    },
    textField: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: '100%'
    },
    typography: {
        textAlign: 'center',
        marginBottom: theme.spacing.unit
    },
    submitBtn: {
        marginTop: theme.spacing.unit * 2,
    }
})

class SignUp extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Typography variant='display1' className={classes.typography}>Sign up</Typography>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        id='username'
                        label='Username'
                        className={classes.textField}
                        value={this.state.username}
                        required
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id='password'
                        label='Password'
                        className={classes.textField}
                        value={this.state.password}
                        required
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button className={classes.submitBtn}
                                fullWidth
                                variant='contained'
                                color='primary'
                                size='large'
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(SignUp);
