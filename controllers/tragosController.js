// **tragosController.js**
const Trago = require("../models/Trago");

// Obtener todos los tragos
exports.obtenerTragos = async (req, res) => {
  try {
    const tragos = await Trago.find();
    res.json(tragos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tragos." });
  }
};

// Crear un nuevo trago
exports.crearTrago = async (req, res) => {
  try {
    const nuevoTrago = new Trago(req.body);
    await nuevoTrago.save();
    res.status(201).json(nuevoTrago);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el trago." });
  }
};

// Actualizar un trago
exports.actualizarTrago = async (req, res) => {
  try {
    const { id } = req.params;
    const tragoActualizado = await Trago.findByIdAndUpdate(id, req.body, { new: true });

    if (!tragoActualizado)
      return res.status(404).json({ error: "Trago no encontrado." });

    res.json(tragoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el trago." });
  }
};

// Eliminar un trago
exports.eliminarTrago = async (req, res) => {
  try {
    const { id } = req.params;
    const tragoEliminado = await Trago.findByIdAndDelete(id);

    if (!tragoEliminado)
      return res.status(404).json({ error: "Trago no encontrado." });

    res.json({ message: "Trago eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el trago." });
  }
};