import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Navbar, Home, Auth, PostDetails } from "./components";
import theme from "./theme";

const App = () => {
  const userData = JSON.parse(localStorage.getItem("userDataMemories"));

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              component={() =>
                !userData ? <Auth /> : <Redirect to="/posts" />
              }
            />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;
