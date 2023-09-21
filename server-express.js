const express = require('express');
const app = express();
const port = 3000;

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

app.get('/', (req, res)=> {
    res.json(taks);
});


app.listen(port, ()=> {
    console.log('servidor escuchando en el puerto ' + port);
});