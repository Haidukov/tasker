import React from 'react';
import LoadingContext from '../contexts/LoadingContext';

export default function withLoading(WrappedComponent) {
    return props => (
        <LoadingContext.Consumer>
            {
                loadingContext => <WrappedComponent {...props} {...loadingContext}/>
            }
        </LoadingContext.Consumer>
    )
}
