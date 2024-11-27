Role-Based Access Control (RBAC) System:
LIVE URL TO WEBSITE:
You can view the live website at: https://rajkumar1063.github.io/rbac_final/

This project implements a Role-Based Access Control (RBAC) system using React.js. It allows different user roles such as System Administrator, Data Analyst, and Compliance Officer to access and manage specific parts of the system based on their permissions. Users can log in and be redirected to their respective dashboards where they can manage roles, access sales data, handle permission requests, and more.

Note: Since this project does not use a backend framework, the changes made by the user do not get stored. They will be erased if the website is refreshed and will return to its initial state. Hence, DO NOT refresh the pages in the middle of use.

Table of Contents

1. Introduction
2. Features
3. Technologies
4. Project Structure
5. Routing and Navigation
6. Development
7. Running the Project Locally
8. Login Details


1. Introduction

The Role-Based Access Control (RBAC) system is designed to streamline user management and permissions within an organization. The application dynamically adjusts content and access rights based on the role of the user, ensuring that each user can only access the features and data they are authorized to use.

Key Features:
- User Roles & Permissions:
    - Different users are assigned specific roles such as System Admin, Data Analyst, and Compliance Officer.
    - Roles determine access to the system’s features and data.
    
- Sales Data Dashboard:
    - Data Analysts can access and analyze sales data, generating reports, viewing graphs, and tracking trends.
    
- Role Management:
    - System Admins can assign and modify roles and permissions to users, ensuring appropriate access control across the platform.
    
- Permission Request Management:
    - Users can submit permission requests, which System Admins can approve or deny based on the organizational needs.
    
- Responsive UI:
    - The application is built using Material-UI (MUI) and is fully responsive, ensuring a seamless experience across desktop, tablet, and mobile devices.
    
- Mock API for Development:
    - A mock API is used for simulating the backend during development.


2. Features

The RBAC system is designed to offer a set of functionalities tailored to each user's role, ensuring a smooth workflow for managing permissions, analyzing data, and handling system tasks.

- Role Management:
    - System Admins can:
        - Assign roles (e.g., Data Analyst, Compliance Officer, etc.) to users.
        - Modify user permissions and review role-related activities.
        - Ensure compliance with internal policies by managing who has access to specific system areas.
    - Compliance Officers can:
        - View user roles.
    
- Sales Data Dashboard:
    - Data Analysts can access the Sales Data section, where they can:
        - View and analyze sales trends, generate reports, and interpret key metrics.
        - Use interactive charts and graphs to visualize sales performance over time.

- Permission Requests:
    - Users in different roles can submit permission requests if they need access to additional resources or areas.
    - System Admins have the ability to review and approve or reject these requests, ensuring only authorized users gain elevated permissions.
    
- Compliance Monitoring:
    - Compliance Officers ensure that user permissions and actions within the system comply with internal policies and industry regulations.
    - They have oversight over system activities and can audit actions to maintain security and compliance.

- Responsive Design:
    - The application is built with Material-UI (MUI) for responsive layouts, ensuring that the user interface adapts across various screen sizes and devices.

- Mock API:
    - A mock API is used for simulating the backend during development. It returns predefined responses for various actions such as logging in, viewing data, and managing roles and permissions.
    - This setup allows developers to test and debug the front-end application without needing a live backend.


3. Technologies

This RBAC system is built using the following technologies:

- React.js: A JavaScript library for building user interfaces. It enables the creation of dynamic and interactive web pages with minimal code.
- React Router: For managing navigation and routing in the application. It ensures that the correct components are displayed based on the current URL path.
- Material-UI (MUI): A React UI framework that provides pre-built, customizable components for building modern, responsive user interfaces.
- Bootstrap: For additional responsive design utilities and grid layout systems.
- Mock API: The backend is simulated using a mock API, making it easy to develop and test the application without relying on a live backend service.
- CSS: For global styles and additional customization to enhance the look and feel of the application.


4. Project Structure

The project follows a modular structure where each feature or page is encapsulated in its own component. Below is a breakdown of the project structure:

/rbac-system
  /public
    index.html                  # The HTML template used by React
  /src
    /Components
      LoginPage.js              # Login page component, handles user authentication
      DataAnalyst.js            # Data Analyst Dashboard component
      ComplianceOfficer.js      # Compliance Officer Dashboard component
      SystemAdmin.js            # System Admin Dashboard component
      SalesData.js              # Sales data analysis and visualization component
      RoleManagement.js         # Manage user roles and permissions
      PermissionRequest.js      # Submit and review permission requests
      mockApi.js                # Simulated API used for testing and development
    App.js                        # Main app file containing routing logic
    index.js                      # Entry point for the app
    index.css                     # Global CSS styles
  package.json                     # Project dependencies and scripts
  README.md                        # This README file


5. Routing & Navigation

The application uses React Router to handle routing between different pages. The routing is dynamic based on the user’s role, allowing access to specific features only for authorized users.

The available routes in the application are:

- /: Login Page (authentication)
- /DataAnalyst: Data Analyst Dashboard (view and analyze sales data)
- /ComplianceOfficer: Compliance Officer Dashboard (monitor permissions and system compliance)
- /SystemAdmin: System Admin Dashboard (manage user roles, permissions, and requests)
- /SalesData: Sales Data Page (analyze and visualize sales data)
- /RoleManagement: Role Management Page (assign and modify user roles)
- /PermissionRequest: Permission Request Page (submit and review permission requests)

The System Admin has access to all pages, while the Data Analyst and Compliance Officer can only access certain parts of the system, depending on their roles.


6. Development

Environment Setup

- Node.js: Ensure Node.js is installed on your machine. You can download it here.
- Package Manager: Use either npm or yarn to install dependencies.


7. Running the Project Locally

To run the application locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/Rajkumar1063/Rbac.git

2. Navigate to the project directory:
   cd rbac

3. Install the dependencies:
   npm install

4. Start the development server:
   npm start

5. Access the application in your browser:
   Open your browser and navigate to: http://localhost:3000


8. Login Details

- Data Analyst:
  - User ID: analyst
  - Password: analyst123

- Compliance Officer:
  - User ID: officer
  - Password: officer123

- System Admin:
  - User ID: admin
  - Password: admin123

You can view the live website at: https://rajkumar1063.github.io/rbac_final/
