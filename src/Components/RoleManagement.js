import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function RoleManagement({ userRole, onBack }) {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPrompt, setShowSearchPrompt] = useState(false);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
        setOriginalUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const fetchRoles = () => {
    axios
      .get("/api/roles")
      .then((response) => {
        setRoles(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setRoles([]);
      });
  };

  const handleEditRole = (user) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setShowEditModal(true);
  };

  const handleDeleteRole = (userId) => {
    axios
      .delete(`/api/users/${userId}`)
      .then(() => fetchUsers())
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...editingUser, role: selectedRole };

    axios
      .put(`/api/users/${updatedUser.id}`, updatedUser)
      .then(() => {
        fetchUsers();
        setShowEditModal(false);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    axios
      .post("/api/register", { userId, password, role: selectedRole })
      .then((response) => {
        if (response.data.isRegistered) {
          alert("User registered successfully!");
          fetchUsers();
          setShowAddUserModal(false);
          setUserId("");
          setPassword("");
          setSelectedRole("");
          setError("");
        } else {
          setError(response.data.message || "Registration failed. Please try again.");
        }
      })
      .catch(() => setError("An error occurred. Please try again."));
  };

  const handleSearch = () => {
    setShowSearchPrompt(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredUsers = originalUsers.filter((user) =>
      user.id.toString().includes(searchQuery)
    );
    setUsers(filteredUsers);
    setShowSearchPrompt(false);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setUsers(originalUsers);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ bgcolor: "#f0f0f0", p: 3, minHeight: "100vh" }}>
      <Container>
        <h2>Role Management</h2>
        {userRole === "System Admin" && (
          <Grid container spacing={2} className="mb-3">
            <Grid item xs={12} sm={6}>
              <Tooltip title="Add User">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddUser}
                  fullWidth
                >
                  Add User
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Search by ID">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  fullWidth
                >
                  Search User by ID
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        )}

        {searchQuery && (
          <Grid container justifyContent="center" className="mb-3">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetSearch}
            >
              Reset Search
            </Button>
          </Grid>
        )}

        <TableContainer component={Paper}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: "#4caf50", color: "white" }}>ID</TableCell>
                <TableCell sx={{ bgcolor: "#ff9800", color: "white" }}>User ID</TableCell>
                <TableCell sx={{ bgcolor: "#2196f3", color: "white" }}>Role</TableCell>
                <TableCell sx={{ bgcolor: "#9c27b0", color: "white" }}>Status</TableCell>
                {userRole === "System Admin" && (
                  <TableCell sx={{ bgcolor: "#4caf50", color: "white" }}>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  {userRole === "System Admin" && (
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditRole(user)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteRole(user.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogContent>
            <form onSubmit={handleEditFormSubmit}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Select Role</FormLabel>
                <RadioGroup
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <FormControlLabel
                      key={role.roleName}
                      value={role.roleName}
                      control={<Radio />}
                      label={role.roleName}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditFormSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showAddUserModal} onClose={() => setShowAddUserModal(false)}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <form onSubmit={handleAddUserSubmit}>
              <TextField
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                margin="dense"
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="dense"
                required
                helperText="Minimum 6 characters"
              />
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Select Role</FormLabel>
                <RadioGroup
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <FormControlLabel
                      key={role.roleName}
                      value={role.roleName}
                      control={<Radio />}
                      label={role.roleName}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {error && <Alert severity="error">{error}</Alert>}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddUserModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUserSubmit}
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>

        {showSearchPrompt && (
          <Dialog open={true} onClose={() => setShowSearchPrompt(false)}>
            <DialogTitle>Search by ID</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  label="User ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearchSubmit}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </Box>
  );
}

export default RoleManagement;
