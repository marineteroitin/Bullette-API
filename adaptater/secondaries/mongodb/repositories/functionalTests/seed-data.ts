const { ObjectID } = require('mongodb');
const User = require('../../entities/User.model');

/**************************************/
/*********** User Creation ************/
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const testUsers = [{
  _id: userOneId,
  email: 'marine.teroitin@gmail.com',
  password: 'azerty',
  firstName: 'Marine',
}, {
  _id: userTwoId,
  email: 'a.teroitin@gmail.com',
  password: 'querty',
  firstName: 'Alexis',
}]

module.exports.testUsers = testUsers;

/*
This method deletes all of the current users and creates the test users.
*/

const populateTestUsers = (done: any) => {


  User.deleteMany({}).then(() => {

    var userOne = new User(testUsers[0]).save();
    var userTwo = new User(testUsers[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());


};

module.exports.populateTestUsers = populateTestUsers;
