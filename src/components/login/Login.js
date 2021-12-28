import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { LogIn } from "../../api/Requests";
import { Redirect, useNavigate } from "react-router-dom";

export default function Login(props) {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = () => {
    LogIn({
      username: userName,
      password: password,
    })
      .then(function (response) {
        console.log(response.data.data.token);
        localStorage.setItem("user", response.data.data.token);
        test(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const test = (arr) => {
    props.getAccData(arr.data);
    props.getAuthStatus(true);
    navigate("/eventlist");
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <section>
        <TextField
          value={userName}
          id="outlined-basic"
          label="Username"
          ariant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <br />
        <TextField
          value={password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <br />
      <div>
        <Button variant="contained" onClick={handleLogIn}>
          Log In
        </Button>
      </div>
    </div>
  );
}
