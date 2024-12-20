const express = require("express");
const router = express.Router();
const {
  obtenerProductos86,
  crearProducto86,
  actualizarProducto86,
  eliminarProducto86,
} = require("../controllers/productos86Controller");

// Middleware para validar ID de MongoDB
const { check, validationResult } = require("express-validator");
const validarIdMongoDB = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  next();
};

// Middleware para validar el cuerpo de los datos
const validarProducto86 = [
  check("nombre").notEmpty().withMessage("The product name is required."),
  check("cantidad")
    .isInt({ min: 1 })
    .withMessage("The quantity must be a positive integer."),
  check("tipo")
    .isIn(["unidad", "pack", "kilo"])
    .withMessage("The type must be 'unidad', 'pack', or 'kilo'."),
];

// Rutas específicas para productos faltantes
/**
 * @route   GET /api/productos86
 * @desc    Get all missing products
 * @access  Public
 */
router.get("/", obtenerProductos86);

/**
 * @route   POST /api/productos86
 * @desc    Create a new missing product
 * @access  Public
 */
router.post(
  "/",
  validarProducto86,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  crearProducto86
);

/**
 * @route   PATCH /api/productos86/:id
 * @desc    Update a missing product by ID
 * @access  Public
 */
router.patch(
  "/:id",
  validarIdMongoDB,
  validarProducto86,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  actualizarProducto86
);

/**
 * @route   DELETE /api/productos86/:id
 * @desc    Delete a missing product by ID
 * @access  Public
 */
router.delete("/:id", validarIdMongoDB, eliminarProducto86);

module.exports = router;
