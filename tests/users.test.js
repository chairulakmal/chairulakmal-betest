const request = require('supertest');
const app = require('../app');
const { encodeToken } = require('../utils/auth');

describe('User API', () => {
    const password = 'test_password'
    // Define a test user object for creating/updating
    const testUser = {
        userName: 'test_user',
        accountNumber: '1234567890',
        emailAddress: 'test@example.com',
        identityNumber: '1234567890',
        password
    };

    let userId; // Variable to store the ID of the created user
    let token; // Variable to store the ID of the logged in user

    // Test POST /register endpoint to create a user
    test('POST /register should create a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send(testUser);

        delete testUser.password // password hash is not sent after successful registration

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(testUser);
        userId = response.body._id; // Save the created user ID for later use
    });

    // Test POST /login endpoint to authenticate a user and get a token
    test('POST /login should authenticate a user', async () => {
        testUser.password = password
        const response = await request(app)
            .post('/login')
            .send(testUser);
        token = encodeToken({ id: userId })

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ token });
    });

    // 200 Test GET /users/:userId endpoint to retrieve a user by ID
    test('GET /users/:userId should retrieve a user by ID', async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe(testUser.userName);
    });

    // 404 Test GET /users/:userId endpoint to retrieve a non-existing user
    test('GET /users/:userId should retrieve a user by ID', async () => {
        const response = await request(app)
            .get(`/users/123`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    // Test GET /users/:userId endpoint to retrieve a user by ID from cache
    test('GET /users/:userId should retrieve a user by ID', async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe(testUser.userName);
    });

    // Test PUT /users/:userId endpoint to update a user by ID
    test('PUT /users/:userId should update a user by ID', async () => {
        const updatedUser = { ...testUser, userName: 'updated_user' };

        const response = await request(app)
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUser);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe(updatedUser.userName);
    });

    // 200 Test GET /users/account/:accountNumber endpoint to retrieve a user by account number
    test('GET /users/account/:accountNumber should retrieve a user by account number', async () => {
        const response = await request(app)
            .get(`/users/account/${testUser.accountNumber}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.accountNumber).toBe(testUser.accountNumber);
    });

    // 404 Test GET /users/account/:accountNumber endpoint to retrieve a non-existing user
    test('GET /users/account/:accountNumber should retrieve a user by account number', async () => {
        const response = await request(app)
            .get(`/users/account/123`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    // 200 Test GET /users/identity/:identityNumber endpoint to retrieve a user by identity number
    test('GET /users/identity/:identityNumber should retrieve a user by identity number', async () => {
        const response = await request(app)
            .get(`/users/identity/${testUser.identityNumber}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.identityNumber).toBe(testUser.identityNumber);
    });

    // 404 Test GET /users/identity/:identityNumber endpoint to retrieve non-existing user
    test('GET /users/identity/:identityNumber should retrieve a user by identity number', async () => {
        const response = await request(app)
            .get(`/users/identity/123`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    // Test DELETE /users/:userId endpoint to delete a user by ID
    test('DELETE /users/:userId should delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });
});
