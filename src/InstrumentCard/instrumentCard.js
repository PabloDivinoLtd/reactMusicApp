import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Routes} from '../routes';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function InstrumentCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavLink exact to={Routes.Instrument + props.instrument._id} style={{textDecoration: 'none'}}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            {props.instrument.image == null ? <img className={classes.img} src={require('../placeholder.png')}/>
                                : <img className={classes.img} src={process.env.PUBLIC_URL + '/img/' + props.instrument.image}/>}
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.instrument.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.instrument.species}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{props.instrument.price}Р</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            </NavLink>
        </div>
    );
}