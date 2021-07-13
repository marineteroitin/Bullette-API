import { convertToObject } from "typescript";

const request = require('supertest');
const { app } = require('../../../../primaries/rest/server');
const User = require('../../entities/User.model');

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


describe('POST /users/register', () => {
    beforeEach(Seed.populateTestUsers);

    it('should create a user', (done) => {
        var email = 'l.teroitin@gmail.com';
        var firstName = 'Laure';
        var password = 'poiuy';

        request(app)
            .post('/users/register')
            .send({
                email,
                firstName,
                password
            })
            .expect(201)
            .expect((res: any) => {
                expect(res.body.firstName).toBe(firstName);
                expect(res.body.email).toBe(email);
                expect(res.body.emailConfirmed).toBe(false);

            })
            .end((err: any) => {

                if (err) {
                    return done(err);
                }

                User.findOne({ email: 'l.teroitin@gmail.com' }).then((currentUser: any ) => {
                    expect(currentUser).toBeTruthy();
                    done();
                }).catch((e: any) => {
                    done(e);
                })
            });
    })
})