const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    // Define a test user object for creating/updating
    const testUser = {
        userName: 'test_user',
        accountNumber: '1234567890',
        emailAddress: 'test@example.com',
        identityNumber: '1234567890',
    };

    let userId; // Variable to store the ID of the created user

    // Test POST /users endpoint to create a user
    test('POST /users should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(testUser);
        userId = response.body._id; // Save the created user ID for later use
        console.log(response.body);
    });

    // Test GET /users/:userId endpoint to retrieve a user by ID
    test('GET /users/:userId should retrieve a user by ID', async () => {
        console.log({ userId });

        const response = await request(app)
            .get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe(testUser.userName);
    });

    // Test PUT /users/:userId endpoint to update a user by ID
    test('PUT /users/:userId should update a user by ID', async () => {
        const updatedUser = { ...testUser, userName: 'updated_user' };

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe(updatedUser.userName);
    });

    // Test GET /users/account/:accountNumber endpoint to retrieve a user by account number
    test('GET /users/account/:accountNumber should retrieve a user by account number', async () => {
        const response = await request(app)
            .get(`/users/account/${testUser.accountNumber}`);

        expect(response.status).toBe(200);
        expect(response.body.accountNumber).toBe(testUser.accountNumber);
    });

    // Test GET /users/identity/:identityNumber endpoint to retrieve a user by identity number
    test('GET /users/identity/:identityNumber should retrieve a user by identity number', async () => {
        const response = await request(app)
            .get(`/users/identity/${testUser.identityNumber}`);

        expect(response.status).toBe(200);
        expect(response.body.identityNumber).toBe(testUser.identityNumber);
    });

    // Test DELETE /users/:userId endpoint to delete a user by ID
    test('DELETE /users/:userId should delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/users/${userId}`);

        expect(response.status).toBe(204);
    });
});