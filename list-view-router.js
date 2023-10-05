const express = require('express');
const viewRouter = express.Router();
const tasks = require('./taskslist');


//middleware para validar los parametros
viewRouter.use((req, res, next)=> {
    const task = req.query; 
    if (typeof task.description !== 'string' || !Number.isInteger(Number(task.id))  ) { 
        return res.status(404).send({ mensaje: 'El id debe ser un numero y descricion una cadena de texto".' });
    }; 
     if (task.isCompleted !== 'true' && task.isCompleted !== 'false') {
        return res.status(404).send({ mensaje: 'El parámetro "isCompleted" debe ser "true" o "false"' });
    }
    next();  
});


viewRouter.get('/completed', (req, res) => {
    const tareaCompleta = tasks.filter(task => task.isCompleted);
    res.send({tareaCompleta});
});


viewRouter.get('/incompleted', (req, res) => {
    const tareaIncompleta = tasks.filter(task => !task.isCompleted);
    res.send({tareaIncompleta});
});

module.exports = viewRouter;
