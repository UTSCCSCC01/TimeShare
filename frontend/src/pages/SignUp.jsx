import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const SignUp = () => {



  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = async () => {
    if (!password) {
      await setPasswordError('Field is required')
    }
    else if (password !== passwordConfirm) {
      await setPasswordError('Passwords must match');
    }
    else {
      await setPasswordError('');
    }
  }

  const emailRegex = /.+@.+\.[A-Za-z]+$/;


  const validateEmail = () => {
    if (!email) {
      setEmailError('Field is required');
    }
    else if (!emailRegex.test(email)) {
      setEmailError('Email must be in a valid format e.g. name@email.ca');
    } else {
      setEmailError('');
    }
  };

  const validateUsername = () => {
    if (!username) {
      setUsernameError('Field is required')
    }
    else {
      setUsernameError('')
    }
  }
  const validateForm = async () => {
    console.log(passwordError, "1")
    await validatePassword()
    validateEmail()
    console.log(passwordError, "2")
    if (passwordError || emailError) {
      console.log(passwordError, "3")
      return false
    }
    else {
      return true
    }
  }

  const register = () => {
    if (!validateForm()) {
      console.log('not valid!')
      return
    }
    const data = {
      username: username,
      useremail: email,
      password: password
    }

    Axios.post("api/api/User/create", data)
      .then((res) => {
        console.log(res)
        if(res.data.err) {
            if (res.data.err.keyPattern && res.data.err.keyPattern.username) {
            setUsernameError('Username is taken')
          }
          if(res.data.err.errors && res.data.err.errors.email) {
            setEmailError(res.data.err.errors.email.message)
          }
        }
        else {
          //no errors
          //do something cool!
            // setUsernameError('')
            // setEmailError('')
            // setPasswordError('')
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });


  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form} noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Username"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                error={usernameError !== ''}
                helperText={usernameError !== '' ? usernameError : ''}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError !== ''}
                helperText={emailError !== '' ? emailError : ''}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError !== ''}
                helperText={passwordError !== '' ? passwordError : ''}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                error={passwordError !== ''}
                helperText={passwordError !== '' ? passwordError : ''}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
