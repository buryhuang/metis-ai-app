import React from 'react';
import logo from './logo.png';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import {Button, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import {DataSources} from "./components/datasources/DataSources";
import { Search, Person } from '@material-ui/icons';
const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="white" expand="lg">
          <div className="App-brand-header">
            <div className="App-brand-header-brand">Johnson's Group Inc.</div>
            <div className="App-brand-header-subtitle">Powered By Metis-A.I.</div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto theme-nav-menu-item">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#sources" className="active">Data Sources</Nav.Link>
              <Nav.Link href="#scientist">Data Scientist</Nav.Link>
            </Nav>
            <Form inline>
              <Search className="theme-button-icon"/>
              <Person className="theme-button-icon"/>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-area">
          <DataSources />
        </div>
      </Router>
    </div>
  );
}

export default App;
