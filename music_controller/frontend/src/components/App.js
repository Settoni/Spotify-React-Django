import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage"


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='center'>                 {/*we need a div to wrap the contents and render them all(if there are multiple). Also this is a JSX comment*/}
      <HomePage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv); {/*you can pass arguments into your class by adding them next to the name (Tutorial 4)*/}
