(function (routes) {
    const userModel = require("../db/users");
    const encryption = require('../utility/encryption');
    const jwt = require('jsonwebtoken');

    routes.init = function (app) {

        // login API
        app.post('/login', (req, res, next) => {
            res.set('content-header', 'application/json');
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;

            var query = { email };
            userModel.findOne(query, (err, user) => {
                if (err)
                    return res.send({ success: false, data: null, description: "can not to connect, " + err });
                if (!user)
                    return res.send({ success: false, data: null, description: "failed to fing user, " });
                
                encryption.ComparePassword(password, user.password, (err, encPw) => {
                    if (err)
                        return res.send({ success: false, data: null, description: "can not get PW, " + err });

                    var token = jwt.sign({ user }, process.env.SECRET, { expiresIn: process.env.ONE_WEEK });
                    var retUser = { name: user.name, email: user.email, id: user._id, token };
                    return res.send({ success: true, data: retUser, description: "" });
                });
            });

        });

        // register API
        app.post('/register', (req, res, next) => {
            let user = new userModel({
                name: req.body.name,
                email: req.body.email,
                password:req.body.password
            });

            res.set('content-type', 'application/json');
            user.save((err, usr) => {
                if (err) {
                    return res.send({ success: false, data: null, description: "failed to save user, "+err });
                } else {
                    res.send({ success: true, data: usr, description: "" });
                }
            });

            //res.send(user);
            //console.log(user);
        });
    }

})(module.exports);