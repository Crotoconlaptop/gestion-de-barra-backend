const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  obtenerPremixes,
  crearPremix,
  cambiarEstadoPremix,
  eliminarPremix,
} = require("../controllers/premixesController");

// Middleware para validar ID de MongoDB
const validarIdMongoDB = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  next();
};

// Middleware para validar el cuerpo de los datos
const validarPremix = [
  check("nombre").notEmpty().withMessage("The premix name is required."),
  check("descripcion").notEmpty().withMessage("A description is required."),
  check("imagen").notEmpty().withMessage("An image is required."),
  check("ingredientes")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be an array with at least one item."),
  check("preparacion").notEmpty().withMessage("Preparation instructions are required."),
];

// Rutas específicas para premixes
/**
 * @route   GET /api/premixes
 * @desc    Get all premixes
 * @access  Public
 */
router.get("/", obtenerPremixes);

/**
 * @route   POST /api/premixes
 * @desc    Create a new premix
 * @access  Public
 */
router.post(
  "/",
  validarPremix,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  crearPremix
);

/**
 * @route   PATCH /api/premixes/:id/estado
 * @desc    Change premix state (pending or ready)
 * @access  Public
 */
router.patch("/:id/estado", validarIdMongoDB, cambiarEstadoPremix);

/**
 * @route   DELETE /api/premixes/:id
 * @desc    Delete a premix by ID
 * @access  Public
 */
router.delete("/:id", validarIdMongoDB, eliminarPremix);

module.exports = router;
