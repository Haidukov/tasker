import React from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getWorkspace, getWorkspaces } from '../../services/workspace.service';
import MaterialPlusImage from '../../assets/img/material-icon-plus.png';
import { getSprints } from '../../services/sprint.service';
import withLoading from '../../hocs/withLoading';

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

class SprintsList extends React.Component {
    state = {
        sprints: []
    };

    componentDidMount() {
        this.getSprints();
    }

    async getSprints() {
        const { id } = this.props.match.params;
        try {
            this.props.showProgress();
            const { data: sprints } = await getSprints(id);
            this.setState({ sprints });
        } finally {
            this.props.hideProgress();
        }
    }

    goToSprintForm = () => {
        const { id } = this.props.match.params;
        this.props.history.push(`/dashboard/${id}/add`);
    };

    goToSprint = (id) => {
        this.props.history.push(`${this.props.match.url}/${id}`);
    };

    render() {
        const { classes, match } = this.props;
        const { sprints } = this.state;
        return (
            <main>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                className={classNames(classes.card, classes.addCard)}
                                onClick={this.goToSprintForm}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={MaterialPlusImage}
                                    title='Add sprint'
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Create new sprint
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {sprints.map( sprint => {
                            const url = `${process.env.REACT_APP_BACKEND_URL}/${sprint.imageUrl}`;
                            return (
                                <Grid item key={sprint._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}
                                          onClick={() => this.goToSprint(sprint._id)}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={url}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                { sprint.name }
                                            </Typography>
                                            <Typography>
                                                { sprint.description }
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

export default withLoading(withRouter(withStyles(styles)(SprintsList)));
