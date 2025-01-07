import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    phone: "",
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
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
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
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phone}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <p style={styles.text}>
          Not signed up? <Link to="/signup" style={styles.link}>Signup here</Link>
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
    display: "flex", // Makes content vertically centered
    alignItems: "center", // Centers the child div horizontally
    justifyContent: "center", // Centers the child div horizontally
  },
  container: {
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Adds a translucent background for readability
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
    backgroundColor: "#28a745",
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

export default Login;
