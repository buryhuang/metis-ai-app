import React from 'react';
import logo from './logo.png';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import {Button, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Johnson's Group Inc.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#sources">Data Sources</Nav.Link>
              <Nav.Link href="#analyst">Data Analyst</Nav.Link>
              <Nav.Link href="#scientist">Data Scientist</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Router>
    </div>
  );
}

export default App;
