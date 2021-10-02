import React from 'react';
import './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './Router/ProtectedRoute';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Home from "./container/Home/Home";
import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './container/Detail/Detail';
Amplify.configure(awsconfig);


const theme = createTheme({
  palette: {
    primary: {
      main: "#4F4F4F"
    },
    secondary: {
      main: "#F9F9F9",
      light: "#F7FAFC"
    },
    text: {
      primary: "#000",
      secondary: "#F7FAFC"
    }
  },
  typography: {
    h5: {
      fontWeight: "bolder"
    },
    subtitle1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 9,
    },
    fontFamily: "'Roboto', sans- serif"
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/detail" component={Detail} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;