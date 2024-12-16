const express = require("express");
const router = express.Router();
const {
  obtenerTragos,
  crearTrago,
  actualizarTrago,
  eliminarTrago,
} = require("../controllers/tragosController");

// Rutas específicas para tragos
router.get("/", obtenerTragos); // Obtener todos los tragos
router.post("/", crearTrago); // Crear un nuevo trago
router.patch("/:id", actualizarTrago); // Actualizar un trago
router.delete("/:id", eliminarTrago); // Eliminar un trago

module.exports = router;
