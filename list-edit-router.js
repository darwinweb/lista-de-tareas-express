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
  // Crea una nueva tarea
  const newTask = req.body;  //requiero el cuerpo del objeto que voy a añadir
  tasks.push(newTask);
  res.send({message:'tarea agregada exitosamente'}); // se responde con la lista actualizada en formato json
});

editRouter.delete('/delete/:id', (req, res)=> {
  const taskid = req.params.id;                     //requiero la id
  const tasksUpdate = tasks.filter(task => task.id !== taskid);    //filtro las tareas 
  res.send({mensaje:'tarea eliminada con exito', tasksUpdate}); 
});

editRouter.put('/update/:id', validarTask, (req, res)=> {
  const taskId = req.params.id;
  const updateTask = req.body;
  return res.status(200).send({ mensaje: 'Tarea actualizada con éxito', updateTask}); //mandamos el mensaje de confirmacion las actualizaciones
});

module.exports = editRouter;