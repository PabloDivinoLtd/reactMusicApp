import React, {Component, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Card, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Routes} from '../routes';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    whiteContainer: {
        backgroundColor: theme.palette.text.secondary
    },
    image: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    instrumentName: {
        marginBottom: 20,
    },
}));

function InstrumentPage(props) {
    const classes = useStyles();
    const [instrument, setInstrument] = useState({});
    const [loading, setLoading] = useState(true);

    /*useEffect(() => {
        fetch(Routes.Instrument + props.match.params.id)
            .then(response => response.json())
            .then(instrument => {
                setInstrument(instrument);
                console.log(instrument);
                setLoading(false);
            });
    }, []);*/

    return (
        <div className="container">
            <Grid className={'bg-white border border-primary'} container spacing={3}>
                {loading ? null : <React.Fragment><Grid item xs={7}>
                    <img className={classes.image} src={require('../placeholder.png')}/>
                </Grid>
                    <Grid item xs={5}>
                        <h6>Муз</h6>
                        <h1>Инструмент {props.match.params.id}</h1>
                        <h2>100500</h2>
                        <p>Lorem ipsum dolor sit amet</p>
                        <Button variant="contained" color="primary">
                            В КОРЗИНУ
                        </Button>
                    </Grid></React.Fragment>}
            </Grid>
        </div>
    );
}

export default InstrumentPage;