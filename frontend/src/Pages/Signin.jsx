import React, { useState } from 'react'

import { InputFiled } from '../components/app/user/Input'
import { signinform } from '../components/app/user/signin'
import { useNavigate ,Link} from 'react-router-dom'

const Signin = () => {
  const navigate=useNavigate();
  const [data, setdata] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  const handlechange = async (e) => {
    setdata({...data, 
      [e.target.name]: e.target.value
    })

    setError("")
    setSuccess("")
  }

  const ValidateForm = () => {
    if (!data.username || !data.password) {
      setError("Please fill all the input fields.");
      return false;
    }
    return true;
  };

  const SigninForm = async(e) => {
    e.preventDefault();

    if (!ValidateForm()) return;

    try{
      const response=await signinform(data);
      setError("")
      setSuccess("user has been succesfully Loggedin");

      localStorage.setItem("authtoken",response.token);
    

      setTimeout(()=>{
        navigate("/");
      },5000)

    }
    catch (error) {
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

      <h1>Sign In</h1>
      <p>Enter your credentials to access your account</p>
      <form onSubmit={SigninForm}>

        <InputFiled
          type="email"
          name="username"
          value={data.username}
          placeholder="username"
          onChange={handlechange}
          />

        <InputFiled
          type="password"
          name="password"
          value={data.password}
          placeholder="password"
          onChange={handlechange}
          />

<h5>Does not have an account<Link to="/signup">SignUp</Link></h5>
        <input type='submit' value="signin" />

      </form>
     {error && <div>{error}</div>}
     {success && <div>{success}</div>}

    </>
  )
}

export default Signin