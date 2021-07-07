const express = require("express");
const User = express.Router();
const cors = require("cors");
import UserType from "../../../../core/domain/User.domain";

User.use(cors());

import UserConfig from "../config/User.config";
const userConfig = new UserConfig();


User.get('/email/:email', (req: any, res: any) => {
    userConfig
        .getUserByEmailUseCase()
        .execute(req.params.email)
        .then((user: any) => {
            return res.status(200).json(user);
        }) .catch((err: Error) => {
        res.status(400).json({ error: err.message });
    });
});


export default User;
