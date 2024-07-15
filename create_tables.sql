CREATE SCHEMA IF NOT EXISTS public;

create TABLE IF NOT EXISTS carrito (
    id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS direccion (
    id SERIAL PRIMARY KEY,
    linea1 TEXT NOT NULL DEFAULT '',
    linea2 TEXT DEFAULT '',
    distrito TEXT NOT NULL DEFAULT '',
    provincia TEXT NOT NULL DEFAULT '',
    pais TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    carrito_id INT NOT NULL,
    direccion_id INT NOT NULL,
    rol VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (carrito_id) REFERENCES carrito (id),
    FOREIGN KEY (direccion_id) REFERENCES direccion (id)
);

CREATE TABLE IF NOT EXISTS serie (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS producto (
    id SERIAL PRIMARY KEY,
    serie_id INT,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    descripcion TEXT
    -- CONSTRAINT fk_serie FOREIGN KEY(serie_id) REFERENCES serie(id)
);

CREATE TABLE carrito_items (
    id SERIAL PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    estado VARCHAR(10),
    FOREIGN KEY (carrito_id) REFERENCES carrito (id),
    FOREIGN KEY (producto_id) REFERENCES producto (id)
);

CREATE TABLE IF NOT EXISTS orden (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_envio VARCHAR(255),
    subtotal DECIMAL(10, 2) NOT NULL,
    impuestos DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orden_items (
    id SERIAL PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL
);
