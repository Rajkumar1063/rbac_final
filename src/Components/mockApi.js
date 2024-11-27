import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import data from "./data.json";

// Use the data from data.json
let { users, sales, requests, Roles } = JSON.parse(JSON.stringify(data)); // Deep copy to avoid mutation
const mock = new MockAdapter(axios, { delayResponse: 200 });

// Mock authentication endpoint
mock.onPost("/api/authenticate").reply((config) => {
  const { userId, password } = JSON.parse(config.data);
  const user = users.find(
    (u) => u.userId === userId && u.password === password
  );
  return [200, { isAuthenticated: !!user, role: user ? user.role : null }];
});

// Mock user registration endpoint
mock.onPost("/api/register").reply((config) => {
  const { userId, password, role } = JSON.parse(config.data);
  const existingUser = users.find((u) => u.userId === userId);
  if (existingUser) {
    return [200, { isRegistered: false, message: "User ID already taken" }];
  }
  users.push({
    id: users.length + 1,
    userId,
    password,
    role,
    status: "Active",
  });
  return [200, { isRegistered: true }];
});

// Mock endpoint to fetch sales data
mock.onGet("/api/sales").reply(200, sales);

// Mock endpoint to add new sale
mock.onPost("/api/sales").reply((config) => {
  const newSale = JSON.parse(config.data);
  sales.push(newSale);
  return [200, newSale];
});

// Mock endpoint to update sale by id
mock.onPut(/\/api\/sales\/\d+/).reply((config) => {
  const updatedSale = JSON.parse(config.data);
  const saleIndex = sales.findIndex((sale) => sale.id === updatedSale.id);
  if (saleIndex >= 0) {
    sales[saleIndex] = updatedSale;
    return [200, updatedSale];
  }
  return [404, { message: "Sale not found" }];
});

// Mock endpoint to delete sale by id
mock.onDelete(/\/api\/sales\/\d+/).reply((config) => {
  const saleId = parseInt(config.url.split("/").pop(), 10);
  const saleIndex = sales.findIndex((sale) => sale.id === saleId);
  if (saleIndex >= 0) {
    sales.splice(saleIndex, 1);
    return [200];
  }
  return [404, { message: "Sale not found" }];
});

// Mock endpoint to fetch permission requests
mock.onGet("/api/requests").reply(200, requests);

// Mock endpoint to add new permission request
mock.onPost("/api/requests").reply((config) => {
  const newRequest = JSON.parse(config.data);
  requests.push(newRequest);
  return [200, newRequest];
});

// Mock endpoint to update request status by id
mock.onPut(/\/api\/requests\/\d+/).reply((config) => {
  const { status } = JSON.parse(config.data);
  const requestId = parseInt(config.url.split("/").pop(), 10);
  const requestIndex = requests.findIndex(
    (request) => request.id === requestId
  );
  if (requestIndex >= 0) {
    requests[requestIndex].status = status;
    return [200, requests[requestIndex]];
  }
  return [404, { message: "Request not found" }];
});

// Mock endpoint to fetch users
mock.onGet("/api/users").reply(200, users);

// Mock endpoint to update user by id
mock.onPut(/\/api\/users\/\d+/).reply((config) => {
  const updatedUser = JSON.parse(config.data);
  const userIndex = users.findIndex((user) => user.id === updatedUser.id);
  if (userIndex >= 0) {
    users[userIndex] = updatedUser;
    return [200, updatedUser];
  }
  return [404, { message: "User not found" }];
});

// Mock endpoint to delete user by id
mock.onDelete(/\/api\/users\/\d+/).reply((config) => {
  const userId = parseInt(config.url.split("/").pop(), 10);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    return [200];
  }
  return [404, { message: "User not found" }];
});

// Mock endpoint to fetch roles
mock.onGet("/api/roles").reply(200, Roles);

export default function setupMock() {
  return mock;
}
