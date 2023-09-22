const express = require('express');
const viewRouter = express.Router();
const tasks = require('./taskslist');

// Ruta para listar las tareas completadas dentro de /list-view
viewRouter.get('/completed', (req, res) => {
    const tareaCompleta = tasks.filter(task => task.isCompleted);
    res.send({tareaCompleta});
});

// Ruta para listar las tareas incompletas dentro de /list-view
viewRouter.get('/incompleted', (req, res) => {
    const tareaIncompleta = tasks.filter(task => !task.isCompleted);
    res.send({tareaIncompleta});
});

module.exports = viewRouter;
