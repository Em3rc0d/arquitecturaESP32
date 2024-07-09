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
        let alumnoId = await buscarAlumnoPorCodigo(id);
        let alumnoEmail = await buscarAlumnoPorEmail(email);
        if (alumnoId != null && alumnoEmail != null && alumnoId == alumnoEmail) {
          await registrarAsistencia(alumnoId, nombre, email);
          console.log('Registro de asistencia exitoso');
          res.status(200).json({ message: 'Registro de asistencia exitoso' });
        }
      
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
async function buscarAlumnoPorEmail(email) {
    const query = 'SELECT id FROM alumnos WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows.length > 0 ? result.rows[0].id : null;
}

// Función para insertar un nuevo alumno en la tabla alumnos
async function insertarAlumno(codigo, nombre, email) {
    const query = 'INSERT INTO alumnos (codigo_alumno, nombre, email) VALUES ($1, $2, $3) RETURNING id';
    const result = await pool.query(query, [codigo, nombre, email]);
    return result.rows[0].id;
}

function getFormattedDate() {
  const date = new Date();
  // Convertir la fecha a la zona horaria de Lima
  const offset = -5 * 60; // GMT-5 en minutos
  const limaDate = new Date(date.getTime() + (offset + date.getTimezoneOffset()) * 60000);
  const year = limaDate.getFullYear();
  const month = String(limaDate.getMonth() + 1).padStart(2, '0');
  const day = String(limaDate.getDate()).padStart(2, '0');
  const hours = String(limaDate.getHours()).padStart(2, '0');
  const minutes = String(limaDate.getMinutes()).padStart(2, '0');
  const seconds = String(limaDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Función para registrar la asistencia de un alumno
async function registrarAsistencia(alumnoId, nombre, email) {
  const query = 'INSERT INTO asistencia (alumno_id, nombre_alumno, email_alumno, estado, timestamp) VALUES ($1, $2, $3, $4, $5)';
  const timestamp = getFormattedDate();
  const values = [alumnoId, nombre, email, 'asistió', timestamp];
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
  
  // Función para ajustar el timestamp a la hora de Lima (GMT-5)
function adjustToLimaTime(timestamp) {
  const date = new Date(timestamp);
  date.setHours(date.getHours() - 5); // Ajustar a GMT-5
  return date;
}

app.get('/asistencias', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM asistencia');
      // Ajustar el timestamp para cada fila
      const adjustedRows = result.rows.map(row => {
          row.timestamp = adjustToLimaTime(row.timestamp);
          return row;
      });
      res.status(200).json(adjustedRows);
  } catch (error) {
      console.error('Error al obtener el reporte de asistencias:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});
   
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
