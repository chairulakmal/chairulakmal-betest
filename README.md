## API Documentation

### Authentication

#### Register

- **Endpoint**: `/register`
- **Method**: POST
- **Description**: Creates a new user.
- **Request Body**:
  - `userName`: User's username
  - `password`: User's password
  - `accountNumber`: User's account number
  - `emailAddress`: User's email address
  - `identityNumber`: User's identity number
- **Response**:
  - Status Code:
    - 201 Created: User created successfully
    - 400 Bad Request: Error in request body or validation
  - Body:
    - User object without password

#### Login

- **Endpoint**: `/login`
- **Method**: POST
- **Description**: Authenticates a user based on provided credentials and returns a JWT token.
- **Request Body**:
  - `userName`: User's username
  - `password`: User's password
- **Response**:
  - Status Code:
    - 200 OK: Successful authentication
    - 401 Unauthorized: Invalid username or password
  - Body:
    - `token`: JWT token for authenticated user

### User Operations

> Authentication: The following routea are protected and requires a valid JWT token in the authorization header. The token is generated for client after successful login. Additionally, the user can only update and delete their own account.

Example Auth Header:

```json
{
  "Authorization": "Bearer <jwt>"
}
```

#### Get User by ID

- **Endpoint**: `/users/:userId`
- **Method**: GET
- **Description**: Retrieves user information by database ID.
- **Path Parameters**:
  - `userId`: Database ID of the user
- **Response**:
  - Status Code:
    - 200 OK: User found
    - 404 Not Found: User not found
  - Body:
    - User object

#### Get User by Account Number

- **Endpoint**: `/users/account/:accountNumber`
- **Method**: GET
- **Description**: Retrieves user information by account number.
- **Path Parameters**:
  - `accountNumber`: Account number of the user
- **Response**:
  - Status Code:
    - 200 OK: User found
    - 404 Not Found: User not found
  - Body:
    - User object

#### Get User by Identity Number

- **Endpoint**: `/users/identity/:identityNumber`
- **Method**: GET
- **Description**: Retrieves user information by identity number.
- **Path Parameters**:
  - `identityNumber`: Identity number of the user
- **Response**:
  - Status Code:
    - 200 OK: User found
    - 404 Not Found: User not found
  - Body:
    - User object

#### Update User

- **Endpoint**: `/users/:userId`
- **Method**: PUT
- **Description**: Updates user information by database ID.
- **Path Parameters**:
  - `userId`: Database ID of the user
- **Request Body**:
  - Updated user data
- **Response**:
  - Status Code:
    - 200 OK: User updated successfully
    - 400 Bad Request: Error in request body or validation
    - 404 Not Found: User not found
  - Body:
    - Updated user object

#### Delete User

- **Endpoint**: `/users/:userId`
- **Method**: DELETE
- **Description**: Deletes a user by database ID.
- **Path Parameters**:
  - `userId`: Database ID of the user
- **Response**:
  - Status Code:
    - 204 No Content: User deleted successfully
    - 404 Not Found: User not found
