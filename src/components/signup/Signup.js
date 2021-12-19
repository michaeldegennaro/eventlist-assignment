import "./Signup.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUser } from "../../api/Requests";

export default function Signup() {
  let [userName, setUserName] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [repPassword, setRepPassword] = useState("");

  const handleLogIn = () => {
    if (userPassword === repPassword) {
      createUser({
        username: userName,
        password: userPassword,
        isAdmin: true,
      });
    } else {
      console.log("Passwords do not match, try again!");
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

      <section>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Repeat Password"
          variant="outlined"
          type="password"
          onChange={(e) => setRepPassword(e.target.value)}
        />
      </section>
      <div>
        <Button variant="contained" onClick={handleLogIn}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
