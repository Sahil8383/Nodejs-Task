# Employee Management System API

## Contribution

1. Clone the repository:
   ```bash
   git clone https://github.com/Sahil8383/Nodejs-Task
   cd nodejs-task
   
2. Install Dependencies
   ```bash
   npm i

3. Create a .env file with below variables
   ```bash
   MONGODB_URI = your-mongodb-atlas-uri
   ACCESS_KEY = random-key

4. Run the App
   ```bash
   npm start

## Overview

The Employee Management System API is designed to provide functionality for employee authentication, management, and basic CRUD operations.

## Endpoints

### Sign Up
- **Endpoint:** `POST /employee`
- **Description:** Create a new employee account.

### Login
- **Endpoint:** `POST /login`
- **Description:** Authenticate and obtain an access token.

### Get All Employees
- **Endpoint:** `GET /employees`
- **Description:** Retrieve a list of all employees.
- **Authentication:** Requires a valid JWT token in the headers.

### Get Employee by ID
- **Endpoint:** `GET /employee/:id`
- **Description:** Retrieve details of a specific employee by ID.
- **Authentication:** Requires a valid JWT token.

### Update Employee
- **Endpoint:** `PATCH /employee/:id`
- **Description:** Update details of an existing employee by ID.
- **Authentication:** Requires a valid JWT token.

### Delete Employee
- **Endpoint:** `DELETE /employee/:id`
- **Description:** Delete a specific employee by ID.
- **Authentication:** Requires a valid JWT token.

## Validation

Employee data is validated using the Joi library.

## Dependencies

- Express
- Mongoose
- Joi
- bcrypt
- cors
- dotenv
- jsonwebtoken

