import React from 'react';
import { getWorkspace } from '../../services/workspace.service';

class Workspace extends React.Component {
    state = {
        workspace: null
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        getWorkspace(id);
    }

    render() {
        return <div>4</div>
    }
}

export default Workspace;
