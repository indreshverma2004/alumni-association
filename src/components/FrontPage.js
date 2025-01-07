import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => navigate("/signup");
  const handleLogin = () => navigate("/login");

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>
        <button style={styles.button} onClick={handleLogin}>
          Log In
        </button>
      </div>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to NIT Raipur</h1>
        <p style={styles.description}>
          Established in 1956, the National Institute of Technology Raipur (NITRR) is a premier institution 
          dedicated to excellence in education and research. We nurture talent and foster innovation, 
          shaping future leaders for a better tomorrow.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: "url('https://www.targetadmission.com/img/colleges/newc/48966-610151.jpg')", // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    fontFamily: "'Arial', sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  navbar: {
    position: "absolute",
    top: 20,
    right: 20,
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  content: {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "20px",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.6",
  },
};

export default FrontPage;
