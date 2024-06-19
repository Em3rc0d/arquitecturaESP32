CREATE TABLE asistencia (
    id SERIAL PRIMARY KEY,
    codigo_alumno VARCHAR(50) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'no asistió',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
