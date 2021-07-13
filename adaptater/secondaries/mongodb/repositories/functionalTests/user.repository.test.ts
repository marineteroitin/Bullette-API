const request = require('supertest');
const { app } = require('../../../../primaries/rest/server');
//const User = require('../User.repository');

const Seed = require('./seed-data');

// get a user by email
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

                var user = res.body;
                expect(user.email).toBe('marine.teroitin@gmail.com');

                done();
            });
    })
})

// TODO register
describe('POST /users/register', () => {
    beforeEach(Seed.populateTestUsers);

    it('should create a user', (done) => {
        var email = 'l.teroitin@gmail.com';
        var firstName = 'Laure';
        var password = 'poiuy';

        request(app)
            .post('/users/register')
            .set({
                email,
                firstName,
                password
            })
            .expect(201)
            .expect((res: any) => {

                console.log(res.body);
                /* Moi cest un token et pas un user..
                expect(res.body.data.user.firstName).toBe(user.firstName);
                expect(res.body.data.user.lastName).toBe(user.lastName);
                expect(res.body.data.user.email).toBe(user.email);
                expect(res.body.data.user.password).not.toBe(user.password);
*/
            })
            .end((err: any) => {

                if (err) {
                    return done(err);
                }
/*
                User.findOne({ email: 'l.teroitin@gmail.com' }).then((currentUser) => {
                    expect(currentUser).toBeTruthy();
                    done();
                }).catch((e) => {
                    done(e);
                })
*/
done();
            });
    })
})