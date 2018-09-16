const bcrypt = require('bcryptjs');

function genPW(password, next) {
    var newpw = '';
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {

            console.log(err);
            return next(err, null);
        }

        bcrypt.hash(password, salt, (err, hashed) => {
            if (err) {
                console.log(err);
                return next(err, null);
            }
            return next(null, hashed);
        });
    });
}

function comparePW(plain, hashed, next) {
    bcrypt.compare(plain, hashed, (err, ismatch) => {
        if (err)
            next(err, null);
        else
            next(null, ismatch);
    });
}

module.exports.GeneratePassword = genPW;
module.exports.ComparePassword = comparePW;

    