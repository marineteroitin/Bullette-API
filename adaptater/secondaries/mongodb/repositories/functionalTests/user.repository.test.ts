const request = require('supertest');
const app = require('../../../../primaries/rest/server');
//const User = require('../User.repository');

const Seed = require('./seed-data');

describe('GET /users/email/:email', () => {
    beforeEach(Seed.populateTestUsers);

    it('should find a user according to a given email', (done) => {
        request(app)
            .get('/users/email/marine.teroitin@gmail.com')
            .expect(200)
            .end((err: any, res: any) => {
                if (err) {
                    return done(err);
                }
                console.log("test email")
                console.log(res.body.data)
                // var data = res.body.data;
                //  expect(data.length).toBe(3);

                done();
            });
    })
})
