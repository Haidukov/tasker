import React from 'react';
import { Route } from 'react-router-dom';
import * as _ from 'lodash';

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};


const renderMergedProps = (component, ...rest) => {
    const finalProps = _.merge({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

export default PropsRoute;
