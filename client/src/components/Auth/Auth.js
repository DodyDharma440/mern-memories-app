import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: "AUTH",
        data: {
          result,
          token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In is not successful, please try again later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  onChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  autoFocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              onChange={handleChange}
              autoFocus
              type="email"
            />
            <Input
              name="password"
              label="Password"
              onChange={handleChange}
              autoFocus
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                autoFocus
                type="password"
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="562157679311-326p4mu8d920ue9f4ml070f42racg03q.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.googleButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have and account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
