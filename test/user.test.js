const chai = require('chai');
const expect = chai.expect;
const app = require('../app.js'); // Replace with the actual path to your app.js


describe('Server Setup', () => {
    it('should start the server without errors', (done) => {
        // Start your server
        const server = app.listen(3000, () => {
            // Perform test assertions, e.g., check if server is listening
            expect(server).to.be.an('object');
            expect(server.address().port).to.equal(3000);

            // Close the server to release the port
            server.close(done);
        });
    });
});

describe('Middleware Configurations', () => {
    it('should have middleware for handling requests', () => {
        // Test your middleware configurations
        // For example, check if you've set up body-parser, cookie-parser, etc.
    });
});

