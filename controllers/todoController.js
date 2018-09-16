(function (todoController) {

    const encryption = require('../utility/encryption');
    const Task = require('../db/tasks');
    const passport = require('passport');

    todoController.init = function (app) {

        // list all todo
        app.post('/todo/list', passport.authenticate('jwt', { session: false }), function (req, res, next) {
            res.set('content-header', 'application/json');
            var owner = req.body.owner;
            Task.find({ owner }, (err, tasks) => {
                if (err)
                    return res.send({ success: false, data: null, desc: 'Error while get list of todos' });
                if (!tasks)
                    return res.send({ success: false, data: null, desc: 'no avilable todo' });
                return res.send({ success: true, data: tasks, desc: 'list all todos' });
            });
            
        });

        // add new todo
        app.post('/todo/add', passport.authenticate('jwt', { session: false }), function (req, res, next) {
            res.set('content-header', 'application/json');
            var task = new Task({
                name: req.body.name,
                done: req.body.done,
                owner: req.body.owner
            });
            task.save((err, task) => {
                if (err)
                    return res.send({ success: false, data: null, desc: 'Error while add new todo' });
                if (!task)
                    return res.send({ success: false, data: null, desc: 'Fail to add new todo' });

                return res.send({ success: true, data: task, desc: 'Add new todo' });
            });

        });

        // delete todo
        app.delete('/todo/remove/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
            res.set('content-header', 'application/json');
            var taskId = req.params.id;
            Task.remove({ _id: taskId }, (err) => {
                if (err)
                    return res.send({ success: false,  desc: 'Failed to delete todo' });
                return res.send({ success: true, desc: ' todo deleted' });

            });
        });

        // update todo
        app.put('/todo/update/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
            res.set('content-header', 'application/json');
            try {
                var task = new Task({
                    name: req.body.name,
                    done: req.body.done,
                    owner: req.body.owner
                });
                
                Task.updateOne({ _id: req.params.id }, task, (err, raw) => {
                    if (err)
                        return res.send({ success: false, desc: `update todo fail with error ${err}` });
                    if (!raw)
                        return res.send({ success: false, desc: 'update todo fail without error' });

                    return res.send({ success: true, desc: 'update todo fail' });
                });
                
            } catch (exc) {
                return res.send({ success: false, desc: 'update todo fail with exception' });
            }
        });

    }

})(module.exports);