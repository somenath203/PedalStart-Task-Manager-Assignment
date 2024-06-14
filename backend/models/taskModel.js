const mongoose = require('mongoose');


const taskManagerTask = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('tasks', taskManagerTask);