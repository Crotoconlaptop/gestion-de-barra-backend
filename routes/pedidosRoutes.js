const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  obtenerPedidos,
  crearPedido,
  actualizarEstadoPedido,
  eliminarPedido,
} = require("../controllers/pedidosController");

// Middleware para validar ID de MongoDB
const validarIdMongoDB = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format." });
  }
  next();
};

// Validaciones para crear un pedido
const validarPedido = [
  check("productos")
    .isArray({ min: 1 })
    .withMessage("At least one product is required.")
    .custom((productos) => {
      for (const producto of productos) {
        if (!producto.nombre || !producto.cantidad || !producto.tipo) {
          throw new Error(
            "Each product must have a 'nombre', 'cantidad', and 'tipo'."
          );
        }
      }
      return true;
    }),
];

// Validaciones para actualizar el estado de un pedido
const validarEstadoPedido = [
  check("estado")
    .isIn(["Pendiente", "Recibido"])
    .withMessage("The 'estado' must be either 'Pendiente' or 'Recibido'."),
  check("comentarios")
    .optional()
    .isString()
    .withMessage("Comments must be a string."),
  check("recibidoPor")
    .optional()
    .isString()
    .withMessage("The 'recibidoPor' field must be a string."),
];

// Rutas específicas para pedidos
/**
 * @route   GET /api/pedidos
 * @desc    Get all orders
 * @access  Public
 */
router.get("/", obtenerPedidos);

/**
 * @route   POST /api/pedidos
 * @desc    Create a new order
 * @access  Public
 */
router.post(
  "/",
  validarPedido,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  crearPedido
);

/**
 * @route   PATCH /api/pedidos/:id
 * @desc    Update order status
 * @access  Public
 */
router.patch(
  "/:id",
  validarIdMongoDB,
  validarEstadoPedido,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  actualizarEstadoPedido
);

/**
 * @route   DELETE /api/pedidos/:id
 * @desc    Delete an order
 * @access  Public
 */
router.delete("/:id", validarIdMongoDB, eliminarPedido);

module.exports = router;
