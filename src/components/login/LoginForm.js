import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, TextField, Typography, CircularProgress } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  PersonOutlineOutlined,
  HttpsOutlined,
  RemoveRedEyeOutlined,
  RemoveRedEye,
} from "@material-ui/icons";
import { useStyles } from "../../style/loginForm";
import { signIn } from "../../services/auth";
import { authenticate, setLocalStorage } from "../../services/localStorage";
import { fetchAllAccounts, fetchAllApps } from "../../services/pubnub";

import Alert from "@material-ui/lab/Alert";
import Pubnub from "pubnub";

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const uuid = Pubnub.generateUUID();

  const [alert, setAlert] = useState({
    success: { status: false, msg: "" },
    error: { status: false, msg: "" },
    loading: false,
  });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const handleChange = (type) => (e) => {
    switch (type) {
      case "email":
        setCredentials({ ...credentials, email: e.target.value });
        break;
      case "password":
        setCredentials({ ...credentials, password: e.target.value });
        break;
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert({ ...alert, loading: true });
      const authSignInResponse = await signIn(credentials);
      const { user, token } = authSignInResponse.result;
      setAlert({
        ...alert,
        success: { status: true, msg: "Successfully Authenticated" },
        error: { status: false, msg: "" },
      });
      authenticate({ user, token }, async () => {
        try {
          let accountsResult = await fetchAllAccounts(user.id, token);
          let apps = await fetchAllApps(accountsResult.result.accounts[0].id, token);
          setLocalStorage("PubNubAccounts", accountsResult.result.accounts);
          setLocalStorage("PubNubSelectedAccount", accountsResult.result.accounts[0]);
          setLocalStorage("PubNubApplications", apps);
          setLocalStorage("uuid", uuid);
          setAlert({
            ...alert,
            success: { status: true, msg: "" },
            error: { status: false, msg: "" },
            loading: false,
          });
          history.push("/dashboard");
        } catch (err) {
          throw new Error(err);
        }
      });
    } catch (err) {
      setAlert({
        ...alert,
        error: { status: true, msg: err.message },
        loading: false,
        success: { status: false, msg: "" },
      });
    }
  };

  const togglePasswordMask = () => {
    setPasswordIsMasked((prev) => !prev);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.middle}>
          <div className={classes.inner}>
            <Grid container justify="center">
              <Grid item xs={12} sm={6} md={4}>
                <div className={classes.form}>
                  <Grid container justify="center">
                    <Grid item sm={12} md={12} xs={12}>
                      <div className={classes.logIconContainer}>
                        <span className={classes.logIcon}>
                          <img
                            src={process.env.PUBLIC_URL + "/images/Pubnub logo.svg"}
                            alt="Pubnub Logo"
                            width={160}
                          />
                        </span>
                      </div>
                    </Grid>
                    <Grid item sm={12} md={12} xs={12}>
                      <Typography className={classes.logSubtitle} align="center">
                        Login with your PubNub account to continue
                      </Typography>
                    </Grid>
                  </Grid>

                  <form onSubmit={handleSubmit}>
                    <Grid container justify="center" spacing={3}>
                      <Grid xs={10} sm={12} md={10} item>
                        <div className={classes.alertCard}>
                          {alert.success.status && (
                            <Alert severity="success">{alert.success.msg}</Alert>
                          )}
                          {alert.error.status && <Alert severity="error">{alert.error.msg}</Alert>}
                        </div>
                        <br />
                        <br />
                      </Grid>
                      <Grid xs={10} sm={12} md={10} item>
                        <TextField
                          type="text"
                          variant="outlined"
                          name="email"
                          fullWidth
                          autoComplete="email"
                          className={classes.loginTextField}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutlineOutlined className={classes.textfieldIcon} />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="E-mail address"
                          required
                          onChange={handleChange("email")}
                          value={credentials.email}
                          autoFocus
                        />
                      </Grid>
                      <Grid xs={10} sm={12} md={10} item>
                        <TextField
                          type={passwordIsMasked ? "password" : "text"}
                          autoComplete="password"
                          variant="outlined"
                          className={classes.loginTextField}
                          name="password"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {passwordIsMasked ? (
                                  <RemoveRedEye
                                    className={classes.maskPasswordIcon}
                                    onClick={togglePasswordMask}
                                  />
                                ) : (
                                  <RemoveRedEyeOutlined
                                    className={classes.textfieldIcon}
                                    onClick={togglePasswordMask}
                                  />
                                )}
                              </InputAdornment>
                            ),
                            startAdornment: (
                              <InputAdornment position="start">
                                <HttpsOutlined className={classes.textfieldIcon} />
                              </InputAdornment>
                            ),
                          }}
                          fullWidth
                          placeholder="Password"
                          required
                          onChange={handleChange("password")}
                          value={credentials.password}
                        />
                      </Grid>
                    </Grid>
                    <br />

                    <Grid container justify="center">
                      <Grid item sm={12} md={10} xs={10}>
                        <Button
                          className={classes.button}
                          fullWidth
                          classes={{ disabled: classes.disabledButton }}
                          disabled={alert.loading}
                          type="submit"
                          startIcon={
                            alert.loading ? (
                              <CircularProgress className={classes.loader} size={30} />
                            ) : null
                          }
                        >
                          {alert.loading ? "Submitting" : "LOGIN TO CONTINUE"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
