import React, { useState } from "react";
import { AppBar, Box, Typography, Link, Toolbar, Grid, Container, Paper, CssBaseline } from "@mui/material";
import RoleManagement from "./RoleManagement";
import SalesData from "./SalesData";
import PermissionRequest from "./PermissionRequest";
import LogoutButton from "./LogoutButton";

function SystemAdmin() {
  const [selectedTab, setSelectedTab] = useState(0);


  return (
    <div>
      <CssBaseline />
      {/* AppBar with Left-aligned Title and Right-aligned Links */}
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Left-aligned Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            System Admin Dashboard
          </Typography>

          {/* Right-aligned Navigation Links */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              component="button"
              variant="body2"
              color="inherit"
              onClick={() => setSelectedTab(0)}
              sx={{
                marginRight: 3,
                cursor: "pointer",
                '&:hover': { color: "#ffd700" }
              }}
            >
              Home
            </Link>
            <Link
              component="button"
              variant="body2"
              color="inherit"
              onClick={() => setSelectedTab(1)}
              sx={{
                marginRight: 3,
                cursor: "pointer",
                '&:hover': { color: "#ffd700" }
              }}
            >
              User Roles
            </Link>
            <Link
              component="button"
              variant="body2"
              color="inherit"
              onClick={() => setSelectedTab(2)}
              sx={{
                marginRight: 3,
                cursor: "pointer",
                '&:hover': { color: "#ffd700" }
              }}
            >
              Sales Data
            </Link>
            <Link
              component="button"
              variant="body2"
              color="inherit"
              onClick={() => setSelectedTab(3)}
              sx={{
                marginRight: 3,
                cursor: "pointer",
                '&:hover': { color: "#ffd700" }
              }}
            >
              Permission Requests
            </Link>

            {/* Logout in Navbar */}
            <Box sx={{ marginLeft: 3 }}>
              <LogoutButton />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box p={3}>
        {selectedTab === 0 && (
          <Container>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Welcome to the Dashboard
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" paragraph>
                    Here you will find tools and features tailored to help you manage your responsibilities effectively.
                    Depending on your role, you will have access to different sections and functionalities designed to support your work.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Key Features:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>Data Analytics</strong>: Analyze various datasets, generate reports, and gain insights to help make data-driven decisions.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>Role Management</strong>: Modify user permissions, review user activities, and assign roles to team members.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>Permissions Management</strong>: Submit and review permission requests based on operational needs or system requirements.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Your Responsibilities:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    As part of your role, you are entrusted with ensuring smooth system operations, reviewing activities, and managing user roles or permissions.
                    The dashboard provides a centralized place for you to access tools for managing these tasks.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>Monitor and Analyze</strong>: Review key metrics and trends based on data analysis. Keep track of user activity and system health.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>System Administration</strong>: Ensure that the system operates smoothly by reviewing logs, managing roles, and troubleshooting issues.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    - <strong>Compliance Monitoring</strong>: Ensure that all activities comply with industry regulations and company policies, and manage permissions accordingly.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    How to Get Started:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    To get started, select one of the available tabs to explore the relevant section for your role.
                    You can manage user roles, analyze sales data, submit permission requests, and more.
                    If you're unsure of where to start, explore the <strong>Help</strong> section for guidance.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Need Help?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    If you need assistance, check the FAQs or contact support. Our team is available to guide you through any issues or queries you may have.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        )}

        {selectedTab === 1 && <RoleManagement userRole="System Admin" />}
        {selectedTab === 2 && <SalesData userRole="System Admin" />}
        {selectedTab === 3 && <PermissionRequest userRole="System Admin" />}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            System Admin Dashboard - Manage your responsibilities effectively
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
             Company {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default SystemAdmin;
