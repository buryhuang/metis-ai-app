import React, {SyntheticEvent} from 'react';
import logo from './logo.png';
import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import {Button, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import {Router, Route, Link} from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import {DataSources} from "./components/datasources/DataSources";
import { Search, Person } from '@material-ui/icons';
const history = createHistory();

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {Dashboard} from "./components/dashboard/Dashboard";
import {DataScientist} from "./components/datascientist/DataScientist";
Amplify.configure(awsconfig);

interface AppProps {}

interface AppState {
  currentHeaderMenu: number
}

class App extends React.Component {
  state: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      currentHeaderMenu: 0
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.renderContentFrame = this.renderContentFrame.bind(this);
    this.getActiveStyle = this.getActiveStyle.bind(this);
  }

  handleMenuClick(value: number): void {
    this.setState({ currentHeaderMenu: value });
  }

  getActiveStyle(currentMenu: number): string {
    if (currentMenu == this.state.currentHeaderMenu) {
      return "theme-menu-item-active";
    }
    return "theme-menu-item-inactive";
  }

  renderContentFrame() {
    const { currentHeaderMenu } = this.state;
    console.log(currentHeaderMenu);

    switch (currentHeaderMenu) {
      case 0:
        return (
            <Dashboard />
        );
      case 1:
        return <DataSources />;
      case 2:
        return <DataScientist />;
    }
  }

  render() {
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
                  <a className={this.getActiveStyle(0)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                      this.handleMenuClick(0)
                  }>Dashboard</a>
                  <a className={this.getActiveStyle(1)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                      this.handleMenuClick(1)
                  }>Data Sources</a>
                  <a  className={this.getActiveStyle(2)} href="#" onClick={(event: SyntheticEvent<HTMLAnchorElement>) =>
                      this.handleMenuClick(2)
                  }>Data Scientist</a>
                </Nav>
                <Form inline>
                  <Search className="theme-button-icon"/>
                  <Person className="theme-button-icon"/>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            <div className="main-area">
              {this.renderContentFrame()}
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
