const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    name: { type: String, require: true },
    done: { type: Boolean },
    owner: { type: String, required: true },
    creation: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now }
});

const task = mongoose.model('task', taskSchema);
module.exports = task;
