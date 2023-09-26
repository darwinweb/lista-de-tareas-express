// creacion de las variables para requerir express, crear la app y el puerto.
const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./taskslist');
const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');

app.use(express.json());
app.use('/list-view',viewRouter);
app.use('/list-edit',editRouter);

app.use((req, res, next) => {
    const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE']; // Define los métodos válidos aquí
    if (!metodosValidos.includes(req.method)) {              // Verifica si los metodos no estan incluidos
      return res.status(403).send({ mensaje: 'Método HTTP no válido' });    //Si se cumple la condicion, responde con el error
    }
    next();                                                                  // De lo contrario continua con el proceso
});

app.get('/', (req, res)=> {
    res.send({tasks});
});


app.listen(port, ()=> {
    console.log('servidor escuchando en el puerto ' + port);
});
