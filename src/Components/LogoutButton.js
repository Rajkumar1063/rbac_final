import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Navigate to the login page
    navigate("/");
  };
  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;