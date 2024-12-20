const mongoose = require("mongoose");

const PremixSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del premix es obligatorio."],
    trim: true,
    maxlength: [100, "El nombre no puede exceder los 100 caracteres."],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del premix es obligatoria."],
    trim: true,
    maxlength: [300, "La descripción no puede exceder los 300 caracteres."],
  },
  imagen: {
    type: String,
    required: [true, "La imagen del premix es obligatoria."],
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
    required: [true, "La preparación del premix es obligatoria."],
    trim: true,
    maxlength: [500, "La preparación no puede exceder los 500 caracteres."],
  },
  pendiente: {
    type: Boolean,
    default: false,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para limpiar datos antes de guardar
PremixSchema.pre("save", function (next) {
  this.nombre = this.nombre.trim();
  this.descripcion = this.descripcion.trim();
  this.preparacion = this.preparacion.trim();
  next();
});

module.exports = mongoose.model("Premix", PremixSchema);
