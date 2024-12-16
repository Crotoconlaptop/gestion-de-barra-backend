const express = require("express");
const router = express.Router();
const {
  obtenerPremixes,
  crearPremix,
  actualizarPremix,
  eliminarPremix,
} = require("../controllers/premixesController");

// Rutas específicas para premixes
router.get("/", obtenerPremixes); // Obtener todos los premixes
router.post("/", crearPremix); // Crear un nuevo premix
router.patch("/:id", actualizarPremix); // Actualizar un premix existente
router.delete("/:id", eliminarPremix); // Eliminar un premix existente

module.exports = router;
