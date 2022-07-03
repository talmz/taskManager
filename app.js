const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Task = require('./models/tasks');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/task-manager');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.render('tasks/index', { tasks });
})

app.get('/tasks/new', (req, res) => {
    res.render('tasks/new');
})

app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body.task);
    await newTask.save();
    res.redirect(`/tasks/${newTask._id}`)
})

app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.render('tasks/show', { task });
})

app.get('/tasks/:id/edit', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.render('tasks/edit', { task });
})

app.listen(3000, () => {
    console.log("serving on port 3000")
})

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { ...req.body.task })
    res.redirect(`/tasks/${task._id}`)
})

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
})