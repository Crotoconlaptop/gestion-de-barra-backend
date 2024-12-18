const express = require("express");
const router = express.Router();
const {
  obtenerPremixes,
  crearPremix,
  cambiarEstadoPremix,
  eliminarPremix,
} = require("../controllers/premixesController");

// Rutas específicas para premixes
router.get("/", obtenerPremixes); // Obtener todos los premixes
router.post("/", crearPremix); // Crear un nuevo premix
router.patch("/:id/estado", cambiarEstadoPremix);
router.delete("/:id", eliminarPremix); // Eliminar un premix existente


module.exports = router;
