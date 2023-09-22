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


app.get('/', (req, res)=> {
    res.send({tasks});
});


app.listen(port, ()=> {
    console.log('servidor escuchando en el puerto ' + port);
});
