import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("uid"));

  // CHECK USER WAS LOGGED IN OR NOT AFTER COMPONENT RENDER
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  // HOOKS FUNCTION CALLED
  const { register, err } = useRegister();

  // INPUT STATE
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // FUNCTION FOR REGISTER FUNCTIONALITY

  async function handleSubmit(e) {
    e.preventDefault();
    // HOOKS FUNCTION
    await register(inputs);
  }

  return (
    <div className="register-container">
      <div className="">
        <span className="logo">Mie Chat</span>
        <span className="title">Register Now</span>
        <form onSubmit={handleSubmit}>
          <input
            value={inputs.name}
            type="text"
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            placeholder="User Name"
          />
          <p
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {err && !inputs.name ? "Username is Required." : ""}
          </p>
          <input
            value={inputs.email}
            type="email"
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Email"
          />
          <p
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {err && !inputs.email ? "Email is Required." : ""}
          </p>
          <input
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder="Password"
          />
          <p
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {err && !inputs.password ? "Password is Required." : ""}
          </p>
          <input
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
            placeholder="Confirm Password"
          />
          <p
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {err && !inputs.confirmPassword
              ? "Confirm Password is Required."
              : ""}
          </p>
          <div className="gender">
            <label htmlFor="male">
              <input
                value={inputs.gender}
                checked={inputs.gender == "male"}
                onChange={() => setInputs({ ...inputs, gender: "male" })}
                type="radio"
                id="male"
              />
              <span>Male</span>
            </label>
            <label htmlFor="female">
              <input
                value={inputs.gender}
                checked={inputs.gender == "female"}
                onChange={() => setInputs({ ...inputs, gender: "female" })}
                type="radio"
                id="female"
              />
              <span>Female</span>
            </label>
          </div>
          <p
            style={{
              color: "red",
              fontSize: "13px",
            }}
          >
            {err && !inputs.gender ? "Gender is Required." : ""}
          </p>

          <button>Sign Up</button>
        </form>

        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
