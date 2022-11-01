const express = require('express');
const http = require('http');
const cors = require('cors');
const { initDB } = require('./db');
const ToDo = require('./db/models/ToDo.model');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

http.createServer(app).listen(3000, () => {
    console.log('Server is working on port 3000')
})

initDB();

app.get("/todos", async (req, res) => {
    try {
        const toDoList = await ToDo.findAll();
        res.json({
            toDoList
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const toDo = await ToDo.findByPk(req.params.id);
        res.json({
            toDo
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});


app.post("/todos", async (req, res) => {
    try {
        const toDo = await ToDo.create({
            title: req.body.title,
            description: req.body.description
        })
        res.json({
            toDo
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const toDo = await ToDo.findByPk(req.params.id);
        await toDo.update({
            title: req.body.title,
            description: req.body.description
        });
        res.json({
            toDo
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});


app.delete("/todos", async (req, res) => {
    try {
        await ToDo.destroy({
            where: {},
            truncate: true
        })
        res.status(200).send("Удалены все ToDo");
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const toDo = await ToDo.findByPk(req.params.id);
        await toDo.destroy();

        res.status(200).send("Удален ToDo по id");
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
});