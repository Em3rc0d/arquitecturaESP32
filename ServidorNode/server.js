const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cron = require('node-cron');

const app = express();
const port = 3000;
const alumnosPermitidos = [
    '22200202',
    '22200145',
    '22200131',
    '22200155', 
    '22200149'
];

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyectoArqui',
    password: '1234',
    port: 5432,
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/register', (req, res) => {
    const { id } = req.body;

    if (!alumnosPermitidos.includes(id)) {
        console.log('Código de alumno no permitido');
        res.status(403).json({ message: 'Código de alumno no permitido' });
        return;
    }

    pool.query('INSERT INTO asistencia(codigo_alumno, estado, timestamp) VALUES ($1, $2, $3)', [id, 'asistió', new Date()], (err, result) => {
        if (err) {
            console.error('Error al registrar en la base de datos:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log('Registro de asistencia exitoso');
            res.status(200).json({ message: 'Registro exitoso' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
