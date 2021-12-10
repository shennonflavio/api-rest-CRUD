// config inicial
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

//enviar e ler resposta json/middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas da api
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);

// rota inicial / endpoint
app.get('/', (req, res) => {
    return res.status(200).json({ msg: 'OK!' })
});

const dbUser = process.env.dbUser
const dbPassword = process.env.dbPassword

// conectar com db
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.m00km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {
        // entregar um porta
        app.listen(3000, (req, res) => {
            console.log("Conectado ao mongoDB");
        });
    }).catch((error) => {
        console.log(error);

    });

