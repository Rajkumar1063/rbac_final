import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function PermissionRequest({ userRole }) {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState("");

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch all permission requests from the server
  const fetchRequests = () => {
    axios
      .get("/api/requests")
      .then((response) => setRequests(response.data))
      .catch((error) => console.error("Error fetching requests:", error));
  };

  // Handle adding a new request
  const handleAddRequest = () => {
    if (!newRequest.trim()) return;

    const request = {
      id: Date.now(),
      role: userRole,
      request: newRequest,
      status: "Pending",
    };

    axios
      .post("/api/requests", request)
      .then(() => {
        fetchRequests();
        setShowModal(false);
        setNewRequest(""); // Clear the input field
      })
      .catch((error) => console.error("Error adding request:", error));
  };

  // Handle updating request status
  const handleUpdateRequest = (requestId, status) => {
    axios
      .put(`/api/requests/${requestId}`, { status })
      .then(() => fetchRequests())
      .catch((error) => console.error("Error updating request:", error));
  };

  // Handle closing the modal and resetting the input field
  const handleCloseModal = () => {
    setShowModal(false);
    setNewRequest(""); // Reset the input field when modal closes
  };

  return (
    <Box sx={{ bgcolor: "#f4f4f9", minHeight: "100vh", py: 4 }}>
      <Container>
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
        >
          Permission Requests
        </Typography>

        {/* Show 'Request Permission' button for Data Analyst */}
        {userRole === "Data Analyst" && (
          <Box textAlign="center" mb={3}>
            <Tooltip title="Request Permission">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setShowModal(true)}
              >
                Request Permission
              </Button>
            </Tooltip>
          </Box>
        )}

        {/* Display requests table for System Admin */}
        {userRole === "System Admin" && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Request</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.role}</TableCell>
                    <TableCell>{request.request}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Approve">
                        <IconButton
                          color="success"
                          onClick={() =>
                            handleUpdateRequest(request.id, "Approved")
                          }
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deny">
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleUpdateRequest(request.id, "Denied")
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Request Permission Dialog */}
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Request Permission</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              label="Request"
              placeholder="Enter your request"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleAddRequest}
              variant="contained"
              color="primary"
            >
              Submit Request
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default PermissionRequest;