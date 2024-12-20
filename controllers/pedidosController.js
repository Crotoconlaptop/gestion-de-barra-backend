const Pedido = require("../models/Pedido");

// Obtener todos los pedidos con paginación
exports.obtenerPedidos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Validar parámetros de paginación
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ error: "Parámetros de paginación inválidos." });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [pedidos, total] = await Promise.all([
      Pedido.find().skip(skip).limit(limitNumber),
      Pedido.countDocuments(),
    ]);

    res.status(200).json({
      pedidos,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error.message);
    res.status(500).json({ error: "Error al obtener los pedidos." });
  }
};

// Crear un nuevo pedido
exports.crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error("Error al crear el pedido:", error.message);
    res.status(500).json({ error: "Error al crear el pedido." });
  }
};

// Actualizar el estado de un pedido
exports.actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, comentarios, recibidoPor } = req.body;

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado, comentarios, recibidoPor },
      { new: true }
    );

    if (!pedidoActualizado) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.json(pedidoActualizado);
  } catch (error) {
    console.error("Error al actualizar el estado del pedido:", error.message);
    res.status(500).json({ error: "Error al actualizar el estado del pedido." });
  }
};

// Eliminar un pedido
exports.eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);

    if (!pedidoEliminado) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.json({ message: "Pedido eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error.message);
    res.status(500).json({ error: "Error al eliminar el pedido." });
  }
};
