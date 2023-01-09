import React from "react";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import validateEmail from "../utilities";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

export default function Register(props) {
  const userContext = useContext(UserContext);

  //state
  const [errors, setErrors] = useState([]);
  const [formFields, setFormfields] = useState({
    username: "",
    name: "",
    email: "",
    contact_number: "",
    password: "",
    confirm_password: "",
  });

  const updateFormField = (e) => {
    setFormfields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  let validateFormfields = async () => {
    let errors = [];
    // Check that name is at least 3 char and not more than 100 char
    if (formFields.name.length < 3 || formFields.name.length > 100) {
      errors.push("name");
    }

    // Check that username is at least 3 char and not more than 100 char and has no spaces
    if (
      formFields.username.length < 3 ||
      formFields.username.length > 100 ||
      formFields.username.includes(" ")
    ) {
      errors.push("username");
    }

    // Check that email is valid
    if (!validateEmail(formFields.email) && formFields.email === "") {
      errors.push("email");
    }

    // Check that password is valid
    if (formFields.password === "") {
      errors.push("password");
    }

    // Check that confirm password matches password
    if (formFields.confirm_password !== formFields.password) {
      errors.push("confirm_password");
    }

    // Check that contact number does not contain any alphabets
    if (!formFields.contact_number) {
      errors.push("contact_number");
    }

    // Set state
    setErrors(errors);
    console.log("all the error on the form field", errors);
    return errors;
  };

  const registerUser = async () => {
    let errors = await validateFormfields();
    console.log("error from register js , with error ", errors);
    if (errors.length) {
      return;
    }

    const userData = {
      username: formFields.username,
      name: formFields.name,
      email: formFields.email,
      contact_number: formFields.contact_number,
      password: formFields.password,
    };

    await userContext.registerUser(userData);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h3 className="my-3">Register</h3>
        <FloatingLabel label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="eg. ary"
            name="name"
            value={formFields.name}
            onChange={updateFormField}
          />
          {errors.includes("name") ? (
            <Form.Text className="error">Invalid Name</Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>

        <FloatingLabel label="Username" className="mb-3">
          <Form.Control
            type="text"
            placeholder="eg. ary"
            name="username"
            value={formFields.username}
            onChange={updateFormField}
          />
          {errors.includes("username") ? (
            <Form.Text className="error">Invalid Username</Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>

        <FloatingLabel label="Email Address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formFields.email}
            onChange={updateFormField}
          />
          {errors.includes("email") ? (
            <Form.Text className="error">Invalid email</Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>
        <FloatingLabel label="Contact Number" className="mb-3">
          <Form.Control
            type="text"
            placeholder="eg. ary"
            name="contact_number"
            value={formFields.contact_number}
            onChange={updateFormField}
          />
          {errors.includes("contact_number") ? (
            <Form.Text className="error">Invalid contact number</Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formFields.password}
            onChange={updateFormField}
          />
          {errors.includes("password") ? (
            <Form.Text className="error">
              password must less than 100 characters
            </Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>

        <FloatingLabel label="Confirm Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name="confirm_password"
            value={formFields.confirm_password}
            onChange={updateFormField}
          />
          {errors.includes("confirm_password") ? (
            <Form.Text className="error">Password doesn't match</Form.Text>
          ) : (
            ""
          )}
        </FloatingLabel>
        <div className="container my-3 px-0">
          <Button variant="primary" onClick={registerUser}>
            Register
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
