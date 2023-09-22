const express = require('express');
const editRouter = express.Router();
let tasks = require('./taskslist');

editRouter.post('/create', (req, res) => {
  // Crea una nueva tarea
  const newTask = req.body;  //requiero el cuerpo del objeto que voy a añadir
  tasks.push(newTask);
  res.send({message:'tarea agregada exitosamente'}); // se responde con la lista actualizada en formato json
});

editRouter.delete('/delete/:id', (req, res)=> {
  const taskid = req.params.id;                     //requiero la id
  const tasksUpdate = tasks.filter(task => task.id !== taskid);    //filtro las tareas 
  res.send({mensaje:'tarea eliminada con exito'}); 
});

editRouter.put('/update/:id', (req, res)=> {
  const taskId = req.params.id;
  const { isCompleted, description } = req.body;
  const taskToUpdate = tasks.find(task => task.id === taskId);

  if (taskToUpdate) {
    taskToUpdate.isCompleted = isCompleted;    // actualizamos el valor de estas dos propiedades
    taskToUpdate.description = description;

  return res.send({ mensaje: 'Tarea actualizada con éxito', taskToUpdate }); //mandamos el mensaje de confirmacion las actualizaciones
  }
});

module.exports = editRouter;