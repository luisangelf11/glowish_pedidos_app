/*CREATE THE DATABASE*/
CREATE DATABASE Glowish_Pedidos_App;

/*USE THE DATABASE*/
USE Glowish_Pedidos_App;

/*CREATE EVERY TABLES FOR THE DATABASE*/
/*USERS*/
CREATE TABLE Usuarios(
Id INT AUTO_INCREMENT PRIMARY KEY,
Correo VARCHAR(50),
Contrasena VARCHAR(1000),
Nombre VARCHAR(30),
Apellido VARCHAR(30),
Avatar VARCHAR(10000),
Direccion VARCHAR(300),
Telefono VARCHAR(12),
Rol VARCHAR(6)
);

SELECT * FROM Usuarios;

ALTER TABLE Usuarios
MODIFY COLUMN Contrasena VARCHAR(1000);

/*PEDIDOS*/
CREATE TABLE Pedidos(
Id INT AUTO_INCREMENT PRIMARY KEY,
Fecha DATETIME,
Monto FLOAT,
Estado VARCHAR(15),
Id_Usuario INT,
FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

SELECT * FROM Pedidos;

/*CATEGORIA*/
CREATE TABLE Categorias(
Id INT AUTO_INCREMENT PRIMARY KEY,
Nombre VARCHAR(20),
Descripcion VARCHAR(300)
); 

SELECT * FROM Categorias;

/*PRODUCTOS*/
CREATE TABLE Productos(
Id INT AUTO_INCREMENT PRIMARY KEY,
Nombre VARCHAR(30),
Descripcion VARCHAR(300),
Unidades INT,
Precio FLOAT,
Imagen VARCHAR(10000),
Descuento FLOAT,
Id_Categoria INT,
FOREIGN KEY (Id_Categoria) REFERENCES Categorias(Id)
);

SELECT p.Id, p.Nombre, p.Descripcion, p.Unidades, p.Precio, p.Imagen, p.Descuento, c.Nombre AS Categoria FROM Productos AS p
INNER JOIN Categorias AS c ON p.Id_Categoria = c.Id;

/*DETALLE*/
CREATE TABLE Detalle(
Id INT AUTO_INCREMENT PRIMARY KEY,
Id_Producto INT,
Unidades INT,
Descuento FLOAT,
Size VARCHAR(15),
Color VARCHAR(25),
SubTotal FLOAT,
Id_Pedido INT,
FOREIGN KEY (Id_Producto) REFERENCES Productos(Id),
FOREIGN KEY (Id_Pedido) REFERENCES Pedidos(Id)
);

SELECT * FROM Detalle;

/*CARRITO*/
CREATE TABLE Carrito(
Id INT AUTO_INCREMENT PRIMARY KEY,
Id_Producto INT,
Id_Usuario INT,
Unidades INT,
Size VARCHAR(15),
Color VARCHAR(15),
FOREIGN KEY (Id_Producto) REFERENCES Productos(Id),
FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

SELECT * FROM Carrito;

/*SIZES*/
CREATE TABLE Sizes(
Id INT AUTO_INCREMENT PRIMARY KEY,
Size VARCHAR(15),
Estado VARCHAR(15),
Id_Producto INT,
FOREIGN KEY (Id_Producto) REFERENCES Productos(Id)
);

SELECT * FROM Sizes;

/*COLORES*/
CREATE TABLE Colores(
Id INT AUTO_INCREMENT PRIMARY KEY,
Color VARCHAR(25),
Rgb VARCHAR(30),
Estado VARCHAR(20),
Id_Producto INT,
FOREIGN KEY (Id_Producto) REFERENCES Productos(Id)
);

SELECT * FROM Colores;

/*COMENTARIOS*/
CREATE TABLE Comentarios(
Id INT AUTO_INCREMENT PRIMARY KEY,
Comentario VARCHAR(250),
Fecha DATETIME,
Id_Producto INT,
Id_Usuario INT,
FOREIGN KEY (Id_producto) REFERENCES Productos(Id),
FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

SELECT * FROM Comentarios;

/*RANKING*/
CREATE TABLE Valoraciones(
Id INT AUTO_INCREMENT PRIMARY KEY,
Id_Producto INT,
Id_Usuario INT,
Puntos FLOAT,
FOREIGN KEY (Id_producto) REFERENCES Productos(Id),
FOREIGN KEY (Id_Usuario) REFERENCES Usuarios(Id)
);

SELECT * FROM Valoraciones;

ALTER TABLE Carrito
ADD COLUMN Unidades INT,
ADD COLUMN Size VARCHAR(15),
ADD COLUMN Color VARCHAR(15);

ALTER TABLE Valoraciones
MODIFY COLUMN Puntos FLOAT;
