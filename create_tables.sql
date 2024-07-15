CREATE SCHEMA IF NOT EXISTS public;

GRANT ALL PRIVILEGES ON SCHEMA public TO personal;

create TABLE carrito (
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

CREATE TABLE serie (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE producto (
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

CREATE TABLE orden (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_envio VARCHAR(255),
    subtotal DECIMAL(10, 2) NOT NULL,
    impuestos DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
    -- CONSTRAINT fk_usuario FOREIGN KEY(usuario_id) REFERENCES usuario(id)
);

CREATE TABLE orden_items (
    id SERIAL PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL
    -- FOREIGN KEY (orden_id) REFERENCES orden (orden_id),
    -- FOREIGN KEY (producto_id) REFERENCES producto (producto_id)
);

-- ALTER TABLE Producto
-- ADD CONSTRAINT fk_producto_serie
-- FOREIGN KEY (idSerie) REFERENCES Serie(id);
--
-- ALTER TABLE DetalleOrden
-- ADD CONSTRAINT fk_detalleorden_orden
-- FOREIGN KEY (idOrden) REFERENCES Orden(id);
--
-- ALTER TABLE DetalleOrden
-- ADD CONSTRAINT fk_detalleorden_producto
-- FOREIGN KEY (idProducto) REFERENCES Producto(id);
--
-- ALTER TABLE Orden
-- ADD CONSTRAINT fk_orden_cliente
-- FOREIGN KEY (idCliente) REFERENCES Cliente(id);
--
-- ALTER TABLE CarritoDeCompras
-- ADD CONSTRAINT fk_carritodecompras_cliente
-- FOREIGN KEY (idCliente) REFERENCES Cliente(id);
--
-- ALTER TABLE CarritoDeCompras
-- ADD CONSTRAINT fk_carritodecompras_producto
-- FOREIGN KEY (idProducto) REFERENCES Producto(id);
--
-- ALTER TABLE Cliente
-- ADD CONSTRAINT fk_cliente_usuario
-- FOREIGN KEY (idUsuario) REFERENCES Usuario(id);
--
-- ALTER TABLE Direccion
-- ADD CONSTRAINT fk_direccion_cliente
-- FOREIGN KEY (idCliente) REFERENCES Cliente(id);
