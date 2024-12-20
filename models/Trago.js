const mongoose = require("mongoose");

const TragoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del trago es obligatorio."],
    trim: true,
    maxlength: [100, "El nombre no puede exceder los 100 caracteres."],
  },
  imagen: {
    type: String,
    required: [true, "La imagen del trago es obligatoria."],
    validate: {
      validator: function (v) {
        return v.startsWith("data:image/") || /^https?:\/\//.test(v);
      },
      message: "La imagen debe ser un Base64 válido o una URL.",
    },
  },
  ingredientes: {
    type: [String],
    required: [true, "Debe incluir al menos un ingrediente."],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "Debe haber al menos un ingrediente en la lista.",
    },
  },
  preparacion: {
    type: String,
    required: [true, "La preparación del trago es obligatoria."],
    trim: true,
    maxlength: [500, "La preparación no puede exceder los 500 caracteres."],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para limpiar datos antes de guardar
TragoSchema.pre("save", function (next) {
  this.nombre = this.nombre.trim();
  this.preparacion = this.preparacion.trim();
  next();
});

module.exports = mongoose.model("Trago", TragoSchema);
