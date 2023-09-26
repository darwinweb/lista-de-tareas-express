const express = require('express');
const viewRouter = express.Router();
const tasks = require('./taskslist');
// middleware para validar los parametros
viewRouter.use((req, res, next)=> {
    const task = req.query;
      // Validar el parámetro isCompleted como booleano o la descripcion como string o el id como numero  
    if (typeof task.description !== 'string' || !Number.isInteger(Number(task.id))  ) { 
        return res.status(404).send({ mensaje: 'El id debe ser un numero y descricion una cadena de texto".' });
    }; 
    // Validar el parámetro isCompleted como booleano (true o false)
     if (task.isCompleted !== 'true' && task.isCompleted !== 'false') {
        return res.status(404).send({ mensaje: 'El parámetro "isCompleted" debe ser "true" o "false"' });
    }
    next();   // Si todos los parámetros son válidos, continúa con la ejecución
});

//Ruta para listar las tareas completadas dentro de /list-view
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
