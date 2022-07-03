
const mongoose = require('mongoose');
const Task = require('../models/tasks');

mongoose.connect('mongodb://localhost:27017/task-manager');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})



const seedDB = async () => {
    console.log("yes")
    const newTask = new Task({
        time: 0,
        title: 'randomTaskTest',
        description: 'random task description',
        isDone: false
    })
    await newTask.save()
}


seedDB().then(() => {
    mongoose.connection.close();
})