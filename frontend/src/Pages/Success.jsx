import React from "react";
import { useLocation} from "react-router-dom";

const TransactionSuccess = () => {
  const location = useLocation();
  const transaction=location.state?.transaction

  if (!transaction) {
    return <p>No transaction details available.</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ display: "inline-block", padding: "2rem", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ color: "#28a745" }}>✔ Transaction Successful!</h1>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>Your transfer was completed successfully.</p>

        <div style={{ textAlign: "left", margin: "1rem 0", fontSize: "1rem" }}>
        <p><strong>Transaction ID:</strong> {transaction._id}</p>
      <p><strong>Sender ID:</strong> {transaction.senderId}</p>
      <p><strong>Recipient ID:</strong> {transaction.receiverId}</p>
      <p><strong>Amount:</strong> ₹{transaction.Amount}</p>
      <p><strong>Status:</strong> {transaction.status}</p>
      <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess
