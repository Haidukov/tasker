import { ValidatorForm } from 'react-material-ui-form-validator';

ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== this.state.form.password) {
        return false;
    }
    return true;
});
