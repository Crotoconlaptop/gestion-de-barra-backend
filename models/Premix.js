const mongoose = require("mongoose");

const PremixSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true }, // Base64 o URL
  ingredientes: { type: [String], required: true },
  preparacion: { type: String, required: true },
  pendiente: { type: Boolean, default: false },
});

module.exports = mongoose.model("Premix", PremixSchema);
