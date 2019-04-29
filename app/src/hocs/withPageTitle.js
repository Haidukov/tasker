import React from 'react';
import TitleContext from '../contexts/TitleContext';

export default function withPageTitle(WrappedComponent) {
    return class extends React.PureComponent {
        componentDidMount() {
            const { routeTitle, setHeadingTitle } = this.props;
            setHeadingTitle(routeTitle);
        }

        render() {
            return <WrappedComponent {...this.props}/>
        }

        static contextType = TitleContext;
    }
}
