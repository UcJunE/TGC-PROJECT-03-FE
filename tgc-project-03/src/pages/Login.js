import React from "react";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function Login(props) {
  const userContext = useContext(UserContext);

  //state
  let [errors, setErrors] = useState([]);
  let [formfields, setFormfields] = useState({
    username: "",
    password: "",
  });

  const updateFormField = (e) => {
    setFormfields({
      ...formfields,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  const loginUser = async () => {
    <h1>Spinner</h1>;
    const result = await userContext.loginUser(formfields);
    // console.log("this is result from loginjs", result);
    if (!result) {
      setErrors(["error"]);
    } else {
      // console.log("pass here?");
      setErrors([""]);
      toast.success("Welcome & Enjoy Your Stay");
    }
  };

  return (
    <React.Fragment>
      <div className="container my-5">
        <div className="row" id="login-main-box">
          <div id="login-box" className="col-lg-2 col-md-6">
            <img
              className="login-img"
              src={require("../assets/login.jpg")}
              alt="login.img"
            />
          </div>
          <div
            className="container col-lg-2 col-md-6 mt-2"
            id="login-container"
          >
            <h3 className="my-3">Login</h3>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formfields.username}
                onChange={updateFormField}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formfields.password}
                onChange={updateFormField}
              />
              {errors.includes("error") ? (
                <Form.Text className="error">
                  Please check your username and password and try again.
                </Form.Text>
              ) : (
                ""
              )}
            </FloatingLabel>
            <div className="container mt-3 px-0">
              <Form.Check
                inline
                label="remember me"
                name="group1"
                type="checkbox"
              />
            </div>
            <div className="container my-3 px-0">
              <Button variant="primary" onClick={loginUser}>
                Login
              </Button>
            </div>
            <div className="container d-flex">
              <p className="mt-3 me-auto px-0">Don't Have Account yet ?</p>{" "}
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "0px",
                }}
                onClick={register}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
