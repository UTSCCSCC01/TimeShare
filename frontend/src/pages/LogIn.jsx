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
import  { useNavigate  } from 'react-router-dom';

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

export const LogIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  })

  let navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true
    const allErrors = {}

    if (!username) {
      formIsValid = false
      allErrors['username'] = "Username cannot be empty"
    } else {
      allErrors['username'] = ''
    }

    if (!password) {
      formIsValid = false
      allErrors['password'] = "Password cannot be empty"
    } else {
      allErrors['password'] = ''
    }

    setErrors(allErrors)
    return formIsValid
}

  const login = () => {
    console.log(errors)

    if (!validateForm()) {
      return
    }

    const data = {
      username: username,
      password: password
    }

    Axios.post("http://localhost:5000/api/User/login", data)
      .then((res) => {

        if (res.data.Error) {
            const resErrors = {
            username: '',
            password: ''
            }

            resErrors['username'] = 'Invalid credentials'
            resErrors['password'] = 'Invalid credentials'
        
            setErrors(resErrors)
        } else {
            localStorage.setItem('user-id', res.data._id)
            localStorage.setItem('token', res.data.token)
            navigate('/profile/');
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
          Log In
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
                error={errors.username !== ''}
                helperText={errors.username}
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password !== ''}
                helperText={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
            onClick={login}
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}