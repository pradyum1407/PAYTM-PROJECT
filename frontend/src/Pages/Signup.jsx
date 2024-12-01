import React, { useState } from 'react';
import Link from "react-router"
import { InputFiled } from '../components/app/user/Input'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { signupForm } from '../components/app/user/signup'; // Ensure this path is correct

const Signup = () => {
  const navigate = useNavigate()

  // Defined states for signup form
  const [Data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  });

  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handleChange = (e) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
    console.log(Data);

    setSuccess("");
    setError("");
  };

  const ValidateForm = () => {
    if (!Data.firstName || !Data.lastName || !Data.username || !Data.password) {
      setError("Please fill all the input fields.");
      return false;
    }
    return true;
  };

  const SignupForm = async (e) => {
    e.preventDefault();

    if (!ValidateForm()) return;

    try {
      const response = await signupForm(Data);
      setError("");
      setSuccess("User is registered successfully!");

      //setting the token to the storage 
      localStorage.setItem("authtoken", response.token)

      //navigating to the dashboard
      setTimeout(() => {
        navigate("/");
      }, 5000)

    } catch (error) {
      if (error.response && error.response.status === 411) {
        setError(error.response.data.error || "User already exists" || "Validation failed.");
      } else {
        setError("There was an error registering the user.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      <form onSubmit={SignupForm}>
        <h1>Sign Up</h1>
        <p>Enter your information to create an account</p>

        <InputFiled
          type="text"
          name="firstName"
          placeholder="Enter your firstname"
          value={Data.firstName}
          onChange={handleChange}
        />

        <InputFiled
          type="text"
          name="lastName"
          placeholder="Enter your lastname"
          value={Data.lastName}
          onChange={handleChange}
        />

        <InputFiled
          type="email"
          name="username"
          placeholder="Enter your email"
          value={Data.username}
          onChange={handleChange}
        />

        <InputFiled
          type="password"
          name="password"
          placeholder="Enter your password"
          value={Data.password}
          onChange={handleChange}
        />
    <h1>Already have an account<Link to="/Signin">Login</Link></h1>

        <input type="submit" value="Register" className="btn" />
      </form>

      {Error && <div className="error">{Error}</div>}
      {Success && <div className="success">{Success}</div>}
    </>
  );
};

export default Signup;
