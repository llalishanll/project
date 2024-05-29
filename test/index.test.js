import chai from 'chai';
import chaiHttp from 'chai-http';

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

// Assuming your app is exported as a default module
import app from '../index';

describe('GET /', () => {
    it('responds with HTML containing "Person\'s name..."', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.contain('Person\'s name...');
                done();
            });
    });
});

describe('GET /index', () => {
    it('responds with JSON containing wiki data for a valid person', (done) => {
        chai.request(app)
            .get('/index?person=Albert_Einstein')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('description');
                // Add more assertions based on the expected structure of the wiki data
                done();
            });
    });

    it('redirects to 404 page for an invalid person', (done) => {
        chai.request(app)
            .get('/index?person=Invalid_Person')
            .end((err, res) => {
                expect(res).to.redirectTo('/404');
                done();
            });
    });
});
