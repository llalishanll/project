const request = require('supertest');
const { app, server } = require('../index');

describe('Server', () => {
    afterAll(() => {
        server.close(); // Close the server after running tests
    });

    it('should return the index page', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Simple Node.js App');
    });

    it('should handle non-existent routes', async () => {
        const response = await request(app).get('/non-existent');
        expect(response.status).toBe(404);
    });
});
