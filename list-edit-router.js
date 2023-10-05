const express = require('express');
const editRouter = express.Router();
let tasks = require('./taskslist');

function validarTask(req, res, next) {
  const task = req.body;
  if (!task.id || typeof task.isCompleted !== 'boolean' || !task.description){
    return res.status(400).send({ mensaje: 'Solicitud no válida. Asegúrate de ingresar los datos correctos y completos' });
  };
  next();
};

editRouter.post('/create', validarTask, (req, res) => {
  const newTask = req.body;  
  tasks.push(newTask);
  res.send({message:'tarea agregada exitosamente'}); 
});

editRouter.delete('/delete/:id', (req, res)=> {
  const taskid = req.params.id;                    
  const tasksUpdate = tasks.filter(task => task.id !== taskid);    
  res.send({mensaje:'tarea eliminada con exito', tasksUpdate}); 
});

editRouter.put('/update', validarTask, (req, res)=> {
  const updateTask = req.body;
  return res.status(200).send({ mensaje: 'Tarea actualizada con éxito', updateTask}); 
});

module.exports = editRouter;