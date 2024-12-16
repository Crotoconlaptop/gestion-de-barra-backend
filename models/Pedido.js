// **Pedido.js**
const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: { type: String, required: true },
      cantidad: { type: Number, required: true },
      tipo: { type: String, required: true }, // unidad, pack, kilo
      estado: { type: String, default: "Pendiente" }, // Pendiente o Recibido
    },
  ],
  comentarios: { type: String },
  recibidoPor: { type: String },
  estado: { type: String, default: "Pendiente" }, // Estado general del pedido: Pendiente o Recibido
  fecha: { type: Date, default: Date.now }, // Fecha de creación del pedido
});

module.exports = mongoose.model("Pedido", PedidoSchema);
