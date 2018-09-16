const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var encryption = require('../utility/encryption');

const schema = {
        name: String,
        email: { type: String, required: true },
        password: { type: String, required: true }
    };

var users_schema = mongoose.Schema(schema);

users_schema.pre('save', function (next) {
    //console.log(this.password);
    if (!this.isModified('password'))
        return next();
    encryption.GeneratePassword(this.password, (err, res) => {
        if (err)
            return next(err);
        this.password = res;
        next();
    });
});

    var users = mongoose.model("user", users_schema);

module.exports = users;