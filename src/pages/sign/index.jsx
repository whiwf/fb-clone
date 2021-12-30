import Login from "./login";
import SignUp from "./signup";

import GoogleIcon from "@mui/icons-material/Google";
import { Alert, Chip } from "@mui/material";

import React, { useState } from "react";
import "./sign-form.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import firebaseClient from "config/firebase";

import { setUserInformation } from "slice/userSlice";
import { useDispatch } from 'react-redux';

function SignForm() {

  const dispatch = useDispatch();

  // error handler
  const [errorMessage, setErrorMessage] = useState("");

  // reset value
  const resetErrorValue = () => {
    setErrorMessage("");
  };

  // login with google
  const handleLoginWithGoogle = () => {
    resetErrorValue();

    firebaseClient
      .signInWithGoogle()
      .then((response) => {
        const user =  {
          name: response.displayName,
          profileSrc: response.photoURL,
          uid: response.uid,
        };

        dispatch(setUserInformation(user));
      })
      .catch((err) => setErrorMessage(err));
  };

  return (
    <div className="center__form">
      <div className="sign post__wrapper">
        <div className="sign__logo">
          <img
            src="https://logodownload.org/wp-content/uploads/2021/10/meta-logo.png"
            alt="meta logo"
          />
        </div>
        <div className="sign__form">
          <div className="other__login">
            <Chip
              variant="outlined"
              color="error"
              icon={<GoogleIcon />}
              label="Đăng nhập bằng Google"
              clickable
              onClick={handleLoginWithGoogle}
            />
          </div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={SignUp} />
            </Switch>
          </BrowserRouter>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
}

export default SignForm;
