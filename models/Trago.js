// **Trago.js**
const mongoose = require("mongoose");

const TragoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String },
  ingredientes: [String],
  preparacion: { type: String, required: true },
});

module.exports = mongoose.model("Trago", TragoSchema);