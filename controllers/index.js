(function (controllers) {

    var routes = require("./routeController");
    var todo = require("./todoController");

    controllers.init = function (app) {
        routes.init(app);
        todo.init(app);
    }

})(module.exports);