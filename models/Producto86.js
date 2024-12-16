// **Producto86.js**
const mongoose = require("mongoose");

const Producto86Schema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
});

module.exports = mongoose.model("Producto86", Producto86Schema);