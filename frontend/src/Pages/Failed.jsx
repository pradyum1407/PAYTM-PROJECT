import React from "react";
import { useLocation } from "react-router-dom";

const TransactionFailed = () => {
  const location = useLocation();
  const {transaction ,error}= location.state || {}

  if(!transaction){
    return (

      <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9f9f9" }}>
        <div style={{ display: "inline-block", padding: "2rem", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <h1 style={{ color: "Red" }}>❌ Transaction Failed!</h1>
          {error ? (
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>{error}</p>
        ) : (
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>Your transfer was unsuccessful.</p>
        )}  



  {transaction && (
          <div style={{ textAlign: "left", margin: "1rem 0", fontSize: "1rem" }}>
            <p><strong>Sender ID:</strong> {transaction.senderId}</p>
            <p><strong>Recipient ID:</strong> {transaction.receiverId}</p>
            <p><strong>Amount:</strong> ₹{transaction.Amount}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
          </div>
  )}
        </div>
      </div>
    );
  };

  }

export default TransactionFailed