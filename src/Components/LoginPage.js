import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Clear input fields when the component mounts
  useEffect(() => {
    setUserId("");
    setPassword("");
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send authentication request to the server
    axios
      .post("/api/authenticate", { userId, password })
      .then((response) => {
        const { isAuthenticated, role } = response.data;
        if (isAuthenticated) {
          // Navigate to the appropriate dashboard based on the user's role
          if (role === "System Admin") {
            navigate("/SystemAdmin");
          } else if (role === "Compliance Officer") {
            navigate("/ComplianceOfficer");
          } else if (role === "Data Analyst") {
            navigate("/DataAnalyst");
          } else {
            setError("Invalid role. Please contact the administrator.");
          }
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ bgcolor: "#f0f0f0", p: 3, mt: 4, borderRadius: 2 }}
    >
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="User ID"
          variant="outlined"
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Display error message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
