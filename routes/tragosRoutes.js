const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  obtenerTragos,
  crearTrago,
  eliminarTrago,
} = require("../controllers/tragosController");

// Middleware para validar ID de MongoDB
const validarIdMongoDB = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  next();
};

// Middleware para validar el cuerpo de los datos
const validarTrago = [
  check("nombre").notEmpty().withMessage("The drink name is required."),
  check("ingredientes")
    .isArray({ min: 1 })
    .withMessage("Ingredients must be an array with at least one item."),
  check("imagen").notEmpty().withMessage("An image is required."),
  check("preparacion").notEmpty().withMessage("Preparation instructions are required."),
];

// Rutas específicas para tragos
/**
 * @route   GET /api/tragos
 * @desc    Get all drinks
 * @access  Public
 */
router.get("/", obtenerTragos);

/**
 * @route   POST /api/tragos
 * @desc    Create a new drink
 * @access  Public
 */
router.post(
  "/",
  validarTrago,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  crearTrago
);

/**
 * @route   DELETE /api/tragos/:id
 * @desc    Delete a drink by ID
 * @access  Public
 */
router.delete("/:id", validarIdMongoDB, eliminarTrago);

module.exports = router;
