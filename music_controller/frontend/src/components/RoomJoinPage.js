import React, { Component } from "react"
import { TextField, Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export default class RoomJoinPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        roomCode: '',
        error: '',
      }
      this.handleTextFieldText = this.handleTextFieldText.bind(this)
      this.roomButtonPressed = this.roomButtonPressed.bind(this)
    }
  
    render() {
      return (
        <Grid container spacing={1} align="center">
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Join a Room
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={this.state.error}
              label='Code'
              placeholder="Enter Room Code"
              value={this.state.roomCode}
              helperText={this.state.error}
              variant="outlined"
              onChange={this.handleTextFieldText}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={this.roomButtonPressed}>
              Enter Room
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="contained" component={Link} to="/">
              Back
            </Button>
          </Grid>
        </Grid>
      )
    }
    handleTextFieldText(e){
      this.setState({
        roomCode: e.target.value
      })
    }

    roomButtonPressed(e){
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"}, //try a different fetch request
        body: JSON.stringify({
          code: this.state.roomCode
        }),
      }
      fetch("/api/join-room", requestOptions)
        .then((response) => {
          if (response.ok) {     //we could do it like with create a room page and set a server response, but there is no need. We can rely on status message responses. If we get an OK, we use the "``" to denote that we're using the variable from here not the one from the response
            this.props.history.push(`/room/${this.state.roomCode}`)
          } else {
            this.setState({error:"Room not found."})
          }
        })
        .catch((error) => {
          console.log(error)
        }) 
    }
  }