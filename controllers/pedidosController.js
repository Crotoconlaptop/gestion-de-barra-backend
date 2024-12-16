const Pedido = require("../models/Pedido");

exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos." });
  }
};

exports.crearPedido = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido." });
  }
};

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
    res.status(500).json({ error: "Error al actualizar el estado del pedido." });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);

    if (!pedidoEliminado) {
      return res.status(404).json({ error: "Pedido no encontrado." });
    }

    res.json({ message: "Pedido eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido." });
  }
};
