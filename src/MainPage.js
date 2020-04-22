import React, {Component, useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {NavLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Routes} from './routes';

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

function MainPage() {
    const classes = useStyles();
    const [categoryList] = useState([
        {text: "Гитары", ref: Routes.Guitars},
        {text: "Бас-гитары", ref: Routes.BassGuitars},
        {text: "Барабаны", ref: Routes.Drums},
        {text: "Синтезаторы", ref: Routes.Synths}]);

    return (
        <div className="container">
            <h1>Каталог</h1>
            <Grid container spacing={2}>
                {categoryList.map(elem => (
                    <Grid item xs={6}>
                        <NavLink exact to={elem.ref}>
                            <Paper className={classes.paper}>{elem.text}</Paper>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default MainPage;