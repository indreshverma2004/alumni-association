import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    rollNo: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    try {
      await axios.post("http://localhost:5000/api/users/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Signup</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            onChange={handleChange}
            value={formData.rollNo}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <p style={styles.text}>
          Already signed up? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundImage: "url('https://www.targetadmission.com/img/colleges/newc/48966-610151.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Translucent background for readability
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
  text: {
    marginTop: "10px",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default Signup;
