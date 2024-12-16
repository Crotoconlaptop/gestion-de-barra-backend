// **premixesController.js**
const Premix = require("../models/Premix");

// Obtener todos los premixes
exports.obtenerPremixes = async (req, res) => {
  try {
    const premixes = await Premix.find();
    res.json(premixes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los premixes." });
  }
};

// Crear un nuevo premix
exports.crearPremix = async (req, res) => {
  try {
    const nuevoPremix = new Premix(req.body);
    await nuevoPremix.save();
    res.status(201).json(nuevoPremix);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el premix." });
  }
};

// Actualizar un premix
exports.actualizarPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const premixActualizado = await Premix.findByIdAndUpdate(id, req.body, { new: true });

    if (!premixActualizado)
      return res.status(404).json({ error: "Premix no encontrado." });

    res.json(premixActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el premix." });
  }
};

// Eliminar un premix
exports.eliminarPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const premixEliminado = await Premix.findByIdAndDelete(id);

    if (!premixEliminado)
      return res.status(404).json({ error: "Premix no encontrado." });

    res.json({ message: "Premix eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el premix." });
  }
};
