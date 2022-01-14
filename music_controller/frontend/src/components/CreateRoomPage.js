import React, { Component } from "react"
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse } from "@material-ui/core"
import { Link } from "react-router-dom"
import {Alert} from '@material-ui/lab'

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => { },
  }

  constructor(props) { //this is json
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause, 
      votesToSkip: this.props.votesToSkip,
      successMsg: '',
      errorMsg: '',
    }
    this.handleVotesChange = this.handleVotesChange.bind(this)
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this)
    this.handleCreateRoomButtonPressed = this.handleCreateRoomButtonPressed.bind(this)

    //we need to bind these methods because they're used in the virtual dom below. Without that we can't use methods with "this". Unless we use the arrow function
  }

  handleVotesChange(e){
    this.setState({
      votesToSkip: e.target.value,
    })
  }

  handleGuestCanPauseChange(e){
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false, //ternary operator if else
    })
  }
  
  handleCreateRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create", requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push('/room/' + data.code));
  }

  handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.setState({
            successMsg: 'Room updated.',
          })}
        else {
          this.setState({
            errorMsg: 'Update failed.',
          })
        }
      this.props.updateCallback() //callback inside of .then so it's run after the fetch request has been completed
    })
  }  
      

  renderCreateRoomButtons() {
    return(
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleCreateRoomButtonPressed}>
            Create a Room
          </Button>
      </Grid>
      <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" component={Link} to="/">
            Back
          </Button>
      </Grid>
    </Grid>
  )}

  renderUpdateRoomButtons() {
    return(
      <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleUpdateButtonPressed}>
            Update Room
          </Button>
      </Grid>
  )}

  render() {
    const title = this.props.update ? 'Update Room' : 'Create a Room'
    
    return ( 
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
      <Collapse in={this.state.errorMsg != '' || this.state.successMsg != ''}>
          {this.state.errorMsg != '' && <Alert severity="error" onClose={()=> {this.setState({errorMsg:''})}}>{this.state.errorMsg}</Alert>}
          {this.state.successMsg != '' && <Alert severity="success" onClose={()=> {this.setState({successMsg:''})}} >{this.state.successMsg}</Alert>}
      </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback</div>
          </FormHelperText>
          <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
            <FormControlLabel 
              value="true" 
              control={<Radio color="primary"></Radio>}
              label="Play/Pause"
              labelPlacement="bottom">
            </FormControlLabel>
            <FormControlLabel 
              value="false" 
              control={<Radio color="secondary"></Radio>}
              label="No Control"
              labelPlacement="bottom">
            </FormControlLabel>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} type="number" onChange={this.handleVotesChange} defaultValue={this.state.votesToSkip} inputProps={{min: 1, style:{textAlign: "center"}}}/>
          <FormHelperText>
            <div align="center">Votes to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {this.props.update ? this.renderUpdateRoomButtons() : this.renderCreateRoomButtons()}
    </Grid>
    )
  }
}