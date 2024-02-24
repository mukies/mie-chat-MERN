// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = JSON.parse(localStorage.getItem("uid"));

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const { login, err } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="">
        <span className="logo">Mie Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <p>
            {(err && !email) || (err && !password)
              ? "Please enter Email and Password."
              : ""}
          </p>

          <button>Login</button>
        </form>
        <p>
          Didn&apos;t have an account ? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
