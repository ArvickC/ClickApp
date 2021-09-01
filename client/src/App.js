import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Header';
// Main Page
import HomePage from './components/mainPage/HomePage';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2c2c2c",
    },
    secondary: {
      main: "#383838",
    },
  },
});

// Styles
const styles = {
  site: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh"
  },
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#2c2c2c",
    height: "100%",
    //textAlign: "center"
  }
}
class App extends React.Component {

  render() {
    return(
      <Router>
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <div style={styles.site}>
              <Header/>
              <div style={styles.page}>
                <HomePage/>
              </div>
            </div>
          </ThemeProvider>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
