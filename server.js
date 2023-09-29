// creacion de las variables para requerir express, crear la app y el puerto.
const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./taskslist');
const viewRouter = require('./list-view-router');
const editRouter = require('./list-edit-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

app.use(express.json());
app.use('/list-view',viewRouter);
app.use('/list-edit',editRouter);
dotenv.config();

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

let users = [
    {name: 'Darwin', rol: 'admin', email: 'darwin@gmail.com'},
    {name: 'clara', rol: 'user', email: 'clara@gmail.com'},
    {name: 'lola', rol: 'user', email: 'lola_@gmail.com'}
];

app.post('/login', (req, res)=> {
    const userEmail = req.body.email
    const user = users.find(user => user.email === userEmail)
    if(!user){
        res.status(401).json({error: 'invalid credentials'});
    }else{
        const payload = {   // Aqui creo el cuerpo con los datos de iran en el token
            name:user.name,
            rol: user.rol
        }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {     //firmo el token 
        expiresIn: '1d',
        algorithm: 'HS256'
    })
    res.json({token});
    }
});

const JWTValidation = (req, res, next) => {   //middleware para validazion de autorizacion el el encabezado
    const headToken = req.header('Authorization')
    if(!headToken) {
        return res.status(401).json({error: 'Access not allowed'});
    }  
    const token = headToken.replace('Bearer ', ''); 
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);    //verifico la autenticacion del token
        req.user = decoded;      // Si el token es válido, la información del usuario estará en decoded
        next();
      } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }
};

app.get('/protected-route', JWTValidation, (req,res)=>{ 
    res.status(200).json({mensaje: 'estas en una ruta protegida', usuario: req.user})
  });

app.listen(port, ()=> {
    console.log('servidor escuchando en el puerto ' + port);
});
