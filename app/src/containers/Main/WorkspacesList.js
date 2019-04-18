import React from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getWorkspaces, getWorkspacesByStudent } from '../../services/workspace.service';
import MaterialPlusImage from '../../assets/img/material-icon-plus.png';
import withUser from '../../hocs/withUser';
import * as Roles from '../../constants/user-role';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        }
    },
    addCard: {
        padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 3}px 0`,
    },
    cardMedia: {
        paddingTop: '100.25%',
        height: '50px'
    },
    cardContent: {
        textAlign: 'center',
        flexGrow: 1,
    }
});

class WorkspacesList extends React.Component {
    state = {
        workspaces: []
    };

    componentDidMount() {
        const { user: { role, id } } = this.props.user;
        const request = role === Roles.TEACHER ? () => getWorkspaces() : () => getWorkspacesByStudent(id);
        request().then(({ data }) => {
            this.setState({
                workspaces: data
            })
        });
    }

    goToWorkspaceForm = () => {
        this.props.history.push('/dashboard/add');
    };

    goToWorkspace = workspaceId => {
        const { user: { role, id } } = this.props.user;
        if (role === Roles.TEACHER) {
            this.props.history.push(`/dashboard/${workspaceId}`);
        }
        else {
            this.props.history.push(`/dashboard/${workspaceId}/students/${id}`);
        }
    };

    render() {
        const { classes, match } = this.props;
        const { workspaces } = this.state;
        return (
            <main>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        <Grid item sm={6} md={4} lg={3}>
                            <Card
                                className={classNames(classes.card, classes.addCard)}
                                onClick={this.goToWorkspaceForm}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={MaterialPlusImage}
                                    title='Add workspace'
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Create new workspace
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {workspaces.map( workspace => {
                            const url = `${process.env.REACT_APP_BACKEND_URL}/${workspace.imageUrl}`;
                            return (
                                <Grid item key={workspace._id} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}
                                          onClick={() => this.goToWorkspace(workspace._id)}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={url}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                { workspace.name }
                                            </Typography>
                                            <Typography>
                                                { workspace.description }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </main>
        )
    }
}

export default withUser(withRouter(withStyles(styles)(WorkspacesList)));
