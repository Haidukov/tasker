import React from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import MaterialPlusImage from '../../assets/img/material-icon-plus.png';
import withUser from '../../hocs/withUser';
import { getTasks } from '../../services/tasks.service';
import DownloadButton from '../../components/DownloadButton';
import withLoading from '../../hocs/withLoading';
import withTitle from '../../hocs/withTitle';
import withPageTitle from '../../hocs/withPageTitle';

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
        padding: '5px',
        display: 'flex',
        flexDirection: 'column'
    },
    addCard: {
        padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px 0`,
        '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
        }
    },
    cardMedia: {
        paddingTop: '-70%',
        height: '130px',
        backgroundSize: '170px'
    },
    cardContent: {
        textAlign: 'center',
        flexGrow: 1,
    }
});

class TasksList extends React.Component {
    state = {
        tasks: []
    };

    componentDidMount() {
        this.getTasks();
    }

    async getTasks() {
        const { sprintId } = this.props.match.params;
        try {
            this.props.showProgress();
            const { data: tasks } = await getTasks(sprintId);
            this.setState({ tasks });
        } finally {
            this.props.hideProgress();
        }
    }

    goToTaskForm = () => {
        this.props.history.push(`${this.props.match.url}/add`);
    };

    render() {
        const { classes, match } = this.props;
        const { tasks } = this.state;
        return (
            <main>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                className={classNames(classes.card, classes.addCard)}
                                onClick={this.goToTaskForm}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={MaterialPlusImage}
                                    title='Create task'
                                />
                            </Card>
                        </Grid>
                        {tasks.map( task => {
                            const url = `${process.env.REACT_APP_BACKEND_URL}/${task.fileUrl}`;
                            return (
                                <Grid item key={task._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card className={classes.card}>
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                { task.name }
                                            </Typography>
                                            <DownloadButton onClick={() => window.location.href={url}}>
                                                Download
                                            </DownloadButton>
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

export default withTitle(withPageTitle(withLoading(withUser(withRouter(withStyles(styles)(TasksList))))));
