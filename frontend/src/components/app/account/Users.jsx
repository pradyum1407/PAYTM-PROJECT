import React, { useEffect, useState } from "react";
import axios from "axios";


export const Users = () => {
    const [users, setusers] = useState([]); // State to store user data
    const [filter, setfilter] = useState(""); // Unused in the current implementation
  
    // Fetch users on component mount
    useEffect(() => {
      axios
        .get("http://localhost:3000/app/v1/user/bulk?filter="+ filter, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}` // Authorization header
          }
        })
        .then(response => {
          console.log("Response from backend:", response.data); // Debugging log
          setusers(response.data.user); // Set the user data into state
        })
        .catch(error => {
          console.error("Error fetching users:", error.response?.data || error.message);
        });
    }, [filter]);
  
    return (
      <>
    <input type="text" onChange={(e)=>{
      setfilter(e.target.value)} } placeholder="search the user here"/>
        {users.map(user => (
          <User key={user._id} user={user} /> // Pass user data to the User component
        ))}
      </>
    );
  };
  
  function User({ user }) {
    return (
      <div>
        <p> {user.firstName} {user.lastName}</p>
      </div>
    );
  }

