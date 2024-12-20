const mongoose = require("mongoose");

const Producto86Schema = new mongoose.Schema({
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
    required: [true, "El tipo es obligatorio."],
    enum: {
      values: ["unidad", "pack", "kilo"],
      message: "El tipo debe ser 'unidad', 'pack' o 'kilo'.",
    },
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para garantizar que los datos estén limpios
Producto86Schema.pre("save", function (next) {
  this.nombre = this.nombre.trim();
  next();
});

module.exports = mongoose.model("Producto86", Producto86Schema);
