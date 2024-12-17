const mongoose = require("mongoose");

const TragoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true }, // Base64 o URL
  ingredientes: { type: [String], required: true },
  preparacion: { type: String, required: true },
});

module.exports = mongoose.model("Trago", TragoSchema);
