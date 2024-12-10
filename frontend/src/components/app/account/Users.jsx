import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Skeleton library (install with npm install react-loading-skeleton)
import "react-loading-skeleton/dist/skeleton.css"; // Optional styling for skeletons

export const Users = () => {
  const [users, setusers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State for loader
  const [filter, setfilter] = useState(""); // State for filter input

  // Fetch users on component mount or filter change
  useEffect(() => {
    setLoading(true); // Show loader when fetching data
    axios
      .get("http://localhost:3000/app/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`, // Authorization header
        },
      })
      .then((response) => {
        console.log("Response from backend:", response.data); // Debugging log
        setTimeout(()=>{
          setusers(response.data.user); // Set the user data into state
          setLoading(false);
        },[1000])
      })
      .catch((error) => {
        console.error("Error fetching users:", error.response?.data || error.message);
        setLoading(false);
      })
  }, [filter]);

  return (
    <div>
      {/* Input for filtering users */}
      <input
        type="text"
        onChange={(e) => setfilter(e.target.value)}
        placeholder="Search the user here"
      />

      {/* Show skeletons while loading, and user data when loaded */}
      {loading ? (
        // Display skeleton placeholders
        Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Skeleton height={20} width={150} /> {/* Skeleton for user name */}
              <Skeleton height={30} width={100} style={{ marginTop: "5px" }} /> {/* Skeleton for button */}
            </div>
          ))
      ) : (
        // Display actual user data when not loading
        users.map((user) => <User key={user._id} user={user} />)
      )}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: "10px" }}>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <button
        onClick={() =>
          navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }
      >
        Send Money
      </button>
    </div>
  );
}
