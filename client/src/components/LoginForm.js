import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import { UserTechniqueContext } from "../context/userTechnique";
import { UserCommentContext } from "../context/userComment";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setUser } = useContext(UserContext);
  const { setUserTechniques } = useContext(UserTechniqueContext);
  const { setUserComments } = useContext(UserCommentContext);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUserTechniques(user.created_techniques);
          setUserComments(user.comments);
          setUser(user);
          history.push("/");
        });
      } else {
        r.json().then((errorData) => setErrors(errorData.error));
      }
    });
  }
  return (
    <form
      className="d-flex justify-content-center flex-column  align-items-center text-white pt-5"
      onSubmit={handleSubmit}
    >
      <h5>Username</h5>
      <input
        className="m-2"
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h5>Password</h5>
      <input
        className="m-2"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-danger m-2" type="submit">
        Login
      </button>
      <p style={{ color: "red" }}>{errors}</p>
    </form>
  );
}

export default LoginForm;
