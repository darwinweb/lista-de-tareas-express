// creacion de las variables para requerir express, crear la app y el puerto.
const express = require('express');
const app = express();
const port = 3000;

// la lista que se enviara como respuesta a la solicitud
let taks = [
    {
        "id":"1",
        "isCompleted":false,
        "description":"Walk the dog",
    },
    {
        "id":"2",
        "isCompleted":false,
        "description":"watch TV",
    },
    {
        "id":"3",
        "isCompleted":false,
        "description":"sleep",
    }
];

// respuesta a la solicitud GET
app.get('/', (req, res)=> {
    res.json(taks);
});

// metodo para que el servidor escuche y el puerto desde donde escucha
app.listen(port, ()=> {
    console.log('servidor escuchando en el puerto ' + port);
});