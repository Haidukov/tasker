import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/es/Card/Card';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import styles from '../../styles/styles';
import { addWorkspace } from '../../services/workspace.service';
import withUser from '../../hocs/withUser'
import ImageUpload from '../../components/ImageUpload';

class WorkspaceForm extends React.Component {
    state = {
        form: {
            name: '',
            description: '',
            image: {}
        },
        error: null
    };

    onSubmit = () => {
        addWorkspace(this.state.form);
    };

    handleChange = (event) => {
        const { form } = this.state;
        form[event.target.name] = event.target.value;
        this.setState({ form });
    };

    componentDidCatch() {
        ValidatorForm.addValidationRule('image', () => this.state.form.image);
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


export default withUser(withStyles(styles)(WorkspaceForm));




