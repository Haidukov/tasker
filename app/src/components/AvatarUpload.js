import React from 'react';
import Avatar from '@material-ui/core/es/Avatar/Avatar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import withFileUpload from '../hocs/withFileUpload';

const styles = theme => ({
    avatar: {
        cursor: 'pointer',
        height: 70,
        width: 70
    },
    file: {
        display: 'none'
    }
});

const AvatarUpload = React.forwardRef((props, ref) => {
        return (
            <>
                <Avatar
                    onClick={props.openFileDialog}
                    className={props.classes.avatar}
                    src={props.file}
                />
                <input
                    ref={ref}
                    className={props.classes.file}
                    onChange={props.onChange}
                    type='file'
                    accept='image/*'
                />
            </>
        )
    }
);


AvatarUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(withFileUpload(AvatarUpload));
