import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getWorkspace } from '../../services/workspace.service';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({
    card: {
        margin: `${theme.spacing.unit * 5}px auto`,
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
});

class ImgMediaCard extends React.Component {
    state = {
        workspace: null
    };

    componentDidMount() {
        getWorkspace(this.props.match.params.id)
            .then(({ data }) => {
                this.setState({
                    workspace: data
                });
            })
    }

    goToSprintsList = (id) => {
        this.props.history.push(`/dashboard/${id}`);
    };

    render() {
        const { classes, match } = this.props;
        const { workspace } = this.state;
        return (
            <> {workspace && (
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            image={`${process.env.REACT_APP_BACKEND_URL}/${workspace.imageUrl}`}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {workspace.name}
                            </Typography>
                            <Typography component="p">
                                {workspace.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            <Link to={`${match.url}/students`}>
                            Students
                            </Link>
                        </Button>
                        <Button size="small" color="primary">
                            <Link to={`${match.url}/sprints`}>
                                Sprints
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            )}
            </>
        );
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ImgMediaCard));
