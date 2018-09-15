// intialize all dependencies
// dotEnv use to allow to view all the application variables
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const passportJwt = require('./utility/passport');
const bodyParser = require("body-parser");
var debug = require("debug")("myDebugger");

// initialize express
const app = express();
//------------------ Middlewear-------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
passportJwt(passport);
app.use(passport.session());
//------------------ Middlewear-------------
//---------- initialize DB connection
mongoose.connect(process.env.DataBase);
mongoose.connection.on("connected", () => {
    console.log("connected to db");
});

mongoose.connection.on("error", (error) => {
    console.log("unable to connect, " + error);
});
//---------------------------------
//--------- Routing ----------
var controllers = require("./controllers");
controllers.init(app);
//-----------------------------
app.listen(process.env.PORT, function () {
    console.log("server started port 3000");
});
