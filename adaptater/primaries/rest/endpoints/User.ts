import UserType from "../../../../core/domain/User.domain";

const express = require("express");
const User = express.Router();
const cors = require("cors");
const _ = require('lodash');
const jwt = require('jsonwebtoken');


User.use(cors());

import UserConfig from "../config/User.config";
const userConfig = new UserConfig();

//get user by email
User.get('/email/:email', (req: any, res: any) => {
    userConfig
        .getUserByEmailUseCase()
        .execute(req.params.email)
        .then((user: UserType) => {
            return res.status(200).json(user);
        }) .catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});

// Register

User.post('/register', (req: any, res: any) => {
    var userData = _.pick(req.body, ['email', 'password', 'firstName']);

    userData.email = userData.email.toLowerCase();

    const rand = Math.floor(Math.random() * 100 + 54);

    const link = "http://" + req.get("host") + "/server/verify?id=" + rand;

    userConfig
        .registerUseCase()
        .execute(userData,link)
        .then((user: UserType) => {
            res.status(201).json(user);
        })
        .catch((err: Error) => {
            console.log(err);
            res.json({ error: err.message });
          });


})

export default User;
