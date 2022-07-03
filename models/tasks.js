const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    time: Number,
    title: String,
    description: String,
    isDone: Boolean
})


module.exports = mongoose.model('Task', taskSchema);