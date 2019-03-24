import React from 'react';
import PropTypes from 'prop-types';

export default function withImgUpload(WrappedComponent) {
    return class extends React.Component {
        fileRef = React.createRef();

        state = {
            image: null
        };

        openFileDialog = () => {
            this.fileRef.current.click();
        };

        onChange = e => {
            if (e.target.files && e.target.files.length) {
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                });
                const event = {
                    ...e
                };
                event.target = {
                    ...event.target,
                    value: e.target.files[0],
                    name: this.props.name
                }
                this.props.onChange(event);
            }
        };

        render() {
            return (
                <WrappedComponent
                    ref={this.fileRef}
                    {...this.props}
                    img={this.state.image}
                    onChange={this.onChange}
                    openFileDialog={this.openFileDialog}
                />
            )
        }
    }
};

withImgUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
