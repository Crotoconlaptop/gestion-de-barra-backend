const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio."],
        trim: true,
        maxlength: [100, "El nombre del producto no puede exceder los 100 caracteres."],
      },
      cantidad: {
        type: Number,
        required: [true, "La cantidad es obligatoria."],
        min: [1, "La cantidad debe ser al menos 1."],
      },
      tipo: {
        type: String,
        required: [true, "El tipo de producto es obligatorio."],
        enum: {
          values: ["unidad", "pack", "kilo"],
          message: "El tipo de producto debe ser 'unidad', 'pack' o 'kilo'.",
        },
      },
      estado: {
        type: String,
        default: "Pendiente",
        enum: {
          values: ["Pendiente", "Recibido"],
          message: "El estado debe ser 'Pendiente' o 'Recibido'.",
        },
      },
    },
  ],
  comentarios: {
    type: String,
    trim: true,
    maxlength: [300, "Los comentarios no pueden exceder los 300 caracteres."],
  },
  recibidoPor: {
    type: String,
    trim: true,
    maxlength: [100, "El nombre del receptor no puede exceder los 100 caracteres."],
  },
  estado: {
    type: String,
    default: "Pendiente",
    enum: {
      values: ["Pendiente", "Recibido"],
      message: "El estado general debe ser 'Pendiente' o 'Recibido'.",
    },
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para limpiar datos antes de guardar
PedidoSchema.pre("save", function (next) {
  this.comentarios = this.comentarios?.trim();
  this.recibidoPor = this.recibidoPor?.trim();
  next();
});

module.exports = mongoose.model("Pedido", PedidoSchema);
