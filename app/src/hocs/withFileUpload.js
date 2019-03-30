import React from 'react';
import PropTypes from 'prop-types';

export default function withFileUpload(WrappedComponent) {
    return class extends React.Component {
        fileRef = React.createRef();

        state = {
            file: null
        };

        openFileDialog = () => {
            this.fileRef.current.click();
        };

        onChange = e => {
            if (e.target.files && e.target.files.length) {
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                });
                const event = { ...e };
                event.target = {
                    ...event.target,
                    value: e.target.files[0],
                    name: this.props.name
                };
                this.props.onChange(event);
            }
        };

        render() {
            return (
                <WrappedComponent
                    ref={this.fileRef}
                    {...this.props}
                    file={this.state.file}
                    onChange={this.onChange}
                    openFileDialog={this.openFileDialog}
                />
            )
        }
    }
};

withFileUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
