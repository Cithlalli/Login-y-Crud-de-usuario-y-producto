const express = require('express'); //asignación del framework
const app = express(); //Pa ejecutarse en express
const port = 3000;//puerto a ejecutar
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/img', express.static(path.join(__dirname, 'img')));

const db = new sqlite3.Database('database.db');


// Crear tablas
db.serialize(() => {
  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, nombre TEXT, ap_paterno TEXT, ap_materno TEXT, clave TEXT, telefono TEXT, correo TEXT)");
  db.run("CREATE TABLE if not exists productos (idProducto INTEGER PRIMARY KEY, codigoBarras TEXT, nombreProducto TEXT, cantidad INTEGER, proveedores TEXT, especificaciones TEXT, fechaCaducidad TEXT, costoCompra REAL,  costoVenta REAL)");
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/lol.html'));
});

// Ruta para guardar usuario
app.post('/guardarUsuario', (req, res) => {
  const usuario = req.body; // Asegúrate de que esta línea obtenga el cuerpo de la solicitud

  const stmt = db.prepare("INSERT INTO users (nombre, ap_paterno, ap_materno, clave, telefono, correo) VALUES (?, ?, ?, ?, ?, ?)");
  stmt.run(usuario.nombre, usuario.a_paterno, usuario.a_materno, usuario.clave, usuario.telefono, usuario.correo, function(err) {
      if (err) {
          console.error(err.message); // Muestra el error en la consola
          return res.status(500).send('Error al guardar usuario'); // Enviar respuesta de error
      }
      //res.status(200).send('Usuario guardado correctamente'); // Enviar respuesta de éxito
      res.redirect('/');
  });
  stmt.finalize();
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(rows); // Devuelve los registros como JSON
  });
});

// Ruta para editar usuario
app.put('/editarUsuario', (req, res) => {
  const usuario = req.body;
  //console.log(usuario);
  const stmt = db.prepare("UPDATE users SET nombre = ?, ap_paterno = ?, ap_materno = ?, clave = ?, telefono = ?, correo = ? WHERE id = ?");
  stmt.run(usuario.nombre, usuario.a_paterno, usuario.a_materno, usuario.clave, usuario.telefono, usuario.correo, usuario.id, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error al actualizar usuario');
    }
    return res.status(200).send('Usuario actualizado correctamente');
  });
  stmt.finalize();
});

// Ruta para eliminar usuario
app.delete('/eliminarUsuario/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", id, (err) => {
    if (err) return res.status(500).send('Error al eliminar usuario');
    res.send('Usuario eliminado correctamente');
  });
});

// Ruta para guardar producto
app.post('/guardarProducto', (req, res) => {
  const producto = req.body;
  const stmt = db.prepare("INSERT INTO productos (codigoBarras, nombreProducto, cantidad, proveedores, especificaciones, fechaCaducidad, costoCompra, costoVenta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  stmt.run(producto.codigo_barras, producto.nombre_producto, producto.cantidad, producto.proveedores, producto.especificaciones, producto.fecha, producto.costo_compra, producto.costo_venta, function(err) {
    if (err) {
        console.error(err.message); // Muestra el error en la consola
        return res.status(500).send('Error al guardar usuario'); // Enviar respuesta de error
    }
    //res.status(200).send('Usuario guardado correctamente'); // Enviar respuesta de éxito
    res.redirect('/');
});
  stmt.finalize();
});

// Ruta para obtener todos los poductos
app.get('/productos', (req, res) => {
  db.all("SELECT * FROM productos", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error al obtener productos');
    }
    res.json(rows); // Devuelve los registros como JSON
  });
});

// Ruta para editar producto
app.put('/editarProducto', (req, res) => {
  const producto = req.body;
  console.log(producto);
  const stmt = db.prepare("UPDATE productos SET codigoBarras = ?, nombreProducto = ?, cantidad = ?, proveedores = ?, especificaciones = ?, fechaCaducidad = ?, costoCompra = ?, costoVenta=? WHERE idProducto = ?");
  stmt.run(producto.codigo_barras, producto.nombre_producto, producto.cantidad, producto.proveedores, producto.especificaciones, producto.fecha, producto.costo_compra, producto.costo_venta, producto.id_producto, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error al actualizar usuario');
    }
    return res.status(200).send('Usuario actualizado correctamente');
  });
  stmt.finalize();
});

// Ruta para eliminar producto
app.delete('/eliminarProducto/:idProducto', (req, res) => {
  const idProducto = req.params.idProducto;
  db.run("DELETE FROM productos WHERE idProducto = ?", idProducto, (err) => {
    if (err) return res.status(500).send('Error al eliminar producto');
    res.send('Producto eliminado correctamente');
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
