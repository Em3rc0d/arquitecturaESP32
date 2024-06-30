const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cron = require('node-cron');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'esp32',
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

app.post('/register', async (req, res) => {
    const { id, nombre, email } = req.body;

    try {
        // Verificar si el alumno ya existe en la tabla alumnos
        let alumnoId = await buscarAlumnoPorCodigo(id);

        // Si no existe, insertarlo en la tabla alumnos
        // if (!alumnoId) {
        //     alumnoId = await insertarAlumno(id, nombre, email);
        // }

        // Registrar la asistencia en la tabla asistencia
        await registrarAsistencia(alumnoId, nombre, email);

        console.log('Registro de asistencia exitoso');
        res.status(200).json({ message: 'Registro de asistencia exitoso' });
    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


// Función para buscar un alumno por su código
async function buscarAlumnoPorCodigo(codigo) {
    const query = 'SELECT id FROM alumnos WHERE codigo_alumno = $1';
    const result = await pool.query(query, [codigo]);
    return result.rows.length > 0 ? result.rows[0].id : null;
}

// Función para insertar un nuevo alumno en la tabla alumnos
async function insertarAlumno(codigo, nombre, email) {
    const query = 'INSERT INTO alumnos (codigo_alumno, nombre, email) VALUES ($1, $2, $3) RETURNING id';
    const result = await pool.query(query, [codigo, nombre, email]);
    return result.rows[0].id;
}

// Función para registrar la asistencia de un alumno
async function registrarAsistencia(alumnoId, nombre, email) {
    const query = 'INSERT INTO asistencia (alumno_id, nombre_alumno, email_alumno, estado, timestamp) VALUES ($1, $2, $3, $4, $5)';
    const values = [alumnoId, nombre, email, 'asistió', new Date()];
    await pool.query(query, values);
}

app.get('/alumnos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM alumnos');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener el listado de alumnos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  
  app.get('/asistencias', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM asistencia');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener el reporte de asistencias:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
   
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
