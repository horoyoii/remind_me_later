import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import "./App.css";
import Routes from "./Routes";


class App extends Component {
  render() {
    return (

        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Reminder</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
              <Navbar.Brand>
                <Link to="/">ToDo</Link>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link to="/doing">Doing</Link>
              </Navbar.Brand>
              <Navbar.Brand>
                <Link to="/done">Done</Link>
              </Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Routes />
        </div>
      );
  }
}

export default App;
