import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Navbar, Home, Auth } from "./components";
import theme from "./theme";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
