// **Premix.js**
const mongoose = require("mongoose");

const PremixSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  ingredientes: [String],
  preparacion: { type: String, required: true },
  pendiente: { type: Boolean, default: false },
});

module.exports = mongoose.model("Premix", PremixSchema);