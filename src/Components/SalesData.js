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
  Typography,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SalesData({ userRole, onBack }) {
  const [sales, setSales] = useState([]); // Stores all sales data
  const [filteredSales, setFilteredSales] = useState([]); // Stores filtered sales data based on search query
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search input value
  const [showSearch, setShowSearch] = useState(false); // Controls the visibility of the search input field
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the modal for adding/editing sales
  const [editingSale, setEditingSale] = useState(null); // Stores the sale currently being edited

  // Pagination state
  const [page, setPage] = useState(0); // Tracks the current page of the table
  const [rowsPerPage, setRowsPerPage] = useState(5); // Controls how many rows are displayed per page

  useEffect(() => {
    fetchSalesData(); // Fetch sales data when the component mounts
  }, []);

  useEffect(() => {
    handleSearch(); // Re-filter the sales list whenever the search query or sales data changes
  }, [searchQuery, sales]);

  // Function to fetch sales data from the server
  const fetchSalesData = () => {
    axios
      .get("/api/sales") // Makes a GET request to fetch sales data
      .then((response) => {
        setSales(response.data); // Updates the sales data in state
        setFilteredSales(response.data); // Initializes the filtered sales list with all sales
      })
      .catch((error) => console.error("Error fetching sales data:", error));
  };

  // Function to filter sales data based on the search query
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredSales(sales); // If search query is empty, show all sales
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredSales(
        sales.filter((sale) =>
          sale.product.toLowerCase().includes(lowerCaseQuery) // Filters sales based on product name
        )
      );
    }
  };

  // Function to open the modal for adding a new sale
  const handleAddSale = () => {
    setEditingSale(null); // Reset editingSale when adding a new sale
    setShowModal(true); // Open the modal
  };

  // Function to open the modal for editing an existing sale
  const handleEditSale = (sale) => {
    setEditingSale(sale); // Set the sale being edited
    setShowModal(true); // Open the modal
  };

  // Function to delete a sale from the database
  const handleDeleteSale = (saleId) => {
    axios
      .delete(`/api/sales/${saleId}`) // Makes a DELETE request to delete a sale by ID
      .then(() => fetchSalesData()) // Refresh sales data after deletion
      .catch((error) => console.error("Error deleting sale:", error));
  };

  // Function to handle form submission for adding or editing a sale
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const sale = {
      id: editingSale ? editingSale.id : Date.now(), // Use existing sale ID for editing, or generate a new ID
      product: form.product.value, // Get the product name from the form input
      amount: form.amount.value, // Get the sale amount from the form input
      date: form.date.value, // Get the date from the form input
    };

    // Decide whether to send a POST (add) or PUT (edit) request based on whether the sale is being edited
    const apiCall = editingSale
      ? axios.put(`/api/sales/${sale.id}`, sale) // PUT request to update the sale
      : axios.post("/api/sales", sale); // POST request to add a new sale

    // Send the request and refresh sales data upon success
    apiCall
      .then(() => {
        fetchSalesData(); // Refresh the sales data
        setShowModal(false); // Close the modal
      })
      .catch((error) => console.error("Error saving sale:", error));
  };

  // Function to sort the sales data by a specific field (e.g., product, amount, date)
  const handleSort = (field) => {
    const sortedSales = [...filteredSales].sort((a, b) => {
      if (field === "date") {
        return new Date(a[field]) - new Date(b[field]); // Sort by date if the field is "date"
      }
      return a[field] > b[field] ? 1 : -1; // Otherwise, sort alphabetically or numerically
    });
    setFilteredSales(sortedSales); // Update the filtered sales state with the sorted list
  };

  // Function to reset the search query and show all sales
  const handleResetSearch = () => {
    setSearchQuery(""); // Clear the search query
    setFilteredSales(sales); // Show all sales again
    setShowSearch(false); // Hide the search field
  };

  // Function to handle page change in the table
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the current page
  };

  // Function to handle the change in number of rows per page in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Set the new number of rows per page
    setPage(0); // Reset to the first page when rows per page changes
  };

  return (
    <Box sx={{ bgcolor: "#fafafa", p: 4, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 3 }}
          color="primary"
        >
          Sales Data
        </Typography>

        {/* Controls for adding, searching, and sorting sales */}
        <Grid container spacing={3} alignItems="center" className="mb-3">
          <Grid item xs={12} sm={4}>
            <Tooltip title="Add Sale">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddSale} // Trigger the add sale modal
                fullWidth
                sx={{
                  backgroundColor: "#483D8B",
                  "&:hover": { backgroundColor: "#388e3c" },
                  fontWeight: "bold",
                }}
              >
                Add Sale
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={4}>
            {showSearch ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  fullWidth
                  placeholder="Search by Product Name"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  }}
                  sx={{ marginBottom: 2 }}
                />
                <IconButton onClick={handleResetSearch}>
                  <ClearIcon sx={{ color: "#f44336" }} />{" "}
                  {/* Reset Search Icon */}
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                onClick={() => setShowSearch(true)} // Show the search input field
                fullWidth
                sx={{
                  backgroundColor: "#9c27b0",
                  "&:hover": { backgroundColor: "#f57c00" },
                  fontWeight: "bold",
                }}
              >
                Search
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleSort("date")} // Sort sales by date
              fullWidth
              sx={{
                borderColor: "#2196f3",
                "&:hover": { borderColor: "#1976d2" },
                fontWeight: "bold",
              }}
            >
              Sort by Date
            </Button>
          </Grid>
        </Grid>

        {/* Sales Table */}
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{ borderRadius: 2 }}
        >
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort("product")}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#ff9800",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableCell>
                {userRole === "admin" && (
                  <TableCell
                    sx={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.product}</TableCell>
                    <TableCell>{sale.amount}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    {userRole === "admin" && (
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => handleEditSale(sale)} // Trigger edit modal
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDeleteSale(sale.id)} // Trigger delete sale function
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Modal for adding/editing a sale */}
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle>{editingSale ? "Edit Sale" : "Add Sale"}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleFormSubmit}>
              <TextField
                fullWidth
                label="Product"
                name="product"
                defaultValue={editingSale ? editingSale.product : ""}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                defaultValue={editingSale ? editingSale.amount : ""}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                defaultValue={editingSale ? editingSale.date : ""}
                required
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <DialogActions>
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit">{editingSale ? "Save Changes" : "Add Sale"}</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

export default SalesData;
