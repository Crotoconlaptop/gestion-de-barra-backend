const express = require("express");
const router = express.Router();
const {
  obtenerProductos86,
  crearProducto86,
  actualizarProducto86,
  eliminarProducto86,
} = require("../controllers/productos86Controller");

// Rutas específicas para productos faltantes
router.get("/", obtenerProductos86); // Obtener todos los productos faltantes
router.post("/", crearProducto86); // Crear un nuevo producto faltante
router.patch("/:id", actualizarProducto86); // Actualizar un producto faltante
router.delete("/:id", eliminarProducto86); // Eliminar un producto faltante

module.exports = router;
