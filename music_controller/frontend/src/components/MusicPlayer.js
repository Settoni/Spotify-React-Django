import React, { Component } from "react";
import { Grid, Typography,Card,IconButton,LinearProgress, Collapse } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Alert} from '@material-ui/lab'


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorUnauth: '',
        }
    }

    pauseSong() {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
        }
        fetch("/spotify/pause", requestOptions)
        .then((response) => {
            if(response.status == 403) {
                this.setState({errorUnauth: "No permission."})
            }
        })
    }

    playSong() {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
        }
        fetch("/spotify/play", requestOptions)
        .then((response) => {
            if(response.status == 403) {
                this.setState( {errorUnauth: "No permission."}) //no idea what to do with it for now. Maybe somehow send error state to Room so it shows over Roomcode
            }
        })
    }

    skipSong() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/skip", requestOptions);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100
        
        return (
            <Grid container alignItems="center">
            <Grid container justify='center' alignItems="center">
            </Grid>
            <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
                <img src={this.props.image_url} height="100%" width="100%" />
            </Grid>
            <Grid item align="center" xs={8}>
                <Typography component="h5" variant="h5">
                {this.props.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                {this.props.artist}
                </Typography>
                <div>
                <IconButton onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}>
                { this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon /> }
                </IconButton>
                <IconButton onClick={() => this.skipSong()}>
                    <SkipNextIcon /> 
                </IconButton>
                <Typography variant="h6">
                {this.props.votes} / {this.props.votes_required} votes to skip (the host may override)
                </Typography>
                </div>
            </Grid>
            </Grid>
            <Grid item xs={12} justify="center" align='center' >
            <BorderLinearProgress variant="determinate" value={songProgress} /> {/*linear progress is a percentage*/}
            </Grid>
            </Grid>
        )
}}


const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[400],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);