import React from 'react';
import TitleContext from '../contexts/TitleContext';

export default function withTitle(WrappedComponent) {
    return props => (
        <TitleContext.Consumer>
            {
                titleContext => <WrappedComponent {...props} {...titleContext}/>
            }
        </TitleContext.Consumer>
    )
}
