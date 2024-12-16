const express = require("express");
const router = express.Router();
const {
  obtenerPedidos,
  crearPedido,
  actualizarEstadoPedido,
  eliminarPedido,
} = require("../controllers/pedidosController");

// Definir las rutas para los pedidos
router.get("/", obtenerPedidos); // Obtener todos los pedidos
router.post("/", crearPedido); // Crear un nuevo pedido
router.patch("/:id", actualizarEstadoPedido); // Actualizar el estado de un pedido
router.delete("/:id", eliminarPedido); // Eliminar un pedido

module.exports = router;
