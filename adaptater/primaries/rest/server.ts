// declaration of the application
const express = require("express");
const cors = require("cors");

const app = express();

require('dotenv').config();

// déclaration du port
const port = process.env.PORT || 3000;

// declaration of the modules used
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routes
import routes from "./endpoints/index";
app.use(routes);

//launch the server
module.exports = app.listen(port, function () {
    console.log("Server is running on port " + port);
});