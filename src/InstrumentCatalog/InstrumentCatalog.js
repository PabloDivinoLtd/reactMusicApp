import React, {Component, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InstrumentCard from '../InstrumentCard/instrumentCard';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));

function InstrumentCatalog(props) {
    const classes = useStyles();
    const [instrList, setInstrList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/"+props.match.params.collection)
            .then(response => response.json())
            .then(instrList => {
                setInstrList(instrList);
                console.log(instrList);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <h1>Каталог</h1>
            <Grid container spacing={2}>
                {loading
                    ? null
                    : instrList.map(elem => (
                        <Grid item xs={6}>
                            <InstrumentCard instrument={elem} collection={props.match.params.collection}/>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
}

export default InstrumentCatalog;