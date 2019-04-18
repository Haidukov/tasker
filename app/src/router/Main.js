import React from 'react';

export default class Main extends React.Component {
    ref = React.createRef();

    state = {
        count: 0
    };

    handleClick = () => {
        this.setState(state => {
            return {
                count: state.count + 1
            }
        })
    };

    componentDidMount() {
        setTimeout(() => {
            this.ref.current.style.transform = 'translateX(20px)';
        }, 500);
    }

    render() {
        return (
            <>
                <div ref={this.ref}
                    style={{
                    transition: 'all ease'
                }}>
                    {this.state.count}
                </div>
                <button type='button' onClick={this.handleClick}>CLick me</button>
            </>
        )
    }
}
