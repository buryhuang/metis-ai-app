import React from 'react';
import './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './Router/ProtectedRoute';
import Home from "./container/Home/Home";
import { ThemeProvider, createTheme } from '@mui/material';
import Detail from './container/Detail/Detail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({

  palette: {
    primary: {
      main: "#233D91",
      contrastText: "#fff"
    },
    secondary: {
      main: "#828282",
      light: "#bbbbbb"
    },
    text: {
      primary: "#000",
      secondary: "#0000009f"
    },

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
  },

});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
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