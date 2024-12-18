const Premix = require("../models/Premix");

// Obtener todos los premixes
exports.obtenerPremixes = async (req, res) => {
  try {
    const premixes = await Premix.find();
    res.json(premixes);
  } catch (error) {
    console.error("Error al obtener los premixes:", error.message);
    res.status(500).json({ error: "Error al obtener los premixes." });
  }
};

// Crear un nuevo premix
exports.crearPremix = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, ingredientes, preparacion, pendiente } = req.body;

    if (!nombre || !descripcion || !imagen || !ingredientes || !preparacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (!Array.isArray(ingredientes)) {
      return res.status(400).json({ error: "Los ingredientes deben ser un arreglo válido." });
    }

    const nuevoPremix = new Premix({ nombre, descripcion, imagen, ingredientes, preparacion, pendiente: false });
    await nuevoPremix.save();

    res.status(201).json(nuevoPremix);
  } catch (error) {
    console.error("Error al crear el premix:", error.message);
    res.status(500).json({ error: "Error al crear el premix." });
  }
};

// Cambiar el estado de un premix (pendiente o listo)
exports.cambiarEstadoPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const { pendiente } = req.body; // Leer el nuevo estado desde el cuerpo de la solicitud

    // Buscar el premix por ID
    const premix = await Premix.findById(id);
    if (!premix) {
      return res.status(404).json({ error: "Premix no encontrado." });
    }

    // Actualizar el estado
    premix.pendiente = pendiente;
    await premix.save();

    res.status(200).json(premix); // Enviar el premix actualizado al cliente
  } catch (error) {
    console.error("Error al cambiar el estado del premix:", error.message);
    res.status(500).json({ error: "Error al cambiar el estado del premix." });
  }
};

// Eliminar un premix
exports.eliminarPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const premixEliminado = await Premix.findByIdAndDelete(id);

    if (!premixEliminado) {
      return res.status(404).json({ error: "Premix no encontrado." });
    }

    res.json({ message: "Premix eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el premix:", error.message);
    res.status(500).json({ error: "Error al eliminar el premix." });
  }
};
