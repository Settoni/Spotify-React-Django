import React, { Component } from "react"
import CreateRoomPage from './CreateRoomPage'
import RoomJoinPage from './RoomJoinPage'
import Room from './Room'
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


export default class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        roomCode: null,
      }
      this.clearRoomCode = this.clearRoomCode.bind(this)
    }
    

    async componentDidMount() { //async makes it so this method is only initiated after its completion. compdidmount is a lifecycle method loading upon page load
      fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => this.setState({
        roomCode: data.code
      })
      )
    }
    
    clearRoomCode() {
      this.setState({
        roomCode: null,
      });
    }
    
    renderHomePage() {
      return (
        <Grid container spacing={3} align="center">
          <Grid item xs={12}>
            <Typography variant="h3" component="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup variant="contained" color="primary">
              <Button color="primary" variant="contained" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" variant="contained" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      )
    }
  
    render() {
      return (
        <Router>
          <Switch> {/*These function like switch statements in js*/}
            <Route exact path='/'render={() => {        /*this one has to be exact because the other two also start with a slash. If you skip exact all the pages redirect to homepage*/
              return this.state.roomCode ? (
              <Redirect to = {`/room/${this.state.roomCode}`}/>
              ) : (this.renderHomePage())
            }} 
            /> 
            <Route path='/join' component={RoomJoinPage}></Route>
            <Route path='/create' component={CreateRoomPage}></Route>
            <Route
            path="/room/:roomCode"  /*if we add a thing after colon, it means a variable */
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} /> /*We can add a prop by passing it in here with the others*/
            }}
          /> 
          </Switch>
        </Router>
      )
      
    }
  }